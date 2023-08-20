import * as React from "react";
import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { PlaceholderField } from "../fields/PlaceholderField";
import { CharacterLimitField } from "../fields/CharacterLimitField";
import { DefaultValueField } from "../fields/DefaultValueField";
import { AppendField } from "../fields/AppendField";
import { PrependField } from "../fields/PrependField";
import { InputTypeField } from "../fields/InputTypeField";
import { useModuleData } from "../../../../hooks/useModuleData";

type TextModuleProps = {
  sectionName: string;
  handle?: string; // Handle is only passed when editing a module
};

export const TextModule = ({ handle, sectionName }: TextModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Text Field",
      handle: "textField",
      required: false,
      type: "text",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <>
        <DefaultModuleFields
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
      </>
      <SimpleGrid cols={2}>
        <PlaceholderField
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
        <InputTypeField moduleData={moduleData} setModuleData={setModuleData} />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <CharacterLimitField
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
        <PrependField setModuleData={setModuleData} moduleData={moduleData} />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <AppendField setModuleData={setModuleData} moduleData={moduleData} />
        <DefaultValueField
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};
