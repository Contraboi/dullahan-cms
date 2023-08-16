import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import * as React from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type AppendFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const appendFieldData = {
  title: "Append",
  description: "Text to append to the element.",
};

export const AppendField = ({
  setModuleData,
  moduleData,
}: AppendFieldProps) => {
  return (
    <Input.Wrapper
      id={appendFieldData.title}
      label={appendFieldData.title}
      description={appendFieldData.description}
    >
      <Input
        id={appendFieldData.title}
        value={moduleData.append}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            append: e.target.value,
          })
        }
      />
    </Input.Wrapper>
  );
};
