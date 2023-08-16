import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import { FieldTypes } from "../../../types/FieldTypes";

type CharacterLimitFieldProps = {
  setModuleData: (value: FieldTypes) => void;
  moduleData: FieldTypes;
};

const characterLimitFieldData = {
  title: "Character Limit",
  description: "Limit text.",
};

export const CharacterLimitField = ({
  setModuleData,
  moduleData,
}: CharacterLimitFieldProps) => {
  return (
    <Input.Wrapper
      id={characterLimitFieldData.title}
      label={characterLimitFieldData.title}
      description={characterLimitFieldData.description}
    >
      <Input
        id={characterLimitFieldData.title}
        value={moduleData.characterLimit}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setModuleData({
            ...moduleData,
            characterLimit: parseInt(e.target.value),
          })
        }
        type={"number"}
      />
    </Input.Wrapper>
  );
};
