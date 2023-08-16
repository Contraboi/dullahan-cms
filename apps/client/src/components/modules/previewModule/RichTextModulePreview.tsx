import { RichTextEditor } from "@mantine/rte";
import { useEffect, useState } from "react";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { Input } from "@mantine/core";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const RichTextModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();
  const [value, setValue] = useState<string>("");
  console.log(value);
  return (
    <Input.Wrapper
      id={moduleData.handle}
      label={moduleData.display}
      description={moduleData.instructions}
      withAsterisk={moduleData.required}
    >
      <RichTextEditor
        id={moduleData.handle}
        value={value}
        onChange={(text) => {
          setValue(text);
          /*
                                        section &&
                                          setCollectionContent(
                                            handleModuleChange(text, collectionContent, moduleData, section)
                                          );
                              
                              
                                         */
        }}
      />
      <button
        onClick={() =>
          section &&
          setCollectionContent(
            handleModuleChange(value, collectionContent, moduleData, section)
          )
        }
      >
        update
      </button>
      <button
        onClick={() =>
          setValue(
            section && collectionContent
              ? // @ts-ignore TODO: Fix this
                collectionContent[section]?.[moduleData.handle]
              : moduleData.defaultValue ?? ""
          )
        }
      >
        refresh
      </button>
    </Input.Wrapper>
  );
};
