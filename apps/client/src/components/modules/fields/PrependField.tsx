import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type PrependFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const prependFieldData = {
  title: "Prepend",
  description: "Text to prepend to the element.",
};

export const PrependField = ({
  setModuleData,
  moduleData,
}: PrependFieldProps) => {
  return (
    <Input.Wrapper
      id={prependFieldData.title}
      label={prependFieldData.title}
      description={prependFieldData.description}
    >
      <Input
        id={prependFieldData.title}
        value={moduleData.prepend}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            prepend: e.target.value,
          })
        }
      />
    </Input.Wrapper>
  );
};
