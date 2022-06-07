import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { loadDevTools } from "jira-dev-tool";
import React from "react";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottem?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottem + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

interface ErrorType {
  error: Error | null;
}

export const FullPageErrorFallBack = ({ error }: ErrorType) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
      <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    </FullPage>
  );
};

//类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
