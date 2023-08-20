import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type PlaceholderFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const placeholderFieldData = {
  title: "Placeholder",
  description: "Elements placeholder text.",
};

export const PlaceholderField = ({
  setModuleData,
  moduleData,
}: PlaceholderFieldProps) => {
  return (
    <Input.Wrapper
      id={placeholderFieldData.title}
      label={placeholderFieldData.title}
      description={placeholderFieldData.description}
    >
      <Input
        id={placeholderFieldData.title}
        placeholder={"Something like this.."}
        value={moduleData.placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            placeholder: e.target.value,
          })
        }
      />
    </Input.Wrapper>
  );
};
