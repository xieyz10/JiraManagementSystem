import { useQuery } from "react-query";
import { Task } from "types/task";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = () => {
  const client = useHttp();
  //这里是使用useQuery充当列表缓存的作用,useQuery也用于获取数据，在这里扮演useAsync的角色
  // return useQuery<Project[],Error>(['projects',param],()=>client('projects',{data:param}))
  //这里写成['projects',param]后param变化的时候会自动发出请求
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
