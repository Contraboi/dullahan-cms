import { Input } from "@mantine/core";
import * as React from "react";
import { DefaultFieldTypes } from "../../../types/FieldTypes";
import convertStringToCamelCase from "../../../../utils/convertStringToCamelCase";

type HandleFieldProps = {
  defaultModuleData: DefaultFieldTypes;
  setDefaultModuleData: (value: DefaultFieldTypes) => void;
};

const handleFieldData = {
  title: "Handle",
  description: "The module's template variable.",
};

export const HandleField = ({ defaultModuleData }: HandleFieldProps) => {
  return (
    <Input.Wrapper
      id={handleFieldData.title}
      label={handleFieldData.title}
      description={handleFieldData.description}
    >
      <Input
        readOnly
        id={handleFieldData.title}
        value={convertStringToCamelCase(defaultModuleData.display)}
      />
    </Input.Wrapper>
  );
};
