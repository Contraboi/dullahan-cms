import * as React from "react";
import { Layout } from "../../components/Layout";
import { View } from "../../components/View";
import { TableTemplate } from "../../components/dashboard/TableTemplate";
import { Group, Text } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { trpc } from "../../../utils/trpc";
import { CustomButton } from "../../components/CustomButton";
import { useCollectionEntryStore } from "../../../contexts/CollectionEntryContext";

export const Collection = () => {
  const { collectionHandle } = useParams();
  const navigate = useNavigate();
  const { collectionContent, setCollectionContent } = useCollectionEntryStore();
  const allCollections = trpc.collection.getAll.useQuery();
  const allCollectionEntries = trpc.collection.getAllEntries.useQuery({
    collectionHandle: collectionHandle ?? "",
  });

  if (collectionContent) setCollectionContent(undefined);

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
            <CustomButton actionOnClick={() => navigate("create")}>
              Create Collection Entry
            </CustomButton>
          </div>
        }
      >
        {allCollectionEntries.isLoading ? (
          <div>Loading</div>
        ) : (
          <TableTemplate
            tableHeads={[
              {
                title: "Title",
                width: "100%",
              },
            ]}
          >
            <tbody>
              {allCollectionEntries.data?.map((collectionEntry) => (
                <tr key={collectionEntry.id}>
                  <td>
                    <Group spacing="sm">
                      <Link
                        to={`${collectionEntry.id}`}
                        style={{ all: "initial", cursor: "pointer" }}
                      >
                        <Text size="sm" weight={500}>
                          {
                            // @ts-ignore TODO: Fix this
                            collectionEntry.content.main.title
                          }
                        </Text>
                      </Link>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableTemplate>
        )}
      </View>
    </Layout>
  );
};
