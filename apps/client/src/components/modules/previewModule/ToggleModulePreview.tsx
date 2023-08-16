import { Switch } from "@mantine/core";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { ChangeEvent } from "react";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const ToggleModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();
  const defaultValue =
    section && collectionContent
      ? // @ts-ignore TODO: fix this
        Boolean(collectionContent[section]?.[moduleData.handle])
      : moduleData.defaultValue;
  return (
    <Switch.Group
      id={moduleData.handle}
      label={moduleData.display}
      description={moduleData.instructions}
      withAsterisk={moduleData.required}
      defaultValue={["true"]}
    >
      <Switch
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
        value={defaultValue === true ? "true" : "false"}
        color={"teal"}
      />
    </Switch.Group>
  );
};
