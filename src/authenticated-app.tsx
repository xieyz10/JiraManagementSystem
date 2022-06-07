import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "conponents/lib";
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import ProjectListScreen from "screens/project-list";
import logo from "assets/logo.jpg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { Link } from "react-router-dom";
import { ProjectModel } from "screens/project-list/project-model";
import { ProjectPopover } from "conponents/project-popover";
/**
 * grid和flex各自的应用场景
 * 1:要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.是从内容出发还是从布局出发
 * 从内容出发：你先有一组（数量一般不固定），然后希望他们均匀的分布在容器中，由内容的大小绝地个占据的空间
 * 从布局出发：线规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      {/* <Button onClick={()=>setProjectModelOpen(true)}></Button> */}
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Route path="*" element={<Navigate to={"/projects"} />} />
        </Routes>
      </Main>
      <ProjectModel />
      {/* <Button onClick={()=>setProjectModelOpen(true)}>dianji</Button>  */}
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <Button type={'link'} onClick={resetRoute}> */}
        <img style={{ width: "7rem" }} src={logo} />
        {/* </Button> */}
        <ProjectPopover />
        <Link to={"projects"} style={{ fontSize: 16 }}>
          项目列表
        </Link>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              退出登陆
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        你好, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  padding-left: 5rem;
  padding-right: 5rem;
`;

const Header = styled(Row)`
  /* display:flex;控制HeaderRight向右悬浮*/
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
