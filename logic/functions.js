import { constants, reservedWords, keywords, operators, delimeters, brackets, specialCharacters, operator } from "./tokens";

export function isLetter(char) {
  const letters = /[a-zA-Z]/;
  return letters.test(char);
}

export function isNumber(char) {
  const negativeInteger = /^-\d+$/;
  const negativeDecimal = /^-\d+\.\d+$/;
  const integer = /^\d+$/;
  const decimal = /^\d+\.\d+$/;
  return negativeInteger.test(char) || negativeDecimal.test(char) || integer.test(char) || decimal.test(char);
}

export function isKeyword(token) {
  return keywords.has(token);
}

export function isConstant(token) {
  return constants.has(token);
}

export function isReservedWord(token) {
  return reservedWords.has(token);
}

export function isSymbol(token) {
  return 0;
}

export function isArithmeticOperator(token) {
  return operators.has(token);
}

export function isLogicalOperator(token) {
  return operators.has(token);
}

export function isRelationalOperator(token) {
  return operators.has(token);
}

export function isAssignmentOperator(token) {
  return operators.has(token);
}

export function isDelimeter(token) {
  return delimeters.get(token);
}

export function isBracket(token) {
  return brackets.has(token);
}

export function isTernaryOperator(token) {
  return operators.has(token);
}

export function isSpecialCharacter(token) {
  return specialCharacters.has(token);
}

export function isIdentifier(token) {
  // reivsa si el token comienza con una letra o un guión bajo
  if (!/^[a-zA-Z_]/.test(token)) {
    return false;
  }
  // revisa si el token contiene caracteres especiales, excepto guiones bajos
  if (/[^a-zA-Z_0-9]/.test(token)) {
    return false;
  }
  // revisa si el token no es una palabra clave o una palabra reservada
  if (isKeyword(token) || isReservedWord(token)) {
    return false;
  }
  return true;
}

export function isInvalidIdentifier(token) {
  if (/^[0-9]/.test(token)) {
    return true;
  }

  if (!/^[a-zA-Z_]/.test(token)) {
    return true;
  }

  if (/[^a-zA-Z_0-9]/.test(token)) {
    return true;
  }
  if (isKeyword(token) || isReservedWord(token)) {
    return true;
  }
  return false;

}

export function isIncrement(token) {
  return operator.has(token);
}

export function isDecrement(token) {
  return operator.has(token);
}

export function ReservedWord(token) {
  return reservedWords.get(token);
}

export function Keyword(token) {
  return keywords.get(token);
}

export function Operator(token) {
  return operators.get(token);
}

export function SpecialCharacter(token) {
  return specialCharacters.get(token);
}

export function Delimeter(token) {
  return delimeters.get(token)
}

export function Bracket(token) {
  return brackets.get(token)
}

export function Constants(token) {
  return constants.get(token)
}

export function checkConsecutive(tokens) {
  let previousType = null;
  let num = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (previousType && previousType.includes("KEYWORD") && isKeyword(token.token)) {
      token.type = "RESERVED_WORD";
    } else if (previousType && previousType.includes("_WORD") && isKeyword(token.token)) {
      token.type = "RESERVED_WORD";
    } else if (previousType && previousType.includes("NUMBER") && isNumber(token.token)) {
      token.type = "INVALID";
    } else if (previousType === "IDENTIFIER" && isIdentifier(token.token)) {
      token.type = "INVALID";
    } else if (previousType === "INVALID" && isIdentifier(token.token)) {
      token.type = "INVALID";
    } else if (previousType === "INVALID" && operators.has(token.token)) {
      token.type = "INVALID";
    } else if (previousType && previousType.includes("_OPERATOR") && operators.has(token.token)) {
      token.type = "INVALID";
    } else if (previousType && previousType.includes("CONSTANT") && isKeyword(token.token) && token.type.includes("DATATYPE")) {
      num = 1;
    } else if (previousType && previousType.includes("DATATYPE") && isIdentifier(token.token) && num == 1) {
      token.type = "CONSTANT_IDENTIFIER";
      num = 0;
    }
    previousType = token.type;
  }
  return tokens;
}