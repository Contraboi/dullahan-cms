import { useMemo } from "react";

export function useSwitch<T>() {
  type SwitchProps<T> = {
    handle: T;
    children: Array<JSX.Element>;
  };

  type CaseProps<T> = {
    value: T;
    children: JSX.Element;
  };

  const Case = useMemo(
    () =>
      ({ value, children }: CaseProps<T>) => {
        return children ? children : null;
      },
    []
  );

  const Switch = useMemo(
    () =>
      ({ children, handle }: SwitchProps<T>) => {
        const foundCase = children.find(
          (child) => (child as JSX.Element).props.value === handle
        );
        return foundCase || null;
      },
    []
  );

  return { Case, Switch };
}
