import React from "next";
import styled from "styled-components";

import { Button, Heading } from "../../components";

import useAuth from "./useAuth";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  flex-direction: column;
`;

const Content = styled.div`
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  max-width: 70%;
  max-height: 70vh;

  width: 450px;
  height: 500px;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary[700]};

  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Message = styled.caption`
  text-align: start;
  width: 100%;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.primary[400]};
`;

const PwInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  font-size: 14px;
  border: 1px sold ${({ theme }) => theme.colors.primary[500]};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const Auth: React.FC = () => {
  const authState = useAuth();

  return (
    <Container>
      <Heading>登入</Heading>
      <Content>
        <Card>
          <div>
            <Title>用戶名稱</Title>
            <PwInput
              name="username"
              onBlur={authState.handleBlur}
              onChange={authState.handleChange}
              value={authState.values.username}
            />
          </div>
          <div>
            <Title>密碼</Title>
            <PwInput
              name="password"
              type="password"
              onBlur={authState.handleBlur}
              onChange={authState.handleChange}
              value={authState.values.password}
            />
            <Message>{authState.errors.password}</Message>
          </div>
          <Button onClick={authState.handleSubmit}>登入</Button>
        </Card>
      </Content>
    </Container>
  );
};

export default Auth;
