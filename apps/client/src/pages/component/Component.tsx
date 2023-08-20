import { View } from "../../components/View";
import { CustomButton } from "../../components/CustomButton";
import { Center, Loader } from "@mantine/core";
import { Layout } from "../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { useParams } from "react-router-dom";
import { Tab } from "../../components/tabSection/Tab";
import { useTemplateStore } from "../../../contexts/TemplateContext";
import { useTemplateDataSetter } from "../../../hooks/useTemplateDataSetter";

export const Component = () => {
  const { componentHandle } = useParams();
  const allComponents = trpc.component.getAll.useQuery();
  const currentComponent = trpc.component.getOne.useQuery({
    handle: componentHandle ?? "",
  });
  const updateComponent = trpc.component.update.useMutation({
    onSuccess: () => {
      alert("Component updated");
    },
  });

  const { templateData } = useTemplateStore();
  useTemplateDataSetter(currentComponent, componentHandle);

  return (
    <Layout links={allComponents.data} path={"components"} title={"Components"}>
      <View
        title={`Edit ${componentHandle} component`}
        button={
          <CustomButton
            actionOnClick={() => {
              if (!componentHandle) return;
              if (templateData) {
                updateComponent.mutate({
                  handle: componentHandle ?? "",
                  templateData: templateData,
                });
              }
            }}
          >
            <>Save component</>
          </CustomButton>
        }
      >
        {currentComponent.isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Tab id={1} onRemove={() => {}} tabName={componentHandle} />
        )}
      </View>
    </Layout>
  );
};
