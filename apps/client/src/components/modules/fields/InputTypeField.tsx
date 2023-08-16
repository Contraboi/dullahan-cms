import { Select } from "@mantine/core";
import { ChangeEvent } from "react";
import * as React from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type InputTypeFieldProps = {
  moduleData: FieldTypes;
  setModuleData: (value: FieldTypes) => void;
};

const inputTypeFieldData = {
  title: "Input Type",
  description: "The type of input element.",
};
export const InputTypeField = ({
  moduleData,
  setModuleData,
}: InputTypeFieldProps) => {
  return (
    <Select
      label={inputTypeFieldData.title}
      description={inputTypeFieldData.description}
      defaultValue={moduleData.inputType ?? "text"}
      searchable
      onSelect={(e: ChangeEvent<HTMLInputElement>) =>
        setModuleData({
          ...moduleData,
          inputType: e.target.value,
        })
      }
      data={[
        { value: "color", label: "color" },
        { value: "text", label: "text" },
        { value: "date", label: "date" },
        { value: "email", label: "email" },
        { value: "password", label: "password" },
        { value: "hidden", label: "hidden" },
        { value: "month", label: "month" },
        { value: "tel", label: "tel" },
        { value: "time", label: "time" },
        { value: "url", label: "url" },
        { value: "week", label: "week" },
      ]}
    />
  );
};
