import { FieldTypes } from "../../../types/FieldTypes";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

type MaximumFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const maximumFieldData = {
  title: "Maximum",
  description: "The maximum, right-most value.",
};

export const MaximumField = ({
  setModuleData,
  moduleData,
}: MaximumFieldProps) => {
  return (
    <Input.Wrapper
      id={maximumFieldData.title}
      label={maximumFieldData.title}
      description={maximumFieldData.description}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setModuleData({
          ...moduleData,
          max: parseInt(e.target.value),
        })
      }
    >
      <Input type={"number"} id={maximumFieldData.title} defaultValue={100} />
    </Input.Wrapper>
  );
};
