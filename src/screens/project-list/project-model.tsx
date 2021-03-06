import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "conponents/lib";
import { UserSelect } from "conponents/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModel, useProjectQueryKey } from "./util";

export const ProjectModel = () => {
  const { projectModelOpen, close, editingProject, isLoading } =
    useProjectModel();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey()); //mutateAsync是异步的，同步的话没法捕捉是否完成编辑或创建表单
  const [form] = useForm();
  const onFinish = (values: any) => {
    //console.log("the values are"+ JSON.stringify(values))
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModel = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModel}
      visible={projectModelOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                {/* 在这里的Input不加value和onchange是因为被Form.Item代理了 */}
                <Input placeholder={"请输入项目名称"}></Input>
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名称"}></Input>
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOpitionName={"负责人"}></UserSelect>
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
