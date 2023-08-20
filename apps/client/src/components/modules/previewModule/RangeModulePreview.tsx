import { Input, Slider } from "@mantine/core";
import { ModulePreviewProps } from "./TextModulePreview";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { handleModuleChange } from "../../../pages/collection/utils/handleModuleChange";

export const RangeModulePreview = ({
  moduleData,
  section,
}: ModulePreviewProps) => {
  const { setCollectionContent, collectionContent } = useCollectionEntryStore();
  const defaultValue =
    section && collectionContent
      ? // @ts-ignore TODO: fix this
        collectionContent[section][moduleData.handle]
        ? moduleData.defaultValue
        : "0"
      : "0";

  return (
    <Input.Wrapper
      id={moduleData.handle}
      label={moduleData.display}
      description={moduleData.instructions}
      withAsterisk={moduleData.required}
    >
      <Slider
        mt={"sm"}
        defaultValue={parseInt(defaultValue ?? "0")}
        thumbLabel={moduleData.display}
        onChange={(number) => {
          section &&
            setCollectionContent(
              handleModuleChange(
                String(number),
                collectionContent,
                moduleData,
                section
              )
            );
        }}
        min={moduleData.min}
        max={moduleData.max}
        step={moduleData.step}
      />
    </Input.Wrapper>
  );
};
