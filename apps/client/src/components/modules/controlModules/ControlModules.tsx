import { Box, SimpleGrid, Space, Text } from "@mantine/core";
import { CreateModule } from "../CreateModule";

type ControlModulesProps = {
  whenModuleSelected: () => void;
  sectionName: string;
};

export const ControlModules = ({
  whenModuleSelected,
  sectionName,
}: ControlModulesProps) => {
  return (
    <Box>
      <Text size="lg">Buttons & Controls</Text>
      <Text size="xs" color={"gray"}>
        Fields that provide selectable options or buttons that can control
        logic.
      </Text>
      <Space h="md" />
      <SimpleGrid cols={3}>
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"radio"}
          sectionName={sectionName}
        />
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"range"}
          sectionName={sectionName}
        />
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"toggle"}
          sectionName={sectionName}
        />
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"checkbox"}
          sectionName={sectionName}
        />
      </SimpleGrid>
    </Box>
  );
};
