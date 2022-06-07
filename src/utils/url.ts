import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";
import { pbkdf2 } from "crypto";

// 返回页面url中，指定键的参数值
//比如说这里的string[]是[name,personId],这个hook就会返回{name:骑手,personId:18}
//这是为了能够在复制链接的时候也能搜索到对应的项，否则单页面应用在切换页面的时候地址栏的url不显示
//如果此处不用范型，则默认类型会指定为[key in K]:string，与search-panel所需传参的类型不符
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //extends string 表示必须是一个string类型
  const [searchParams] = useSearchParams(); //自带的hook
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }), //这里的{}是初始值
      //基本类型，组件状态可以放在依赖里；非组件状态的对象，不可放到依赖里，否则会造成死循环
      [searchParams]
    ),
    //Partial<{[key in K]:unknown}>, 指传入一个对象，对象的键值必须限定在K里面，对象的值的类型没有关系，所以用unknow表示
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
      //Object.fromEntries将url的参数转化为对象，再用新传入的对象覆盖
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //自带的hook
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

// export const useUrlQueryParam = (keys:string[])=>{ //extends string 表示必须是一个string类型
//         const [searchParams,setSearchParams] = useSearchParams()//自带的hook
//         return [keys.reduce((prev,key)=>{
//             return {...prev,[key]:searchParams.get(key) || ''}//key加中括号表示key是一个变量，否则会被认为是属性
//             },{} as {[key in string]:string}),
//             setSearchParams
//         ] as const
//     }
// export const useUrlQueryParam = (keys:string[])=>{
//     const [searchParams,setSearchParams] = useSearchParams()
//     return keys.reduce((prev,key)=>{
//         return {...prev,[key]:searchParams.get(key)}
//     },{})
// }

// const a =["jack",12,{gender:'male'}] as const
// const b =["jack",12,{gender:'male'}]

// const s = ['12']
// const s1 = ['12'] as const
