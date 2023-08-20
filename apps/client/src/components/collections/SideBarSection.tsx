import { TemplateDataType } from "../../../contexts/TemplateContext";
import { Text } from "@mantine/core";
import { PreviewModules } from "../modules/previewModule/PreviewModules";

export const SideBarSection = ({
  sideBarData,
}: {
  sideBarData: TemplateDataType["sideBar"];
}) => {
  return (
    <>
      <Text
        style={{
          fontSize: "14px",
          height: "35px",
          display: "flex",
          alignItems: "center",
        }}
      >
        sideBar
      </Text>
      <PreviewModules
        templateData={sideBarData["sideBar"] as any}
        sectionKey={"sideBar"}
      />
    </>
  );
};
