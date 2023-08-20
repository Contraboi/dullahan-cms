import { EditModuleModal } from "../modules/EditModuleModal";
import * as React from "react";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTemplateStore } from "../../../contexts/TemplateContext";
import { EditModule } from "../modules/EditModule";

type TabModulesProps = {
  sectionName: string;
};

export const SectionModules = ({ sectionName }: TabModulesProps) => {
  const { selectedModule, templateData } = useTemplateStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  // TODO Find better solution for this
  // To trigger re-render when selectedModule changes
  useEffect(() => {}, [selectedModule]);

  if (!templateData) return null;

  return (
    <SimpleGrid cols={1} ref={animateParent}>
      {templateData[sectionName] &&
        Object.keys(templateData[sectionName]).map((fieldTypeKey, index) => (
          <EditModule
            key={index}
            sectionName={sectionName}
            type={templateData?.[sectionName][fieldTypeKey].type}
            handle={templateData?.[sectionName][fieldTypeKey].handle}
            label={templateData?.[sectionName][fieldTypeKey].display}
            openEditModal={setIsModalOpen}
          />
        ))}
      <EditModuleModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        sectionName={sectionName}
      />
    </SimpleGrid>
  );
};
