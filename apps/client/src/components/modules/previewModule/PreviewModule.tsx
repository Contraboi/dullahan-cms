import { FieldTypes } from "../../../types/FieldTypes";
import { TextModulePreview } from "./TextModulePreview";
import { TextareaModulePreview } from "./TextareaModulePreview";
import { CheckboxModulePreview } from "./CheckboxModulePreview";
import { RadioModulePreview } from "./RadioModulePreview";
import { RangeModulePreview } from "./RangeModulePreview";
import { ToggleModulePreview } from "./ToggleModulePreview";
import { NumberModulePreview } from "./NumberModulePreview";
import { RichTextModulePreview } from "./RichTextModulePreview";

type PreviewModuleProps = {
  type: string;
  moduleData: FieldTypes;
  section?: string;
};
export const PreviewModule = ({
  type,
  moduleData,
  section,
}: PreviewModuleProps) => {
  switch (type) {
    case "text":
      return <TextModulePreview section={section} moduleData={moduleData} />;
    case "textarea":
      return (
        <TextareaModulePreview moduleData={moduleData} section={section} />
      );
    case "textEditor":
      return (
        <RichTextModulePreview moduleData={moduleData} section={section} />
      );
    case "checkbox":
      return (
        <CheckboxModulePreview moduleData={moduleData} section={section} />
      );
    case "radio":
      return <RadioModulePreview moduleData={moduleData} section={section} />;
    case "range":
      return <RangeModulePreview moduleData={moduleData} section={section} />;
    case "toggle":
      return <ToggleModulePreview moduleData={moduleData} section={section} />;
    case "number":
      return <NumberModulePreview moduleData={moduleData} section={section} />;
    default:
      return null;
  }
};
