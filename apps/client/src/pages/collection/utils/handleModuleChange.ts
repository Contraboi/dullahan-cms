import { FieldTypes } from "../../../types/FieldTypes";
import { CollectionEntryContent } from "../../../../../server/src/interfaces/CMS";

export const handleModuleChange = (
  changedValue: string,
  collectionContent: CollectionEntryContent | undefined,
  moduleData: FieldTypes,
  section: string
) => {
  return {
    // @ts-ignore
    ...collectionContent,
    [section]: {
      // @ts-ignore TODO: fix this
      ...collectionContent?.[section],
      [moduleData.handle]: changedValue,
    },
  };
};
