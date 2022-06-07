import { Dropdown, Menu, Modal, Rate, Table, TableProps } from "antd";
import { ButtonNoPadding } from "conponents/lib";
import { Pin } from "conponents/pin";
import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom";
// react-router和react-router-dom的关系，类似于react和react-dom的关系
import { BrowserRouter, Link, Router } from "react-router-dom";
import { Project } from "types/Project";
import { User } from "types/User";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModel, useProjectQueryKey } from "./util";

//TableProps包含下方Table所有属性的集合，还有users
interface ListProps extends TableProps<Project> {
  users: User[];
}

const List = ({ users, ...props }: ListProps) => {
  const { open } = useProjectModel();
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          //将星星图标封装成组件
          title: <Pin checked={true} disabled={true} />, //这个disabled是透传进去的
          render(value, project) {
            console.log(project);
            // return <Pin checked={project.pin} onCheckedChange={(pin)=>{
            //     mutate({id:project.id,pin})
            // }}/>
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(user, list) {
            return <Link to={String(list.id)}>{list.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((u) => u.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "none"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModel();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        console.log("id is + " + id);
        deleteProject({ id }); //这里传入的id是对象
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

export default List;
