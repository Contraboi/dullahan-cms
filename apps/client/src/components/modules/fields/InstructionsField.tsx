import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type InstructionsFieldProps = {
  defaultModuleData: FieldTypes;
  setDefaultModuleData: (value: FieldTypes) => void;
};

const instructionsFieldData = {
  title: "Instructions",
  description: "The field's instructions shown in the Dashboard.",
};

export const InstructionsField = ({
  defaultModuleData,
  setDefaultModuleData,
}: InstructionsFieldProps) => {
  return (
    <Input.Wrapper
      id={instructionsFieldData.title}
      label={instructionsFieldData.title}
      description={instructionsFieldData.description}
    >
      <Input
        id={instructionsFieldData.title}
        value={defaultModuleData.instructions ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDefaultModuleData({
            ...defaultModuleData,
            instructions: e.target.value,
          })
        }
      />
    </Input.Wrapper>
  );
};
