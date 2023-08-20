import { Input, Textarea } from "@mantine/core";
import { ChangeEvent } from "react";
import * as React from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type DefaultValueProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};
const defaultValueFieldData = {
  title: "Default Value",
  description: "The element's default value.",
};

export const DefaultValueField = ({
  setModuleData,
  moduleData,
}: DefaultValueProps) => {
  return (
    <Input.Wrapper
      id={defaultValueFieldData.title}
      label={defaultValueFieldData.title}
      description={defaultValueFieldData.description}
    >
      {moduleData.type === "textarea" ? (
        <Textarea
          value={moduleData.defaultValue}
          id={defaultValueFieldData.title}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setModuleData({
              ...moduleData,
              defaultValue: e.target.value,
            })
          }
        />
      ) : (
        <Input
          id={defaultValueFieldData.title}
          value={moduleData.defaultValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setModuleData({
              ...moduleData,
              defaultValue: e.target.value,
            })
          }
        />
      )}
    </Input.Wrapper>
  );
};
