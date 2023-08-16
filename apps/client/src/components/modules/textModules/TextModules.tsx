import * as React from "react";
import { Box, SimpleGrid, Text, Space } from "@mantine/core";
import { CreateModule } from "../CreateModule";

type TextModulesProps = {
  whenModuleSelected: () => void;
  sectionName: string;
};

export const TextModules = ({
  whenModuleSelected,
  sectionName,
}: TextModulesProps) => {
  return (
    <Box>
      <Text size="lg">Text & Rich Content</Text>
      <Text size="xs" color={"gray"}>
        Fields that store strings of text, rich content, or both.
      </Text>
      <Space h="md" />
      <SimpleGrid cols={3}>
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"text"}
          sectionName={sectionName}
        />
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"textarea"}
          sectionName={sectionName}
        />
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"textEditor"}
          sectionName={sectionName}
        />
      </SimpleGrid>
    </Box>
  );
};
