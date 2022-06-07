import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      return mountedRef.current ? dispatch(...args) : void 0;
    },
    [dispatch, mountedRef]
  );
};

//useAsync统一处理Loading和Error状态
const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig }; //用initialConfig来覆盖defaultConfig
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能 直接传入函数
  //可以再加上一层函数，retry保存的就是一个函数了
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型 数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      //注意这块解决useCallback无限循环的方式
      // setState({...state,stat:'loading'})
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          //catch会消化异常 ，如果不主动抛出，外面是接受不到异常的
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    //retry被调用时，重新跑一遍run，让state刷新一边
    retry,
    ...state,
  };
};

export { useAsync };

// import { useCallback, useState } from "react";
// import { useMountedRef } from "utils";

// interface State<D> {
//     error:Error|null;
//     data: D|null;
//     stat: 'idle'| 'loading' | 'error' | 'success'
// }

// const defaultInitialState: State<null> = {
//     stat:'idle',
//     data:null,
//     error:null
// }

// const defaultConfig = {
//     throwOnError:false
// }

// //useAsync统一处理Loading和Error状态
// const useAsync = <D>(initialState?:State<D>, initialConfig?:typeof defaultConfig) => {
//     const config = {...defaultConfig,initialConfig} //用initialConfig来覆盖defaultConfig
//     const [state,setState] = useState<State<D>>({
//         ...defaultInitialState,
//         ...initialState
//     })

//     const mountedRef = useMountedRef()

//     //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能 直接传入函数
//     //可以再加上一层函数，retry保存的就是一个函数了
//     const [retry,setRetry] = useState(()=>()=>{

//     })

//     const setData = useCallback((data:D) => setState({
//         data,
//         stat: 'success',
//         error:null
//     }),[])

//     const setError = useCallback((error:Error) => setState({
//         error,
//         stat: 'error',
//         data:null
//     }),[])

//     const run = useCallback(
//         (promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
//             if(!promise || !promise.then) {
//                 throw new Error('请传入Promise类型 数据')
//             }
//             setRetry(()=>()=>{
//                 if(runConfig?.retry){
//                     run(runConfig?.retry(),runConfig)
//                 }
//             })
//             //注意这块解决useCallback无限循环的方式
//             // setState({...state,stat:'loading'})
//             setState(prevState=>({...prevState,stat:'loading'}))
//             return promise.then(data=>{
//                 if(mountedRef.current)
//                     setData(data)
//                 return data
//             }).catch(error=>{
//                 //catch会消化异常 ，如果不主动抛出，外面是接受不到异常的
//                 setError(error)
//                 if(config.throwOnError){
//                     return Promise.reject(error)
//                 }
//                 return error
//             })
//         },
//         [config.throwOnError,mountedRef,setData,setError]
//     )

//     return {
//         isIdle:state.stat === 'idle',
//         isLoading: state.stat === 'loading',
//         isError: state.stat === 'error',
//         isSuccess:state.stat === 'success',
//         run,
//         setData,
//         setError,
//         //retry被调用时，重新跑一遍run，让state刷新一边
//         retry,
//         ...state
//     }
// }

// export  {useAsync}
