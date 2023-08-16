import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { DefaultValueField } from "../fields/DefaultValueField";
import { useModuleData } from "../../../../hooks/useModuleData";

type NumberModuleProps = {
  sectionName: string;
  handle?: string;
};

export const NumberModule = ({ handle, sectionName }: NumberModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Number Field",
      type: "number",
      handle: "numberField",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        setModuleData={setModuleData}
        moduleData={moduleData!!}
      />
      <SimpleGrid cols={1}>
        <DefaultValueField
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};
