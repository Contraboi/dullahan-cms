import { Card } from "@mantine/core";
import { SectionModules } from "./SectionModules";
import React, { useState } from "react";
import { TabHeader } from "./TabHeader";
import { TabFooter } from "./TabFooter";

type TabProps = {
  id: number;
  tabName?: string;
  onRemove: (id: number) => void;
};

export const Tab = ({ id, tabName, onRemove }: TabProps) => {
  const [sectionName, setSectionName] = useState(
    tabName ? tabName : "newSection" + id
  );

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        minHeight: "250px",
        height: "max-content",
        paddingBlock: "0",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <TabHeader
        id={id}
        onRemove={() => onRemove(id)}
        sectionName={sectionName}
        setSectionName={setSectionName}
      />
      <SectionModules sectionName={sectionName} />
      <TabFooter sectionName={sectionName} />
    </Card>
  );
};
