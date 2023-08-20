import { Stepper, Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import { ModulePicker } from "./modules/ModulePicker";
import { useTemplateStore } from "../../contexts/TemplateContext";
import { PreviewModule } from "./modules/previewModule/PreviewModule";

const FORM_STEPS_LENGTH = 3;

type CreateModuleModalProps = {
  sectionName: string;
};

export const CreateModuleModal = ({ sectionName }: CreateModuleModalProps) => {
  const {
    setTemplateData,
    templateData,
    selectedModule,
    selectedModuleData,
    setSelectedModuleData,
  } = useTemplateStore();
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const nextStep = () =>
    setActive((current) =>
      current < FORM_STEPS_LENGTH ? current + 1 : current
    );

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    if (active === 1) setSelectedModuleData(null);
  };

  const saveModule = () => {
    if (selectedModuleData && templateData) {
      const doesFieldExist = templateData
        ? Object.keys(templateData[sectionName])?.some(
            (key) =>
              templateData[sectionName][key].handle ===
              selectedModuleData.handle
          )
        : false;

      if (!doesFieldExist) {
        setTemplateData({
          ...templateData,
          [sectionName]: {
            ...templateData?.[sectionName],
            [selectedModuleData.handle]: selectedModuleData,
          },
        });
        setOpened(false);
        setActive(0);
        setSelectedModuleData(null);
      } else {
        alert(
          `Field with ${selectedModuleData.handle} handle/id already exists`
        );
        prevStep();
      }
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        color={"blue"}
        onClick={() => setOpened(true)}
      >
        Create Field
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} size={"xl"}>
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="Choose a module" description="First step">
            <ModulePicker
              whenModuleSelected={nextStep}
              sectionName={sectionName}
            />
          </Stepper.Step>
          <Stepper.Step label="Settings" description="Second step">
            {selectedModule}
          </Stepper.Step>
          <Stepper.Step label="Preview" description="Final step">
            {templateData &&
              templateData[sectionName] &&
              Object.keys(templateData[sectionName]).map((key) => (
                <PreviewModule
                  key={key}
                  type={templateData?.[sectionName][key].type!!}
                  moduleData={templateData?.[sectionName][key]!!}
                />
              ))}
            {selectedModuleData && (
              <PreviewModule
                type={selectedModuleData.type}
                moduleData={selectedModuleData}
              />
            )}
          </Stepper.Step>
        </Stepper>
        <Group position="center" mt="xl">
          {active > 0 && (
            <Button onClick={prevStep} variant="subtle">
              Back
            </Button>
          )}
          {active < FORM_STEPS_LENGTH && active === 1 && (
            <Button onClick={nextStep} variant={"light"}>
              Next
            </Button>
          )}
          {active === FORM_STEPS_LENGTH - 1 && (
            <Button onClick={() => saveModule()}>Save</Button>
          )}
        </Group>
      </Modal>
    </>
  );
};
