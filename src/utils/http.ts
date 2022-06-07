import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = "http://localhost:3000";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", //这里是默认为GET，POST方法当然也可以
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  //axios可以直接返回状态异常，与fetch不同，可以翻译不是2xx时的异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        //401是unAuthorized
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please login again" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
//js中的typeof是在runtime时运行的
//ts中的typeof是在静态环境运行的
//如果函数里要使用其它的hook,函数本身就必须是一个hook
export const useHttp = () => {
  const { user } = useAuth();
  //加...是为了在调用的时候不用tuple,将tuple里的内容解放出来，否则需要传一个tuple，传也无妨
  //utility type的用法:用范型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};

//联合类型,meFavoriteNumber或者是 string，或者是number
// let myFavoriteNumber:string | number
// myFavoriteNumber = "seven"
// myFavoriteNumber = 7

// let jackFavoriteNumber:string | number

//类型别名在很多情况下可以和interface互换
// interface Person{
//     name:string
// }
// type Person2 = {name:string}
// const xiaoMing:Person = {name: 'xiaoming'}

//类型别名，interface在这种情况下没法替代type
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = "6";

//interface也没法实现utilityType
type Person = {
  name: string;
  age: number;
};

// const xiaoMing: Partial<Person> = {name:'xiaoming'}
//Omit删除name和age属性
// const mysterio:Omit<Person,'name' | 'age'>={age:8}
//keyof是把键值全部取出来，赋值给PersonKeys
// type PersonKeys = keyof Person
// type PersonOnlyName = Pick<Person,'name'|'age'>
// type Age = Exclude<PersonKeys,'name'>
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };
