import { DefaultFieldTypes, FieldTypes } from "../src/types/FieldTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTemplateStore } from "../contexts/TemplateContext";

export const useModuleData = ({
  handle,
  defaultData,
}: {
  handle?: string;
  defaultData: DefaultFieldTypes;
}): [FieldTypes, Dispatch<SetStateAction<FieldTypes>>] => {
  const { selectedModuleData, templateData, setSelectedModuleData } =
    useTemplateStore();

  const [moduleData, setModuleData] = useState<FieldTypes>(
    handle
      ? // If handle is provided, we are editing an existing module which is saved in TemplateContext with that handle
        templateData!![defaultData.section][handle]!!
      : // If selectedModuleData is not null, we are editing selected module
      selectedModuleData
      ? selectedModuleData
      : // else we are creating a new module with default data
        defaultData
  );

  useEffect(() => {
    setSelectedModuleData(moduleData);
  }, [moduleData]);

  return [moduleData, setModuleData];
};
