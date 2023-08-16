import { Layout } from "../../../components/Layout";
import { View } from "../../../components/View";
import { Center, Loader, Grid } from "@mantine/core";
import { Sections } from "../../../components/collections/Sections";
import { SideBarSection } from "../../../components/collections/SideBarSection";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { trpc } from "../../../../utils/trpc";
import { useNavigate, useParams } from "react-router-dom";
import { TemplateDataType } from "../../../../contexts/TemplateContext";
import { CustomButton } from "../../../components/CustomButton";
import * as React from "react";
import { FieldTypes } from "../../../types/FieldTypes";

export const CreateCollectionEntry = () => {
  const { collectionHandle } = useParams();
  const navigate = useNavigate();
  const allCollections = trpc.collection.getAll.useQuery();
  const createCollectionEntry = trpc.collection.createEntry.useMutation({
    onSuccess: () => {
      navigate(`/collections/${collectionHandle}`);
    },
  });
  const template = trpc.template.getOne.useQuery({
    handle: collectionHandle ?? "",
  });
  const { collectionContent } = useCollectionEntryStore();

  if (!template.data || !template.data.templateData) return null;

  const sideBarData: { [key: string]: FieldTypes } = Object.fromEntries(
    Object.entries(template.data.templateData).filter(([key]) =>
      key.includes("sideBar"),
    ),
  );
  const templateDataWithoutSideBar = Object.fromEntries(
    Object.entries(template.data.templateData).filter(
      ([key]) => !key.includes("sideBar"),
    ),
  );
  console.log(sideBarData);
  const saveCollectionEntry = async () => {
    console.log(collectionContent);
    console.log(collectionHandle);
    if (!collectionContent) return;
    createCollectionEntry.mutate({
      collectionHandle: collectionHandle ?? "",
      content: collectionContent,
    });
  };

  return (
    <Layout
      links={allCollections.data}
      path="collections"
      title={"Collections"}
    >
      <View
        title={collectionHandle ?? ""}
        button={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton
              actionOnClick={async () => await saveCollectionEntry()}
            >
              Create Collection Entry
            </CustomButton>
          </div>
        }
      >
        {template.isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Grid>
            <Grid.Col span={8}>
              <Sections
                templateDataWithoutSideBar={
                  templateDataWithoutSideBar as TemplateDataType
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <SideBarSection sideBarData={sideBarData} />
            </Grid.Col>
          </Grid>
        )}
      </View>
    </Layout>
  );
};
