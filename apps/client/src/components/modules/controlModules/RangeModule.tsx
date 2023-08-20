import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";
import { MinimumField } from "../fields/MinimumField";
import { MaximumField } from "../fields/MaximumField";
import { StepField } from "../fields/StepField";
import { DefaultValueField } from "../fields/DefaultValueField";
import { useModuleData } from "../../../../hooks/useModuleData";

type RangeModuleProps = {
  sectionName: string;
  handle?: string;
};

export const RangeModule = ({ handle, sectionName }: RangeModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Range Field",
      type: "range",
      handle: "rangeField",
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
        <MinimumField setModuleData={setModuleData} moduleData={moduleData} />
        <MaximumField setModuleData={setModuleData} moduleData={moduleData} />
        <StepField setModuleData={setModuleData} moduleData={moduleData} />
        <DefaultValueField
          setModuleData={setModuleData}
          moduleData={moduleData}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};
