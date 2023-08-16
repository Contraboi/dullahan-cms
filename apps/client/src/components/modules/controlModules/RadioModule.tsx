import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { OptionsField } from "../fields/OptionsField";
import { DefaultValueField } from "../fields/DefaultValueField";
import { useModuleData } from "../../../../hooks/useModuleData";

type RadioModuleProps = {
  sectionName: string;
  handle?: string;
};

export const RadioModule = ({ handle, sectionName }: RadioModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Radio Field",
      type: "radio",
      handle: "radioField",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        moduleData={moduleData!!}
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
