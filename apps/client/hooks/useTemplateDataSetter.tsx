import { useTemplateStore } from "../contexts/TemplateContext";
import { useEffect } from "react";

export const useTemplateDataSetter = (
  currentTemplate: any,
  handle: string | undefined,
) => {
  const { setTemplateData } = useTemplateStore();
  useEffect(() => {
    setTemplateData(undefined);
  }, [handle]);

  useEffect(() => {
    if (currentTemplate?.data?.templateData) {
      setTemplateData(currentTemplate.data.templateData);
    }
  }, [currentTemplate.fetchStatus]);
};
