import styled from "styled-components";
export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  height: 100%;
`;

export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: visible;
  &:first-child {
    margin-right: ${(props) => (props.buttonClicked ? "20px" : "0px")};
  }
`;

export const Input = styled.textarea`
  border-radius: 15px;
  padding: 12px 20px;
  width: 60%;
  height: 60vh;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  resize: none;
  border: double 3px transparent;
  &:hover {
    border: double 3px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #fa00ff, #572a8b, #fa00ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
  &:focus {
    border-radius: 15px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #fa00ff, #572a8b, #fa00ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
`;

export const Rawr = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Button = styled.button`
  background-image: linear-gradient(to right, #fa00ff, #572a8b);
  border-radius: 20px;
  border: none;
  width: 300px;
  height: 30px;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 700;
  margin-top: 20px;
  &:hover {
  transform: scale(1.05);
  cursor: pointer;
}
`;
