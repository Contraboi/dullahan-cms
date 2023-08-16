import { useModuleData } from "../../../../hooks/useModuleData";
import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { SetsField } from "../fields/SetsField";

type ReplicatorModuleProps = {
  sectionName: string;
  handle?: string;
};

export const ReplicatorModule = ({
  sectionName,
  handle,
}: ReplicatorModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Replicator field",
      handle: "replicatorField",
      type: "replicator",
    },
  });

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        moduleData={moduleData}
        setModuleData={setModuleData}
      />
      <SetsField />
    </SimpleGrid>
  );
};
