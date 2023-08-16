import { Input } from "@mantine/core";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { ChangeEvent } from "react";
import { ModulePreviewProps } from "./TextModulePreview";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const NumberModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();
  const defaultValue =
    section && collectionContent
      ? // @ts-ignore TODO: fix this
        collectionContent[section][moduleData.handle]
      : moduleData.defaultValue;

  return (
    <Input.Wrapper
      id={moduleData.handle}
      label={moduleData.display}
      description={moduleData.instructions}
      withAsterisk={moduleData.required}
    >
      <Input
        type="number"
        value={moduleData.defaultValue}
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
        defaultValue={defaultValue}
      />
    </Input.Wrapper>
  );
};
