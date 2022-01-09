import type { GetServerSidePropsContext, NextPage } from "next";
import nextCookies from "next-cookies";
import styled from "styled-components";

import { AUTH_STORAGE_KEY } from "../constants";
import { getUserFromToken } from "../utils";

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

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const cookies = nextCookies(ctx);
  const token = cookies[AUTH_STORAGE_KEY] || "";

  try {
    getUserFromToken(token);
  } catch (ex) {
    return { redirect: { destination: "/auth", statusCode: 302 } };
  }

  return { props: {} };
};

export default Home;
