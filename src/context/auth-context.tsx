import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { http, useHttp } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "utils/use-Async";
import { FullPageErrorFallBack, FullPageLoading } from "../conponents/lib";
import { useQueryClient } from "react-query";
import { User } from "types/User";

interface AuthForm {
  username: string;
  password: string;
}

//令用户保持登陆状态
const bootStrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// const bootStrapUser = async ()=>{
//     let user = null
//     const httpClint = useHttp()
//     const token = auth.getToken()
//     if(token){
//         const data = await httpClint('me',{token})
//         user = data.user
//     }
//     return user
// }

const AuthContext = React.createContext<
  | {
      //指定泛型类型，与AuthContext.Provider的value对应，不指定的话，AuthContext.Provider中的value值会报错
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined); //默认为undefined

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then((user) => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(bootStrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallBack error={error}></FullPageErrorFallBack>;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
