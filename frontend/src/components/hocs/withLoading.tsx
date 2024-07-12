import { ComponentType } from "react";

export interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithLoadingComponent = (props: P & WithLoadingProps) => {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(restProps as P)} />;
  };

  WithLoadingComponent.displayName = `WithLoading(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLoadingComponent;
};

export default withLoading;
