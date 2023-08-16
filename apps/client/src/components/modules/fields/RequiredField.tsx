import { FieldTypes } from "../../../types/FieldTypes";
import { Input, Switch } from "@mantine/core";
import { useState } from "react";

type RequiredFieldProps = {
  defaultModuleData: FieldTypes;
  setDefaultModuleData: (value: FieldTypes) => void;
};
const instructionsFieldData = {
  title: "Required?",
  description: "Is this field required?",
};
export const RequiredField = ({
  defaultModuleData,
  setDefaultModuleData,
}: RequiredFieldProps) => {
  const [checked, setChecked] = useState(defaultModuleData.required ?? false);
  return (
    <Input.Wrapper
      id={instructionsFieldData.title}
      label={instructionsFieldData.title}
      description={instructionsFieldData.description}
    >
      <Switch
        mt={"sm"}
        id={instructionsFieldData.title}
        checked={checked}
        onLabel={"YES"}
        size={"md"}
        offLabel={"NO"}
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
          setDefaultModuleData({
            ...defaultModuleData,
            required: !checked,
          });
        }}
      />
    </Input.Wrapper>
  );
};
