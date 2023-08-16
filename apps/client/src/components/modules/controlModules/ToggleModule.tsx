import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { ToggleField } from "../fields/ToggleField";
import { useModuleData } from "../../../../hooks/useModuleData";

type ToggleModuleProps = {
  sectionName: string;
  handle?: string;
};
export const ToggleModule = ({ handle, sectionName }: ToggleModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Toggle Field",
      type: "toggle",
      handle: "toggleField",
    },
  });

  if (!moduleData) return null;

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        setModuleData={setModuleData}
        moduleData={moduleData!!}
      />
      <SimpleGrid cols={2}>
        <ToggleField setModuleData={setModuleData} moduleData={moduleData} />
      </SimpleGrid>
    </SimpleGrid>
  );
};
