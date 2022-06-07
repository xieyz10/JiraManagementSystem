import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "../utils/use-Async";

export const ResgiterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("密码不一致"));
      return;
    }
    try {
      await run(register(values));
    } catch (exception: any) {
      onError(exception);
    }
  };

  // const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
  //     event.preventDefault()
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
  //     const password  = (event.currentTarget.elements[1] as HTMLInputElement).value
  //     register({username,password})
  // }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: "请输入密码" }]}>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Sign up
        </LongButton>
      </Form.Item>
    </Form>
  );
};
