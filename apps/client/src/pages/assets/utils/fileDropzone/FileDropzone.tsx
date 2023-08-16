import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { Group, useMantineTheme, Text } from "@mantine/core";
import { IconFile, IconUpload, IconX } from "@tabler/icons";
import { Dispatch, RefObject, SetStateAction } from "react";

type FileDropzoneProps = {
  dropzoneOpenRef: RefObject<() => void>;
  showDropzone: boolean;
  setFiles: Dispatch<SetStateAction<FileWithPath[]>>;
};

export const FileDropzone = ({
  dropzoneOpenRef,
  showDropzone,
  setFiles,
}: FileDropzoneProps) => {
  const theme = useMantineTheme();
  return (
    <Dropzone
      openRef={dropzoneOpenRef}
      display={showDropzone ? "block" : "none"}
      onDrop={setFiles}
      onReject={(files) => console.log("rejected files", files)}
      accept={[
        MIME_TYPES.csv,
        MIME_TYPES.pdf,
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.webp,
        MIME_TYPES.svg,
      ]}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text>Drag files here or click to select files</Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
