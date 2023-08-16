import { View } from "../../components/View";
import { CreateContentType } from "../../components/CreateContentType";
import { TableTemplate } from "../../components/dashboard/TableTemplate";
import { mainLinksData } from "../../../App";
import { Layout } from "../../components/Layout";
import { Group, Loader, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import convertStringToCamelCase from "../../../utils/convertStringToCamelCase";

export const Collections = () => {
  const allCollections = trpc.collection.getAll.useQuery();
  const createCollection = trpc.collection.create.useMutation();
  const [collectionTitle, setCollectionTitle] = useState("");

  return (
    <Layout
      links={allCollections.data}
      path={"collections"}
      title={"Collections"}
    >
      <View
        title={mainLinksData.collections.label}
        button={
          <CreateContentType
            title={mainLinksData.collections.label}
            contentTypeTitle={collectionTitle}
            setContentTypeTitle={setCollectionTitle}
            onButtonClick={async () => {
              const collectionTitleCamelCased =
                convertStringToCamelCase(collectionTitle);

              await createCollection.mutateAsync({
                title: collectionTitle,
                handle: collectionTitleCamelCased,
                templates: [collectionTitleCamelCased],
              });
              await allCollections.refetch();
            }}
          />
        }
      >
        {allCollections.isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <TableTemplate
            tableHeads={[
              {
                title: "Title",
                width: "100%",
              },
              {
                title: "Entries",
              },
            ]}
          >
            {allCollections.data?.map((collection) => (
              <tbody>
                <tr key={collection.title}>
                  <td>
                    <Group spacing="sm">
                      <Link
                        to={`${collection.handle}`}
                        style={{ all: "initial", cursor: "pointer" }}
                      >
                        <Text size="sm" weight={500}>
                          {collection.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {collection.handle}
                        </Text>
                      </Link>
                    </Group>
                  </td>
                  <td>
                    <Text size="sm" weight={500}>
                      0
                    </Text>
                  </td>
                </tr>
              </tbody>
            ))}
          </TableTemplate>
        )}
      </View>
    </Layout>
  );
};
