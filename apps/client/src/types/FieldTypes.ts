export type FieldType =
  | "text"
  | "textarea"
  | "textEditor"
  | "toggle"
  | "range"
  | "radio"
  | "checkbox"
  | "number"
  | "component"
  | "replicator";

export type FieldTypes = {
  type: FieldType;
  section: string;
  display: string;
  handle: string;
  required?: boolean;
  instructions?: string;
  richText?: string;
  inputType?: string;
  prepend?: string;
  append?: string;
  placeholder?: string;
  defaultValue?: string;
  characterLimit?: number;
  options?: Array<OptionsFieldType>;
  min?: number;
  max?: number;
  step?: number;
  boolean?: boolean;
};

export interface DefaultFieldTypes
  extends Pick<
    FieldTypes,
    "display" | "handle" | "instructions" | "type" | "required" | "section"
  > {}

export type OptionsFieldType = {
  id: number;
  key: string;
  label: string;
  value: string;
  required: boolean;
};
