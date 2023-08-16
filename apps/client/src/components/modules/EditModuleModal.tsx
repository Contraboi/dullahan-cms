import { Dispatch, SetStateAction } from "react";
import { Modal, Button } from "@mantine/core";
import { useTemplateStore } from "../../../contexts/TemplateContext";

type EditModuleModalProps = {
  isOpen: boolean;
  sectionName: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export const EditModuleModal = ({
  isOpen,
  setIsOpen,
  sectionName,
}: EditModuleModalProps) => {
  const {
    setSelectedModuleData,
    selectedModule,
    setTemplateData,
    templateData,
    selectedModuleData,
  } = useTemplateStore();

  if (!templateData) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        setIsOpen(false);
        setSelectedModuleData(null);
      }}
      size={"xl"}
    >
      {selectedModule}
      <Button
        onClick={() => {
          if (!selectedModuleData) return;

          setTemplateData({
            ...templateData,
            [sectionName]: {
              ...templateData[sectionName],
              [selectedModuleData.handle]: selectedModuleData!!,
            },
          });
          setSelectedModuleData(null);
          setIsOpen(false);
        }}
      >
        Update
      </Button>
    </Modal>
  );
};
