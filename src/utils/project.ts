import { Context, useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screens/project-list/util";
import { Project } from "types/Project";
import { cleanObject } from ".";
import { useHttp } from "./http";
import { useAsync } from "./use-Async";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  //这里是使用useQuery充当列表缓存的作用,useQuery也用于获取数据，在这里扮演useAsync的角色
  // return useQuery<Project[],Error>(['projects',param],()=>client('projects',{data:param}))
  //这里写成['projects',param]后param变化的时候会自动发出请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const queryClient = useQueryClient()
  // const [searchParams] = useProjectSearchParams()
  // const queryKey = ['project',searchParams]
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id), //或!!id，只有当id有值的时候才会触发useProject
    }
  );
};

export {};
