import { Radio } from "@mantine/core";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { ChangeEvent } from "react";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const RadioModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();

  return (
    <Radio.Group
      label={moduleData.display}
      description={moduleData.instructions}
      offset="sm"
      withAsterisk={moduleData.required}
    >
      {moduleData.options?.map((option, index) => (
        <Radio
          key={index}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            section &&
              setCollectionContent(
                handleModuleChange(
                  e.target.value,
                  collectionContent,
                  moduleData,
                  section
                )
              );
          }}
          checked={
            option.key === section && collectionContent
              ? // @ts-ignore TODO: fix this
                Boolean(collectionContent[section]?.[moduleData.handle])
              : Boolean(moduleData.defaultValue)
          }
          value={option.key}
          label={option.label === "" ? option.key : option.label}
        />
      ))}
    </Radio.Group>
  );
};
