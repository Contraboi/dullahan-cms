import { FieldTypes } from "../../../types/FieldTypes";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

type MinimumFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const minimumFieldData = {
  title: "Minimum",
  description: "The minimum, left-most value.",
};

export const MinimumField = ({
  setModuleData,
  moduleData,
}: MinimumFieldProps) => {
  return (
    <Input.Wrapper
      id={minimumFieldData.title}
      label={minimumFieldData.title}
      description={minimumFieldData.description}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setModuleData({
          ...moduleData,
          min: parseInt(e.target.value),
        })
      }
    >
      <Input type={"number"} id={minimumFieldData.title} defaultValue={0} />
    </Input.Wrapper>
  );
};
