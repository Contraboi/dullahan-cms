import { FieldTypes } from "../src/types/FieldTypes";
import create from "zustand";

export type TemplateDataType = {
  [sectionKey: string]: { [moduleKey: string]: FieldTypes };
};

type TemplateStoreProps = {
  selectedModule: JSX.Element | undefined;
  setSelectedModule: (selectedModule: JSX.Element) => void;
  selectedModuleData: FieldTypes | null;
  setSelectedModuleData: (selectedModuleData: FieldTypes | null) => void;
  templateData: TemplateDataType | undefined;
  setTemplateData: (templateData: TemplateDataType | undefined) => void;
};

export const useTemplateStore = create<TemplateStoreProps>((set) => ({
  selectedModule: undefined,
  setSelectedModule: (selectedModule) => set({ selectedModule }),
  selectedModuleData: null,
  setSelectedModuleData: (selectedModuleData: FieldTypes | null) =>
    set({ selectedModuleData }),
  templateData: undefined,
  setTemplateData: (templateData) => set({ templateData }),
}));
