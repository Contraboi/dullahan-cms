import { FieldTypes } from "../../../types/FieldTypes";
import { Switch } from "@mantine/core";
import { useState } from "react";
import { Input } from "@mantine/core";

type ToggleFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const toggleFieldData = {
  title: "Default Value",
  description: "Set the default value.",
};

export const ToggleField = ({
  setModuleData,
  moduleData,
}: ToggleFieldProps) => {
  const [checked, setChecked] = useState<boolean>(moduleData.boolean ?? false);
  return (
    <Input.Wrapper>
      <Switch
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
          setModuleData({
            ...moduleData,
            boolean: event.currentTarget.checked,
          });
        }}
        color="teal"
        size="md"
        label={toggleFieldData.title}
      />
    </Input.Wrapper>
  );
};
