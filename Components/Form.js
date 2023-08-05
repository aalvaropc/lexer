import React, { useState, useEffect } from "react";
import Lexer from "./Lexer";
import { MainDiv, Rawr, InnerDiv, Input, Button } from "@/stylus/Form.styled";

const Form = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleTextAreaChange = (e) => {
    setSourceCode(e.target.value);
  };

  const handleClean = () => {
    setSourceCode("");
    setButtonClicked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (buttonClicked) {
      handleClean();
      return;
    }
    setButtonClicked(true);
  };

  return (
    <MainDiv>
      <Rawr>
        <InnerDiv buttonClicked={buttonClicked}>
          <form onSubmit={handleSubmit}>
            <Input
              name="sourceCode"
              value={sourceCode}
              onChange={handleTextAreaChange}
              placeholder="Ingrese su codigo a analizar"
            />
            <br />
            <Button type="submit">
              {buttonClicked ? "INGRESAR OTRO" : "GENERAR TOKEN"}
            </Button>
          </form>
        </InnerDiv>
      </Rawr>

      {sourceCode &&
        buttonClicked && (
          <Rawr>
            <InnerDiv>
              <Lexer sourceCode={sourceCode} buttonClicked={buttonClicked} />
            </InnerDiv>
          </Rawr>
        )}
    </MainDiv>
  );
};

export default Form;
