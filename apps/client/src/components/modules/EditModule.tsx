import { ModuleTile } from "./ModuleTile";
import { FieldType } from "../../types/FieldTypes";
import { moduleSwitcher } from "./ModuleSwitcher";
import { useTemplateStore } from "../../../contexts/TemplateContext";

type EditModuleProps = {
  type: FieldType;
  handle: string;
  label?: string;
  sectionName: string;
  openEditModal: (setOpen: boolean) => void;
};

export const EditModule = ({
  type,
  openEditModal,
  handle,
  sectionName,
  label,
}: EditModuleProps) => {
  const { setSelectedModule } = useTemplateStore();
  const editModuleData = moduleSwitcher(type, sectionName, handle);
  return (
    <span
      onClick={() => {
        openEditModal(true);
        setSelectedModule(editModuleData.module);
      }}
    >
      <ModuleTile
        title={label ? label : editModuleData.title}
        icon={editModuleData.icon}
      />
    </span>
  );
};
