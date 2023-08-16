import { Input, Textarea } from "@mantine/core";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { ChangeEvent } from "react";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const TextareaModulePreview = ({
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
      <Textarea
        rows={100}
        id={moduleData.handle}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
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
        maxLength={moduleData.characterLimit}
        placeholder={moduleData.placeholder}
        defaultValue={
          section && collectionContent
            ? // @ts-ignore TODO: fix this
              collectionContent[section]?.[moduleData.handle]
            : moduleData.defaultValue
        }
      />
    </Input.Wrapper>
  );
};
