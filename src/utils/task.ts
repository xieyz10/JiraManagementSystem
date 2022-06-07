import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderConfig,
} from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  //这里是使用useQuery充当列表缓存的作用,useQuery也用于获取数据，在这里扮演useAsync的角色
  // return useQuery<Project[],Error>(['projects',param],()=>client('projects',{data:param}))
  //这里写成['projects',param]后param变化的时候会自动发出请求
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id), //或!!id，只有当id有值的时候才会触发useProject
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  console.log(queryKey);
  const client = useHttp();
  // const queryClient = useQueryClient()
  // const [searchParams] = useProjectSearchParams()
  // const queryKey = ['project',searchParams]
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderConfig(queryKey));
};
