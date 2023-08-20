import { Box, SimpleGrid, Space, Text } from "@mantine/core";
import { CreateModule } from "../CreateModule";

type StructuredModulesProps = {
  sectionName: string;
  whenModuleSelected: () => void;
};

export const StructuredModules = ({
  whenModuleSelected,
  sectionName,
}: StructuredModulesProps) => {
  return (
    <Box>
      <Text size="lg">Structured</Text>
      <Text size="xs" color={"gray"}>
        Fields that have complex data structures.
      </Text>
      <Space h="md" />
      <SimpleGrid cols={3}>
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"replicator"}
          sectionName={sectionName}
        />
      </SimpleGrid>
    </Box>
  );
};
