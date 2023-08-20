import * as React from "react";
import { SimpleGrid, Space } from "@mantine/core";
import { TextModules } from "./textModules/TextModules";
import { ControlModules } from "./controlModules/ControlModules";
import { NumberModules } from "./numberModules/NumberModules";
import { StructuredModules } from "./structured/StructuredModules";

type ModulePickerProps = {
  whenModuleSelected: () => void;
  sectionName: string;
};
export const ModulePicker = ({
  whenModuleSelected,
  sectionName,
}: ModulePickerProps) => {
  return (
    <SimpleGrid cols={1} mt={"xl"}>
      <TextModules
        whenModuleSelected={whenModuleSelected}
        sectionName={sectionName}
      />
      <Space h="md" />
      <ControlModules
        whenModuleSelected={whenModuleSelected}
        sectionName={sectionName}
      />
      <Space h="md" />
      <NumberModules
        whenModuleSelected={whenModuleSelected}
        sectionName={sectionName}
      />
      <Space h="md" />
      <StructuredModules
        whenModuleSelected={whenModuleSelected}
        sectionName={sectionName}
      />
    </SimpleGrid>
  );
};
