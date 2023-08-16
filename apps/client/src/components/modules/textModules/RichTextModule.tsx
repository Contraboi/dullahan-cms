import { useModuleData } from "../../../../hooks/useModuleData";
import { SimpleGrid } from "@mantine/core";
import { DefaultModuleFields } from "../fields/DefaultModuleFields";

type RichTextModuleProps = {
  sectionName: string;
  handle?: string;
};
export const RichTextModule = ({
  handle,
  sectionName,
}: RichTextModuleProps) => {
  const [moduleData, setModuleData] = useModuleData({
    handle,
    defaultData: {
      section: sectionName,
      display: "Text Editor field",
      handle: "textEditorField",
      type: "textEditor",
    },
  });

  return (
    <SimpleGrid cols={1} verticalSpacing={"xl"} mt={"xl"}>
      <DefaultModuleFields
        moduleData={moduleData}
        setModuleData={setModuleData}
      />
    </SimpleGrid>
  );
};
