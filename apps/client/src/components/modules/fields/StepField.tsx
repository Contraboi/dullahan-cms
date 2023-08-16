import { FieldTypes } from "../../../types/FieldTypes";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

type StepFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const stepFieldData = {
  title: "Step",
  description: "The minimum size between values.",
};

export const StepField = ({ setModuleData, moduleData }: StepFieldProps) => {
  return (
    <Input.Wrapper
      id={stepFieldData.title}
      label={stepFieldData.title}
      description={stepFieldData.description}
    >
      <Input
        type={"number"}
        id={stepFieldData.title}
        defaultValue={1}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            step: parseInt(e.target.value),
          })
        }
      />
    </Input.Wrapper>
  );
};
