import { TemplateDataType } from "../../../contexts/TemplateContext";
import { Tabs } from "@mantine/core";
import { PreviewModules } from "../modules/previewModule/PreviewModules";

type SectionsType = {
  templateDataWithoutSideBar: TemplateDataType;
};

export const Sections = ({ templateDataWithoutSideBar }: SectionsType) => {
  console.log(templateDataWithoutSideBar, "templateDataWithoutSideBar");
  return (
    <Tabs defaultValue={"main"}>
      <Tabs.List>
        {Object.keys(templateDataWithoutSideBar).map((sectionKey) => (
          <Tabs.Tab key={sectionKey} value={sectionKey}>
            {sectionKey}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {Object.keys(templateDataWithoutSideBar).map((sectionKey) => {
        return (
          <>
            <Tabs.Panel value={sectionKey} key={sectionKey}>
              <PreviewModules
                sectionKey={sectionKey}
                templateData={templateDataWithoutSideBar[sectionKey]}
              />
            </Tabs.Panel>
          </>
        );
      })}
    </Tabs>
  );
};
