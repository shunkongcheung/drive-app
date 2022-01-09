import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: string;
  onClick: () => any;
}

const Container = styled.button`
  background: ${({ theme }) => theme.colors.primary[400]};
  color: white;
  border: 1px solid ${({ theme }) => theme.colors.primary[500]};
  border-radius: 5px;
  padding: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <Container type="button" onClick={onClick}>
      {children}
    </Container>
  );
};

export default Button;
