import * as React from "react";
import { Grid, Title, useMantineTheme } from "@mantine/core";
import { LeftNavbarStyled } from "./dashboard/leftNavbar/LeftNavbar.styled";
import { DynamicLinks } from "./dashboard/leftNavbar/DynamicLinks";

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>;
  title: string;
  path?: "templates" | "collections" | "components" | "assets";
  links?: Array<{ title: string; handle: string }>;
};
export const Layout = ({ children, links, path, title }: LayoutProps) => {
  const { classes } = LeftNavbarStyled();
  const theme = useMantineTheme();

  return (
    <Grid style={{ width: "100%" }}>
      {links && (
        <Grid.Col
          span={2}
          style={{
            borderRight: `1px solid lightgray`,
            paddingRight: "0",
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          }}
        >
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {title}
            </Title>
            <DynamicLinks dynamicLinks={links} path={path} />
          </div>
        </Grid.Col>
      )}
      <Grid.Col span={links ? 10 : 12}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>{children}</div>
      </Grid.Col>
    </Grid>
  );
};
