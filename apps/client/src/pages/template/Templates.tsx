import * as React from "react";
import { Layout } from "../../components/Layout";
import { View } from "../../components/View";
import { mainLinksData } from "../../../App";
import { CreateContentType } from "../../components/CreateContentType";
import { TableTemplate } from "../../components/dashboard/TableTemplate";
import { Center, Group, Loader, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { TemplateDataType } from "../../../contexts/TemplateContext";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import convertStringToCamelCase from "../../../utils/convertStringToCamelCase";

export type TemplateType = {
  title: string;
  handle: string;
  templateData: TemplateDataType | undefined;
};

export const Templates = () => {
  const allCollections = trpc.collection.getAll.useQuery();
  const allTemplates = trpc.template.getAll.useQuery();
  const createTemplate = trpc.template.create.useMutation();
  const [templateTitle, setTemplateTitle] = useState("");

  return (
    <Layout links={allTemplates.data} path={"templates"} title={"Templates"}>
      <View
        title={mainLinksData.templates.label}
        button={
          <CreateContentType
            title={mainLinksData.templates.label}
            selectData={allCollections.data}
            setContentTypeTitle={setTemplateTitle}
            contentTypeTitle={templateTitle}
            onButtonClick={async () => {
              const templateTitleCamelCased =
                convertStringToCamelCase(templateTitle);
              await createTemplate.mutateAsync({
                title: templateTitle,
                handle: templateTitleCamelCased,
                templateData: undefined,
              });
              await allTemplates.refetch();
            }}
          />
        }
      >
        <>
          {allTemplates.isLoading ? (
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
              ]}
            >
              {allTemplates.data?.map((template) => (
                <tbody>
                  <tr key={template.title}>
                    <td>
                      <Group spacing="sm">
                        <Link
                          to={`${template.handle}`}
                          style={{ all: "initial", cursor: "pointer" }}
                        >
                          <Text size="sm" weight={500}>
                            {template.title}
                          </Text>
                          <Text size="xs" color="dimmed">
                            {template.handle}
                          </Text>
                        </Link>
                      </Group>
                    </td>
                  </tr>
                </tbody>
              ))}
            </TableTemplate>
          )}
        </>
      </View>
    </Layout>
  );
};
