import { Checkbox } from "@mantine/core";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { ChangeEvent } from "react";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const CheckboxModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();

  return (
    <Checkbox.Group
      defaultValue={[moduleData.defaultValue ?? "none"]}
      label={moduleData.display}
      description={moduleData.instructions}
      offset="sm"
      withAsterisk={moduleData.required}
    >
      {moduleData.options?.map((option, index) => (
        <Checkbox
          key={index}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            section &&
            setCollectionContent(
              handleModuleChange(
                e.target.value,
                collectionContent,
                moduleData,
                section
              )
            )
          }
          value={option.key}
          label={option.label === "" ? option.key : option.label}
        />
      ))}
    </Checkbox.Group>
  );
};
