import * as React from "react";
import { Card, useMantineTheme } from "@mantine/core";

type CustomCardProps = {
  children: JSX.Element | Array<JSX.Element>;
};

export const CustomCard = ({ children }: CustomCardProps) => {
  const theme = useMantineTheme();
  return (
    <Card
      p="xl"
      radius="md"
      withBorder
      style={{
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      }}
    >
      {children}
    </Card>
  );
};
