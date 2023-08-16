import { Drawer, SimpleGrid, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { trpc } from "../../../utils/trpc";
import { ModuleTile } from "../modules/ModuleTile";
import { IconCode } from "@tabler/icons";
import * as React from "react";
import { LeftNavbarStyled } from "../dashboard/leftNavbar/LeftNavbar.styled";
import { useTemplateStore } from "../../../contexts/TemplateContext";

type ComponentsDrawerProps = {
  isOpened: boolean;
  section: string;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export const ComponentsDrawer = ({
  isOpened,
  section,
  setIsOpened,
}: ComponentsDrawerProps) => {
  const allComponents = trpc.component.getAll.useQuery();
  const { classes } = LeftNavbarStyled();
  const { setTemplateData, templateData } = useTemplateStore();

  return (
    <Drawer
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      position={"right"}
      withCloseButton={true}
      size={"50%"}
      padding={"md"}
    >
      <Title order={4} className={classes.title}>
        Link Existing Component
      </Title>
      <SimpleGrid cols={2}>
        {allComponents.data?.map((component) => {
          return (
            <ModuleTile
              onClick={async () => {
                const componentTemplateData =
                  // @ts-ignore TODO: Fix this
                  component.templateData[component.handle];

                if (templateData) {
                  setTemplateData({
                    ...templateData,
                    [section]: {
                      ...templateData[section],
                      [component.handle]: {
                        ...componentTemplateData,
                        type: "component",
                      },
                    },
                  });
                }
              }}
              key={component.handle}
              title={component.title}
              icon={<IconCode />}
            />
          );
        })}
      </SimpleGrid>
    </Drawer>
  );
};
