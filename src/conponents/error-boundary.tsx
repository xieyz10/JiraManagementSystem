import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

interface ErrorBoundaryProps {
  fallbackRender: FallbackRender; // if fallback is a JSX.Element
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: boolean | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { error: null };

  //当子组件跑出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}

// export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>,{error:Error|null}>{
//     state={error:null}

//     //当子组件跑出异常，这里会接收到并且调用
//     static getDerivedStateFromError(error:Error){
//         return {error}
//     }

//     render(){
//         const {error} = this.state
//         const {fallbackRender,children} = this.props
//         if(error){
//             return fallbackRender({error})
//         }
//         return children
//     }
// }
