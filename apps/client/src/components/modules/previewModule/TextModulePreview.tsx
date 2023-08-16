import { FieldTypes } from "../../../types/FieldTypes";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export type ModulePreviewProps = {
  moduleData: FieldTypes;
  section?: string;
};

export const TextModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();
  return (
    <Input.Wrapper
      id={moduleData.handle}
      label={moduleData.display}
      description={moduleData.instructions}
      withAsterisk={moduleData.required}
    >
      <Input
        id={moduleData.handle}
        type={moduleData.inputType ?? "text"}
        maxLength={moduleData.characterLimit}
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
        placeholder={moduleData.placeholder}
        defaultValue={
          section && collectionContent
            ? // @ts-ignore TODO: Fix this
              collectionContent[section]?.[moduleData.handle]
            : moduleData.defaultValue
        }
      />
    </Input.Wrapper>
  );
};
