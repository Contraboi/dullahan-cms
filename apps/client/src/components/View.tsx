import * as React from "react";
import { CustomCard } from "./CustomCard";
import { SimpleGrid } from "@mantine/core";

type ViewProps = {
  title: string;
  children: JSX.Element | Array<JSX.Element>;
  button?: JSX.Element;
};

export const View = ({ title, children, button }: ViewProps) => {
  return (
    <div>
      <SimpleGrid cols={2} spacing={100} style={{ height: "100px" }}>
        <h2
          style={{
            alignSelf: "center",
            fontWeight: "400",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <>{button}</>
      </SimpleGrid>
      <CustomCard>
        <>{children}</>
      </CustomCard>
    </div>
  );
};
