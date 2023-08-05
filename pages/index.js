import React, { useState, useEffect } from "react";
import Form from "../Components/Form";
import {MainDiv, Rawr, Title} from "@/stylus/Index.styled"

function Page() {
  return (
    <MainDiv>
      <Rawr>
        <Title>ANALIZADOR LEXICO</Title>
      </Rawr>
      <Form />
    </MainDiv>
  )
}

export default Page;