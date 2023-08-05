import React, { useEffect } from "react";
import {
  MainDiv2,
  InnerStyledDiv,
  Line,
  MainTitle,
  Rawr2,
  Rawr2r,
  StyledDiv,
  Title,
  TokenTitle,
} from "@/stylus/Lexer.styled";
import {
  Bracket,
  Constants,
  Delimeter,
  Keyword,
  Operator,
  ReservedWord,
  SpecialCharacter,
  checkConsecutive,
  isArithmeticOperator,
  isAssignmentOperator,
  isBracket,
  isConstant,
  isDecrement,
  isDelimeter,
  isIdentifier,
  isIncrement,
  isInvalidIdentifier,
  isKeyword,
  isLetter,
  isLogicalOperator,
  isNumber,
  isRelationalOperator,
  isReservedWord,
  isSpecialCharacter,
  isSymbol,
  isTernaryOperator,
} from "@/logic/functions";
import TokenItem from "@/stylus/TokenItem";
let tokens = [];
let currentIndex = 0;
let currentToken = "";

// Conjunto de símbolos
const symbols = new Set(["rawr"]);

const Lexer = ({ sourceCode, buttonClicked }) => {
  // Restablecer las variables tokens y currentIndex cuando sourceCode cambia
  useEffect(() => {
    tokens = [];
    currentIndex = 0;
  }, [sourceCode]);

  if (!buttonClicked) {
    return null;
  } else {
    while (currentIndex < sourceCode.length) {
      let currentChar = sourceCode[currentIndex];

      // Para identificador
      if (isLetter(currentChar) || currentChar === "_") {
        while (
          isLetter(currentChar) ||
          isNumber(currentChar) ||
          currentChar === "_"
        ) {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }

        if (isKeyword(currentToken)) {
          tokens.push(
            <TokenItem tokenTitle={Keyword(currentToken)} innerTitle={currentToken} />
          );
        } else if (isConstant(currentToken)) {
          tokens.push(
            <TokenItem tokenTitle={Constants(currentToken)} innerTitle={currentToken} />
          );
        } else if (isReservedWord(currentToken)) {
          tokens.push(
            <TokenItem tokenTitle={ReservedWord(currentToken)} innerTitle={currentToken} />
          );
        } else if (isInvalidIdentifier(currentToken)) {
          tokens.push(
            <TokenItem tokenTitle={"INDETIFICADOR INVALIDO"} innerTitle={currentToken} />
          );
        } else if (isIdentifier(currentToken)) {
          tokens.push(
            <TokenItem tokenTitle={"IDENTIFICADOR"} innerTitle={currentToken} />
          );
        }
        currentToken = "";

        // Para numero
      } else if (currentChar === "-") {
        let number = "-";
        currentChar = sourceCode[++currentIndex];

        if (isNumber(currentChar)) {
          while (isNumber(currentChar) || currentChar === ".") {
            number += currentChar;
            currentChar = sourceCode[++currentIndex];
          }
          let match;
          if ((match = number.match(/^-\d+(\.\d+)?$/)) !== null) {
            if (match[1] === undefined) {
              tokens.push(
                <TokenItem tokenTitle={"NUMERO_ENTERO_NEGATIVO"} innerTitle={number} />
              );
            } else {
              tokens.push(
                <TokenItem tokenTitle={"NUMERO_DECIMAL_NEGATIVO"} innerTitle={number} />
              );
            }
          }
        } else {
          tokens.push(
            <TokenItem tokenTitle={"OPERADOR_SUSTRACCIÓN"} innerTitle={number} />
          );
        }
      } else if (isNumber(currentChar)) {
        let number = "";
        while (isNumber(currentChar) || currentChar === ".") {
          number += currentChar;
          currentChar = sourceCode[++currentIndex];
        }
        let match;
        if ((match = number.match(/^\d+(\.\d+)?$/)) !== null) {
          if (match[1] === undefined) {
            tokens.push(
              <TokenItem tokenTitle={"NUMERO_ENTERO"} innerTitle={number} />
            );
          } else {
            tokens.push(
              <TokenItem tokenTitle={"NUMERO_DECIMAL"} innerTitle={number} />
            );
          }
        }
        currentToken = "";

        // Para comentario multilinea
      } else if (currentChar === "/" && sourceCode[currentIndex + 1] === "*") {
        currentIndex += 2;
        currentChar = sourceCode[currentIndex];
        while (!(currentChar === "*" && sourceCode[currentIndex + 1] === "/")) {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        currentIndex += 2;
        currentChar = sourceCode[currentIndex];
        tokens.push(
          <TokenItem tokenTitle={"COMENTARIO_MULTILINEA"} innerTitle={currentToken} />
        );
        currentToken = "";
      } else if (currentChar === "/" && sourceCode[currentIndex + 1] === "/") {
        currentIndex += 2;
        currentChar = sourceCode[currentIndex];
        while (
          currentChar !== "\n" &&
          currentChar !== "\r" &&
          currentIndex < sourceCode.length
        ) {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        tokens.push(
          <TokenItem tokenTitle={"COMENTARIO_UNILINEA"} innerTitle={currentToken} />
        );
        currentToken = "";

        // Para cadenas
      } else if (currentChar === '"') {
        currentIndex++;
        currentChar = sourceCode[currentIndex];
        while (currentChar !== '"') {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        tokens.push(
          <TokenItem tokenTitle={"COMILLA_APERTURA"} innerTitle={'"'} />
        );
        tokens.push(
          <TokenItem tokenTitle={"CADENA_LITERAL"} innerTitle={currentToken} />
        );
        tokens.push(
          <TokenItem tokenTitle={"COMILLA_CIERRE"} innerTitle={'"'} />
        );
        currentIndex++;
        currentToken = "";

        // Para incremento
      } else if (isIncrement(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <TokenItem tokenTitle={"INCREMENTADOR_OPERADOR"} innerTitle={currentToken} />
        );
        currentIndex += 2;
        currentToken = "";

        // Para decremento
      } else if (isDecrement(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <TokenItem tokenTitle={"DECREMENTADOR_OPERADOR"} innerTitle={currentToken} />
        );
        currentIndex += 2;
        currentToken = "";

        // Para operadores logicos
      } else if (
        isLogicalOperator(currentChar + sourceCode[currentIndex + 1])
      ) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <TokenItem tokenTitle={Operator(currentToken)} innerTitle={currentToken}
          />
        );
        currentIndex += 2;
        currentToken = "";

        // Para operadores relacionales
      } else if (
        isRelationalOperator(currentChar + sourceCode[currentIndex + 1]) ||
        isRelationalOperator(currentChar)
      ) {
        currentToken += currentChar;
        if (isRelationalOperator(currentToken + sourceCode[currentIndex + 1])) {
          currentToken += sourceCode[currentIndex + 1];
          currentIndex++;
        }
        tokens.push(
          <TokenItem tokenTitle={Operator(currentToken)} innerTitle={currentToken} />
        );
        currentIndex++;
        currentToken = "";

        // Para operadores de asignacion
      } else if (
        isAssignmentOperator(currentChar + sourceCode[currentIndex + 1]) ||
        isAssignmentOperator(currentChar)
      ) {
        currentToken += currentChar;
        if (isAssignmentOperator(currentChar + sourceCode[currentIndex + 1])) {
          currentToken += sourceCode[currentIndex + 1];
          currentIndex++;
        }
        tokens.push(
          <TokenItem tokenTitle={Operator(currentToken)} innerTitle={currentToken} />
        );
        currentIndex++;
        currentToken = "";

        // Para operadores arimeticos
      } else if (isArithmeticOperator(currentChar)) {
        tokens.push(
          <TokenItem tokenTitle={Operator(currentToken)} innerTitle={currentToken} />
        );
        currentIndex++;

        // Para delimitadores
      } else if (isDelimeter(currentChar)) {
        tokens.push(
          <TokenItem tokenTitle={Delimeter(currentChar)} innerTitle={currentChar} />
        );

        if (isSpecialCharacter(sourceCode[currentIndex + 1])) {
          currentToken += currentChar;
          let nextChar = sourceCode[currentIndex + 1];
          while (isSpecialCharacter(nextChar)) {
            currentIndex++;
            currentToken += nextChar;
            nextChar = sourceCode[currentIndex + 1];
          }
          tokens.push(
            <TokenItem tokenTitle={"INVALIDO"} innerTitle={currentToken} />
          );
          currentIndex++;
          currentToken = "";
        }
        currentIndex++;

        // Para brackets
      } else if (isBracket(currentChar)) {
        tokens.push(
          <TokenItem tokenTitle={Bracket(currentChar)} innerTitle={currentChar} />
        );
        currentIndex++;
        // Para operadores ternarios
      } else if (
        isTernaryOperator(
          currentChar +
            sourceCode[currentIndex + 1] +
            sourceCode[currentIndex + 2]
        ) ||
        isTernaryOperator(currentChar + sourceCode[currentIndex + 1]) ||
        isTernaryOperator(currentChar)
      ) {
        currentToken += currentChar;
        if (isTernaryOperator(currentToken + sourceCode[currentIndex + 1])) {
          currentToken += sourceCode[currentIndex + 1];
          currentIndex++;
        } else if (
          isTernaryOperator(
            currentChar +
              sourceCode[currentIndex + 1] +
              sourceCode[currentIndex + 2]
          )
        ) {
          currentToken += sourceCode[currentIndex + 1];
          currentToken += sourceCode[currentIndex + 2];
          currentIndex++;
        }

        tokens.push(
          <TokenItem tokenTitle={Operator(currentToken)} innerTitle={currentToken} />
        );
        currentIndex++;
        currentToken = "";

        // Para simbolos
      } else if (isSymbol(currentChar)) {
        tokens.push(
          <TokenItem tokenTitle={"SIMBOLO"} innerTitle={currentToken} />
        );

        currentIndex++;
      } else {
        // ignorar espacios en blanco y caracteres
        currentIndex++;
      }
    }
    // empuja el último token, si existe, a la matriz de tokens
    if (currentToken !== "") {
      tokens.push(currentToken);
    }

    return (
      <MainDiv2>
        <Rawr2>
          <MainTitle>{"</>"} TOKENS </MainTitle>
          <Line />
        </Rawr2>
        <Rawr2r>{tokens}</Rawr2r>
      </MainDiv2>
    );
  }
};

export default Lexer;