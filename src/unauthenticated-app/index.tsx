import { Button, Card, Divider, Typography } from "antd";
import React from "react";
import { useState } from "react";
import { LoginScreen } from "./login";
import { ResgiterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "../assets/logo.jpg";
import background from "assets/background.jpg";
import { Helmet } from "react-helmet";
import { ErrorBox } from "conponents/lib";

export const UnAuthenticatedApp = () => {
  const [isResgiter, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // useDocumentTitle('请登录注册以继续')

  return (
    <Container>
      {/* Helmet用于浏览器的网页标题 */}
      {/* <Helmet>
                <title>请登录或注册以继续</title>
            </Helmet> */}
      <img src={logo} style={{ width: 100, zIndex: 1 }}></img>
      <Background />
      {/* <Button onClick={()=>{
                throw new Error('点击c一个异常')
            }}>抛出异常</Button> */}
      <ShadowCard>
        <Title>{isResgiter ? "请注册" : "请登陆"}</Title>
        <ErrorBox error={error} />
        {isResgiter ? (
          <ResgiterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isResgiter)}>
          {isResgiter
            ? "Alreay have an account? Login at here"
            : "Don't have an account? Sign up here!"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Background = styled.div`
  background: url(${background});
  position: absolute;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0, 1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
