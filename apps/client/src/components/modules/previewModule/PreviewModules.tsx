import { FieldTypes } from "../../../types/FieldTypes";
import { Paper } from "@mantine/core";
import { PreviewModule } from "./PreviewModule";

export const PreviewModules = ({
  templateData,
  sectionKey,
}: {
  templateData: { [key: string]: FieldTypes };
  sectionKey: string;
}) => {
  return (
    <>
      <Paper p={"md"} display={"grid"} style={{ gap: "1rem" }}>
        {Object.keys(templateData).map((moduleKey) => {
          const module = templateData[moduleKey];
          if (module.type === "component") {
            return Object.keys(module).map((componentKey) => {
              // @ts-ignore TODO: fix this
              const component = module[componentKey];
              return (
                <>
                  <PreviewModule
                    section={sectionKey}
                    key={componentKey}
                    type={component.type}
                    moduleData={component}
                  />
                </>
              );
            });
          } else {
            return (
              <PreviewModule
                section={sectionKey}
                key={moduleKey}
                type={module.type}
                moduleData={module}
              />
            );
          }
        })}
      </Paper>
    </>
  );
};
