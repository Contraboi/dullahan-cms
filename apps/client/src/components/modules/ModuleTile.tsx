import * as React from "react";
import { Group, Paper, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type ModuleProps = {
  title: string;
  icon: JSX.Element;
  width?: string;
  onClick?: () => void;
};

export const ModuleTile = ({
  title,
  icon,
  width = "100%",
  onClick,
}: ModuleProps) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Paper
      onClick={onClick}
      ref={ref}
      shadow="sm"
      style={{
        cursor: "pointer",
        width: width,
        background:
          theme.colorScheme === "light"
            ? theme.colors.gray[1]
            : theme.colors.dark[5],
        outline: hovered ? `1px solid ${theme.colors.blue[5]}` : "none",
      }}
    >
      <Group>
        <span style={{ background: "white", padding: "8px" }}>{icon}</span>
        <span>{title}</span>
      </Group>
    </Paper>
  );
};
