import React from "react";
import {useRouter} from "next/router";
import styled from "styled-components";

interface HeadingProps {
  children: string;
  isBack?: boolean;
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary[400]};
  display: flex;
  align-items: center;
  justify-content: left;

  padding: 30px;
  width: 100%;
  height: 40px;
`;

const Content = styled.h1<{ isBack: boolean }>`
  color: white;
  margin: 0;
  margin-left: ${({ isBack }) => (isBack ? "30px" : 0)};
`;

const BackBtn = styled.button`
  border: 0;
  background: white;
  color: ${({ theme }) => theme.colors.primary[400]};
  border-radius: 50%;
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px #bbb;
    scale: 1.1;
  }
`;

const Heading: React.FC<HeadingProps> = ({ children, isBack = false }) => {
  const MAX_LENGTH = 30;
  const renderChild = children.slice(0, MAX_LENGTH);

  const router = useRouter()

  return (
    <Container>
      {isBack && <BackBtn onClick={() => router.back()}> &lt; </BackBtn>}
      <Content isBack={isBack}> {renderChild}</Content>
    </Container>
  );
};

export default Heading;
