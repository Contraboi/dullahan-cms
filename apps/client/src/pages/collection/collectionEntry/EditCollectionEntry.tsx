import * as React from "react";
import { Layout } from "../../../components/Layout";
import { View } from "../../../components/View";
import { Center, Grid, Loader } from "@mantine/core";
import { Sections } from "../../../components/collections/Sections";
import { SideBarSection } from "../../../components/collections/SideBarSection";
import { useParams } from "react-router-dom";
import { useCollectionEntryStore } from "../../../../contexts/CollectionEntryContext";
import { trpc } from "../../../../utils/trpc";
import { TemplateDataType } from "../../../../contexts/TemplateContext";
import { CustomButton } from "../../../components/CustomButton";
import { CollectionEntryContent } from "../../../../../server/src/interfaces/CMS";

export const EditCollectionEntry = () => {
  const { collectionEntryId, collectionHandle } = useParams();
  const allCollections = trpc.collection.getAll.useQuery();
  const template = trpc.template.getOne.useQuery({
    handle: collectionHandle ?? "",
  });

  console.log(template, "template");

  const { collectionContent, setCollectionContent } = useCollectionEntryStore();
  trpc.collection.getEntry.useQuery(
    {
      collectionHandle: collectionHandle ?? "",
      entryId: collectionEntryId ?? "",
    },
    {
      onSuccess: async (response) => {
        if (response) {
          // @ts-ignore TODO: Fix this
          const content = response.content as CollectionEntryContent;
          setCollectionContent(content);
        }
      },
    }
  );
  const updateCollectionEntry = trpc.collection.updateEntry.useMutation({
    onSuccess: () => {
      alert("success");
    },
  });

  if (!template.data || !template.data.templateData) return null;

  const sideBarData = Object.fromEntries(
    Object.entries(template.data.templateData).filter(([key]) =>
      key.includes("sideBar")
    )
  );
  const templateDataWithoutSideBar = Object.fromEntries(
    Object.entries(template.data.templateData).filter(
      ([key]) => !key.includes("sideBar")
    )
  );

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
              actionOnClick={async () => {
                if (!collectionContent) return;
                await updateCollectionEntry.mutateAsync({
                  collectionHandle: collectionHandle ?? "",
                  entryId: collectionEntryId ?? "",
                  content: collectionContent,
                });
              }}
            >
              Edit Collection Entry
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
