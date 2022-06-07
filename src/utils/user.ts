import { useEffect } from "react";
import { User } from "types/User";
import { cleanObject } from ".";
import { useHttp } from "./http";
import { useAsync } from "./use-Async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  //data:list中的list是别名
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

export {};
