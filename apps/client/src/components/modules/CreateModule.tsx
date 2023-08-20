import { ModuleTile } from "./ModuleTile";
import { FieldType } from "../../types/FieldTypes";
import { moduleSwitcher } from "./ModuleSwitcher";
import { useTemplateStore } from "../../../contexts/TemplateContext";

type CreateModuleProps = {
  goToNextStep: () => void;
  type: FieldType;
  sectionName: string;
};

export const CreateModule = ({
  goToNextStep,
  type,
  sectionName,
}: CreateModuleProps) => {
  const { setSelectedModule } = useTemplateStore();
  const createModuleData = moduleSwitcher(type, sectionName);

  return (
    <span
      onClick={() => {
        setSelectedModule(createModuleData.module);
        goToNextStep();
      }}
    >
      <ModuleTile title={createModuleData.title} icon={createModuleData.icon} />
    </span>
  );
};
