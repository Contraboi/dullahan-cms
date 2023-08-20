import { Box, SimpleGrid, Space, Text } from "@mantine/core";
import { CreateModule } from "../CreateModule";

type NumberModulesProps = {
  sectionName: string;
  whenModuleSelected: () => void;
};

export const NumberModules = ({
  whenModuleSelected,
  sectionName,
}: NumberModulesProps) => {
  return (
    <Box>
      <Text size="lg">Numbers</Text>
      <Text size="xs" color={"gray"}>
        Fields that store images, videos, or other media.
      </Text>
      <Space h="md" />
      <SimpleGrid cols={3}>
        <CreateModule
          goToNextStep={whenModuleSelected}
          type={"number"}
          sectionName={sectionName}
        />
      </SimpleGrid>
    </Box>
  );
};
