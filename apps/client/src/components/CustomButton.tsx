import * as React from "react";
import { Button } from "@mantine/core";
import { ReactNode } from "react";

type CustomButtonProps = {
  actionOnClick: () => void;
  children: ReactNode;
  disabled?: boolean;
};
export const CustomButton = ({
  actionOnClick,
  children,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Button
      onClick={() => actionOnClick()}
      size={"md"}
      variant={"light"}
      disabled={disabled}
      style={{ width: "50%", justifySelf: "end", alignSelf: "center" }}
    >
      {children}
    </Button>
  );
};
