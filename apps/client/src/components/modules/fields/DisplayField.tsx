import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import * as React from "react";
import { DefaultFieldTypes } from "../../../types/FieldTypes";
import convertStringToCamelCase from "../../../../utils/convertStringToCamelCase";

type DisplayFieldProps = {
  moduleData: DefaultFieldTypes;
  setModuleData: (value: DefaultFieldTypes) => void;
};

const displayFieldData = {
  title: "Display",
  description: "The field's label shown in the Dashboard.",
};

export const DisplayField = ({
  moduleData,
  setModuleData,
}: DisplayFieldProps) => {
  console.log(moduleData);
  return (
    <Input.Wrapper
      id={displayFieldData.title}
      withAsterisk
      label={displayFieldData.title}
      description={displayFieldData.description}
    >
      <Input
        id="display"
        value={moduleData.display}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            display: e.target.value,
            handle: convertStringToCamelCase(e.target.value),
          })
        }
      />
    </Input.Wrapper>
  );
};
