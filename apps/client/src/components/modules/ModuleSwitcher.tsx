import { TextModule } from "./textModules/TextModule";
import {
  IconAdjustmentsHorizontal,
  IconCheckbox,
  IconCircleDot,
  IconCode,
  IconForms,
  IconRepeat,
  IconSquareNumber0,
} from "@tabler/icons";
import { TextareaModule } from "./textModules/TextareaModule";
import { ToggleModule } from "./controlModules/ToggleModule";
import { RangeModule } from "./controlModules/RangeModule";
import { RadioModule } from "./controlModules/RadioModule";
import { CheckboxModule } from "./controlModules/CheckboxModule";
import { NumberModule } from "./numberModules/NumberModule";
import { RichTextModule } from "./textModules/RichTextModule";
import { FieldType } from "../../types/FieldTypes";
import { ReplicatorModule } from "./structured/ReplicatorModule";

export const moduleSwitcher = (
  type: FieldType,
  sectionName: string,
  handle?: string
) => {
  switch (type) {
    case "text":
      return {
        module: <TextModule handle={handle} sectionName={sectionName} />,
        title: "Text",
        icon: <IconForms />,
      };
    case "textarea":
      return {
        module: <TextareaModule handle={handle} sectionName={sectionName} />,
        title: "Textarea",
        icon: <IconForms />,
      };
    case "textEditor":
      return {
        module: <RichTextModule handle={handle} sectionName={sectionName} />,
        title: "Text Editor",
        icon: <IconForms />,
      };
    case "toggle":
      return {
        module: <ToggleModule handle={handle} sectionName={sectionName} />,
        title: "Toggle",
        icon: <IconForms />,
      };
    case "range":
      return {
        module: <RangeModule handle={handle} sectionName={sectionName} />,
        title: "Range",
        icon: <IconAdjustmentsHorizontal />,
      };
    case "radio":
      return {
        module: <RadioModule handle={handle} sectionName={sectionName} />,
        title: "Radio",
        icon: <IconCircleDot />,
      };
    case "checkbox":
      return {
        module: <CheckboxModule handle={handle} sectionName={sectionName} />,
        title: "Checkbox",
        icon: <IconCheckbox />,
      };
    case "number":
      return {
        module: <NumberModule handle={handle} sectionName={sectionName} />,
        title: "Number",
        icon: <IconSquareNumber0 />,
      };
    case "component":
      return {
        module: <TextModule handle={handle} sectionName={sectionName} />,
        title: "Component",
        icon: <IconCode />,
      };
    case "replicator":
      return {
        module: <ReplicatorModule handle={handle} sectionName={sectionName} />,
        title: "Replicator",
        icon: <IconRepeat />,
      };
    default:
      return {
        module: <TextModule handle={handle} sectionName={sectionName} />,
        title: "Text",
        icon: <IconForms />,
      };
  }
};
