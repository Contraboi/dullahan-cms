import * as React from "react";
import { SimpleGrid, Text } from "@mantine/core";
import { Tab } from "./Tab";
import { useEffect, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTemplateStore } from "../../../contexts/TemplateContext";

export const TabGrid = () => {
  const { templateData, setTemplateData } = useTemplateStore();
  const [tabs, setTabs] = useState<Array<JSX.Element>>([]);
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const allTimeTabLength = useRef(
    templateData ? Object.keys(templateData).length : 0
  );
  const removeTab = (id: number, sectionName?: string) => {
    if (sectionName) {
      const newTemplateData = { ...templateData };
      delete newTemplateData[sectionName];
      setTemplateData(newTemplateData);
    }
    setTabs((tabs) => tabs.filter((tab) => tab.props.id !== id));
  };

  useEffect(() => {
    if (templateData && tabs.length === 0) {
      const newTabs = Object.keys(templateData).map((sectionName) => {
        const tabId = allTimeTabLength.current++;
        return (
          <Tab
            key={tabId}
            id={tabId}
            tabName={sectionName}
            onRemove={() => removeTab(tabId)}
          />
        );
      });
      setTabs(newTabs);
    } else if (!templateData) setTabs([]);
  }, [templateData]);

  return (
    <SimpleGrid cols={2} ref={animationParent}>
      {tabs.map((tab) => tab)}
      <div
        onClick={() => {
          const tabId = allTimeTabLength.current++;
          setTabs([
            ...tabs,
            <Tab key={tabId} id={tabId} onRemove={() => removeTab(tabId)} />,
          ]);
        }}
        style={{
          border: "1px solid #eaeaea",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "250px",
        }}
      >
        <Text>Add Section</Text>
      </div>
    </SimpleGrid>
  );
};
