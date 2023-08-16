import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { PlaceholderField } from "../fields/PlaceholderField";
import { CharacterLimitField } from "../fields/CharacterLimitField";
import { DefaultValueField } from "../fields/DefaultValueField";
import { SimpleGrid } from "@mantine/core";
import { useModuleData } from "../../../../hooks/useModuleData";

type TextareaModuleProps = {
  sectionName: string;
  handle?: string;
};

export const TextareaModule = ({
  handle,
  sectionName,
}: TextareaModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Textarea Field",
      handle: "textareaField",
      type: "textarea",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        moduleData={moduleData!!}
        setModuleData={setModuleData}
      />
      <PlaceholderField setModuleData={setModuleData} moduleData={moduleData} />
      <CharacterLimitField
        setModuleData={setModuleData}
        moduleData={moduleData}
      />
      <DefaultValueField
        setModuleData={setModuleData}
        moduleData={moduleData}
      />
    </SimpleGrid>
  );
};
