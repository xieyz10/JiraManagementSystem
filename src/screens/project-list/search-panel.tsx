/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useInsertionEffect } from "react";
import { Input, Select } from "antd";
import { Form, Button, Checkbox } from "antd";
import { UserSelect } from "conponents/user-select";
import { User } from "types/User";
import { Project } from "types/Project";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  //setParam是函数类型，这里指的是setParam: ()=>void
  //param是参数
  setParam: (param: SearchPanelProps["param"]) => void;
}
const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"Project Name"}
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOpitionName={"负责人"}
          onChange={(value: number | undefined) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
