import type { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Heading>hello world</Heading>
    </Container>
  );
};

export default Home;
