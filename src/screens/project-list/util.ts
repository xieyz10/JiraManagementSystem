import { render } from "@testing-library/react";
import { useMemo, useState } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["project", params];
};

export const useProjectModel = () => {
  //这块的{projectCreate}加括号指的是下面的默认值
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  const close = () => {
    // console.log("in??")
    // setProjectCreate({ projectCreate: undefined })
    // setEditingProjectId({ editingProjectId: undefined })
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    //从useUrlQueryParam里读取的都是字符串
    projectModelOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }; //使用tuple在返回的tuple值可以随便取名
};
