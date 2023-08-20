import * as React from "react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Input, Modal, Select } from "@mantine/core";
import { removeLastChar } from "../../utils/removeLastChar";
import { CustomButton } from "./CustomButton";
import convertStringToCamelCase from "../../utils/convertStringToCamelCase";

type CreateContentTypeProps = {
  title: string;
  selectData?: Array<{ title: string; handle: string }>;
  contentTypeTitle: string;
  setContentTypeTitle: Dispatch<SetStateAction<string>>;
  onButtonClick?: () => void;
};

export const CreateContentType = ({
  title,
  onButtonClick,
  selectData,
  contentTypeTitle,
  setContentTypeTitle,
}: CreateContentTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const singularContentTypeTitle = removeLastChar(title);

  useEffect(() => {
    if (selectData) {
      setIsButtonDisabled(
        typeof selectedItem === "undefined" || contentTypeTitle.length <= 0
      );
    } else {
      setIsButtonDisabled(contentTypeTitle.length <= 0);
    }
  }, [contentTypeTitle, selectedItem]);

  return (
    <>
      <CustomButton actionOnClick={() => setIsModalOpen(true)}>
        <> Create {singularContentTypeTitle}</>
      </CustomButton>
      <>
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Create ${singularContentTypeTitle}`}
          size={"lg"}
        >
          <Input.Wrapper
            id="title"
            withAsterisk
            required
            label="Title"
            description='We recommend a plural noun, like "Articles" or "Products".'
            error=""
            style={{ marginBottom: "1rem" }}
          >
            <Input
              id="title"
              placeholder="Articles"
              value={contentTypeTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setContentTypeTitle(e.target.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="handle"
            required
            withAsterisk
            label="Handle"
            description="Used to reference this collection in tge API & on the frontend."
            error=""
            style={{ marginBottom: "1rem" }}
          >
            <Input
              id="handle"
              placeholder="articles"
              readOnly
              value={convertStringToCamelCase(contentTypeTitle)}
            />
          </Input.Wrapper>
          {selectData && (
            <Input.Wrapper
              id="selectCollection"
              required
              withAsterisk
              label="Select collection"
              description=""
              error=""
            >
              <Select
                id={"selectCollection"}
                required
                placeholder="Pick one"
                onSelect={(e: ChangeEvent<HTMLInputElement>) =>
                  setSelectedItem(e.target.value)
                }
                data={selectData.map((item) => ({
                  label: item.title,
                  value: item.handle,
                }))}
              />
            </Input.Wrapper>
          )}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CustomButton
              actionOnClick={() => {
                onButtonClick && onButtonClick();
                setIsModalOpen(false);
              }}
              disabled={isButtonDisabled}
            >
              <>Create {singularContentTypeTitle}</>
            </CustomButton>
          </div>
        </Modal>
      </>
    </>
  );
};
