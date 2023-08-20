import { Button, SimpleGrid } from "@mantine/core";
import { CreateModuleModal } from "../CreateModuleModal";
import React, { useState } from "react";
import { ComponentsDrawer } from "../components/ComponentsDrawer";

type TabFooterProps = {
  sectionName: string;
};

export const TabFooter = ({ sectionName }: TabFooterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <SimpleGrid cols={2} pb={"xs"}>
      <CreateModuleModal sectionName={sectionName} />
      <Button
        variant={"outline"}
        color={"blue"}
        onClick={() => setIsOpened(true)}
      >
        Link Existing Component
      </Button>
      <ComponentsDrawer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        section={sectionName}
      />
    </SimpleGrid>
  );
};
