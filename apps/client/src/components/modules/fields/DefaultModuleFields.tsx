import * as React from "react";
import { Group, SimpleGrid, Box } from "@mantine/core";
import { DisplayField } from "./DisplayField";
import { HandleField } from "./HandleField";
import { InstructionsField } from "./InstructionsField";
import { DefaultFieldTypes } from "../../../types/FieldTypes";
import { RequiredField } from "./RequiredField";

type DefaultModuleElementsProps = {
  moduleData: DefaultFieldTypes;
  setModuleData: (value: DefaultFieldTypes) => void;
};

export const DefaultModuleFields = ({
  moduleData,
  setModuleData,
}: DefaultModuleElementsProps) => {
  return (
    <>
      <SimpleGrid cols={2}>
        <DisplayField moduleData={moduleData} setModuleData={setModuleData} />
        <HandleField
          defaultModuleData={moduleData}
          setDefaultModuleData={setModuleData}
        />
      </SimpleGrid>
      <Group>
        <Box style={{ width: "75%" }} mr={"5%"}>
          <InstructionsField
            defaultModuleData={moduleData}
            setDefaultModuleData={setModuleData}
          />
        </Box>
        <RequiredField
          defaultModuleData={moduleData}
          setDefaultModuleData={setModuleData}
        />
      </Group>
    </>
  );
};
