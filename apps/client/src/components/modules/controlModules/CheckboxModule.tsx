import * as React from "react";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { SimpleGrid } from "@mantine/core";
import { OptionsField } from "../fields/OptionsField";
import { DefaultValueField } from "../fields/DefaultValueField";
import { useModuleData } from "../../../../hooks/useModuleData";

type CheckboxModuleProps = {
  sectionName: string;
  handle?: string;
};

export const CheckboxModule = ({
  handle,
  sectionName,
}: CheckboxModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Checkbox FIeld",
      type: "checkbox",
      handle: "checkboxField",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        moduleData={moduleData}
        setModuleData={setModuleData}
      />
      <OptionsField moduleData={moduleData} setModuleData={setModuleData} />
      <DefaultValueField
        setModuleData={setModuleData}
        moduleData={moduleData}
      />
    </SimpleGrid>
  );
};
