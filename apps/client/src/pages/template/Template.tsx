import { Layout } from "../../components/Layout";
import { View } from "../../components/View";
import { TabGrid } from "../../components/tabSection/TabGrid";
import { CustomButton } from "../../components/CustomButton";
import { useTemplateStore } from "../../../contexts/TemplateContext";
import { useParams } from "react-router-dom";
import { Loader, Center } from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { useTemplateDataSetter } from "../../../hooks/useTemplateDataSetter";

export const Template = () => {
  const { templateHandle } = useParams();
  const allTemplates = trpc.template.getAll.useQuery();
  const currentTemplate = trpc.template.getOne.useQuery({
    handle: templateHandle ?? "",
  });
  const saveTemplate = trpc.template.edit.useMutation({
    onSuccess: () => {
      alert("Template saved!");
    },
  });

  const { templateData } = useTemplateStore();
  useTemplateDataSetter(currentTemplate, templateHandle);

  return (
    <Layout links={allTemplates.data} path={"templates"} title={"Templates"}>
      <View
        title={`Edit ${templateHandle} template`}
        button={
          <CustomButton
            actionOnClick={() => {
              saveTemplate.mutate({
                handle: templateHandle ?? "",
                data: templateData,
              });
            }}
          >
            <>Save Template</>
          </CustomButton>
        }
      >
        {currentTemplate.isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <TabGrid />
        )}
      </View>
    </Layout>
  );
};
