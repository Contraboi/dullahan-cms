import * as React from "react";
import { Component, ErrorInfo, ReactNode, useMemo } from "react";

type ForProps<T> = {
  each: Array<T>;
  filter?: (item: T, index: number) => boolean;
  children: (item: T, index: number) => ReactNode;
};

export const For = <T,>({ each, children, filter }: ForProps<T>) => {
  const memoizedForReturn = useMemo(() => {
    const filtered = filter ? each.filter(filter) : each;

    return filtered.map((item, index) => (
      <React.Fragment key={index}>{children(item, index)}</React.Fragment>
    ));
  }, [each]);

  return <>{memoizedForReturn}</>;
};

export const Show = <T,>({
  when,
  children,
  fallback,
}: {
  when: T;
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  return when ? <>{children}</> : fallback ? <>{fallback}</> : null;
};

interface Props {
  children?: ReactNode;
  error?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super({
      componentName: props.componentName || "Unknown",
    });
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.error || (
          <h1>There was an error in {this.props.componentName}</h1>
        )
      );
    }

    return this.props.children;
  }
}
