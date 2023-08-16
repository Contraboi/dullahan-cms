import * as React from "react";
import { Layout } from "../../components/Layout";
import { View } from "../../components/View";
import { mainLinksData } from "../../../App";
import { trpc } from "../../../utils/trpc";
import { CreateContentType } from "../../components/CreateContentType";
import convertStringToCamelCase from "../../../utils/convertStringToCamelCase";
import { Center, Group, Loader, Text } from "@mantine/core";
import { TableTemplate } from "../../components/dashboard/TableTemplate";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Components = () => {
  const allComponents = trpc.component.getAll.useQuery();
  const createComponent = trpc.component.create.useMutation();
  const [componentTitle, setComponentTitle] = useState("");

  return (
    <Layout title={"Components"}>
      <View
        title={mainLinksData.components.label}
        button={
          <CreateContentType
            title={mainLinksData.components.label}
            contentTypeTitle={componentTitle}
            setContentTypeTitle={setComponentTitle}
            onButtonClick={async () => {
              const collectionTitleCamelCased =
                convertStringToCamelCase(componentTitle);
              await createComponent.mutateAsync({
                title: componentTitle,
                handle: collectionTitleCamelCased,
                templateData: {},
              });
              await allComponents.refetch();
            }}
          />
        }
      >
        {allComponents.isLoading ? (
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
            {allComponents.data?.map((component) => (
              <tbody>
                <tr key={component.title}>
                  <td>
                    <Group spacing="sm">
                      <Link
                        to={`${component.handle}`}
                        style={{ all: "initial", cursor: "pointer" }}
                      >
                        <Text size="sm" weight={500}>
                          {component.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {component.handle}
                        </Text>
                      </Link>
                    </Group>
                  </td>
                  <td>
                    <Text size="sm" weight={500}>
                      3
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
