import {
  InnerStyledDiv,
  StyledDiv,
  Title,
  TokenTitle,
} from "@/stylus/Lexer.styled";

const TokenItem = ({ tokenTitle, innerTitle }) => {
  return (
    <StyledDiv>
      <TokenTitle>{tokenTitle}</TokenTitle>
      <InnerStyledDiv>
        <Title>{innerTitle}</Title>
      </InnerStyledDiv>
    </StyledDiv>
  );
};

export default TokenItem;