import { ActionIcon, Card, Group, Menu, Text, Input } from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTemplateStore } from "../../../contexts/TemplateContext";
import convertStringToCamelCase from "../../../utils/convertStringToCamelCase";

type TabHeaderProps = {
  sectionName: string;
  onRemove: (id: number) => void;
  id: number;
  setSectionName: Dispatch<SetStateAction<string>>;
};

export const TabHeader = ({
  id,
  sectionName,
  setSectionName,
  onRemove,
}: TabHeaderProps) => {
  const [toggle, setToggle] = useState(true);
  const [tempSectionName, setTempSectionName] = useState(
    convertStringToCamelCase(sectionName)
  );
  const headerButton = useRef(null);
  const { templateData, setTemplateData, selectedModuleData } =
    useTemplateStore();

  // This useEffect is to update the section name in the templateData
  useEffect(() => {
    const handle = selectedModuleData?.handle;
    // if handle then set templateData
    if (handle) {
      setTemplateData({
        ...templateData,
        [sectionName]: {
          [handle]: { ...selectedModuleData },
        },
      });
      // if no section with the name then create a new section
    } else if (!templateData?.[sectionName]) {
      setTemplateData({
        ...templateData,
        [sectionName]: {},
      });
    }
  }, [sectionName]);

  // TODO Refactor
  return (
    <Card.Section inheritPadding py="xs" withBorder mb={"xs"}>
      <Group position="apart">
        {toggle ? (
          <Text onDoubleClick={() => setToggle(false)}>{sectionName}</Text>
        ) : (
          <Input
            value={tempSectionName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTempSectionName(convertStringToCamelCase(e.target.value))
            }
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                setToggle(true);
                if (templateData) {
                  Object.keys(templateData).forEach((sectionKey) => {
                    if (sectionKey === sectionName) {
                      const renamedTemplateData = renameObjectKey(
                        templateData,
                        convertStringToCamelCase(sectionName),
                        convertStringToCamelCase(tempSectionName)
                      );
                      setTemplateData(renamedTemplateData);
                      setSectionName(convertStringToCamelCase(tempSectionName));
                    }
                  });
                }
              }
            }}
            onBlur={() => setToggle(true)}
          />
        )}
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
            <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
            <Menu.Item
              ref={headerButton}
              id={id.toString()}
              icon={<IconTrash size={14} />}
              color="red"
              // TODO remove any and find type
              onClick={() => {
                if (templateData) {
                  onRemove(id);
                  const newTemplateData = { ...templateData };
                  delete newTemplateData[sectionName];
                  setTemplateData(newTemplateData);
                }
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card.Section>
  );
};

function renameObjectKey<T>(obj: T, oldKey: keyof T, newKey: keyof T) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
}
