import { FileWithPath } from "@mantine/dropzone";
import { Button, Flex, Input, Loader } from "@mantine/core";
import { TableTemplate } from "../../components/dashboard/TableTemplate";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { View } from "../../components/View";
import { mainLinksData } from "../../../App";
import { Layout } from "../../components/Layout";
import { FileDropzone } from "./utils/fileDropzone/FileDropzone";
import { convertFileToBase64 } from "../../../utils/convertFileToBase64";
import { trpc } from "../../../utils/trpc";
import { AssetType } from "../../../../server/src/interfaces/CMS";

const tableHeads = [
  {
    title: "Image",
    width: "10%",
  },
  {
    title: "Title",
    width: "10%",
  },
  {
    title: "Alt Text",
    width: "40%",
  },
  {
    title: "Type",
    width: "15%",
  },
  {
    title: "Size",
    width: "15%",
  },
  {
    title: "Date",
    width: "20%",
  },
];

export const Assets = () => {
  const dropzoneOpenRef = useRef<() => void>(null);
  const [showDropzone, setShowDropzone] = useState(false);
  const allAssets = trpc.assets.getAll.useQuery();
  const updateAsset = trpc.assets.update.useMutation();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const defferedSearchQuery = useDeferredValue(searchQuery);
  const [altText, setAltText] = useState("");
  const uploadFile = trpc.assets.upload.useMutation({
    onSuccess: async (data) => {
      alert(data.message);
      await allAssets.refetch();
    },
  });

  useEffect(() => {
    (async () => {
      const assetsToUpload = await Promise.all(
        files.map(async (file) => {
          const base64 = await convertFileToBase64(file);
          return {
            file,
            base64,
          };
        })
      );
      await Promise.all(
        assetsToUpload.map(async (asset) => {
          const fileToUpload: AssetType = {
            file: {
              name: asset.file.name,
              size: asset.file.size,
              type: asset.file.type,
              lastModifiedDate: new Date().toDateString(),
              lastModified: asset.file.lastModified,
              alt: "",
            },
            base64: asset.base64,
          };
          if (asset) {
            await uploadFile.mutateAsync({
              file: fileToUpload,
            });
          }
        })
      );
    })();
  }, [files]);

  return (
    <Layout title={"Assets"}>
      <View title={mainLinksData.assets.label}>
        <Flex justify={"space-between"} gap={20} mb={"lg"}>
          <Input
            placeholder="Search"
            sx={() => ({ width: "100%" })}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Flex justify={"space-between"} gap={10}>
            <Button
              variant={"filled"}
              onClick={() =>
                dropzoneOpenRef.current && dropzoneOpenRef.current()
              }
            >
              Upload
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setShowDropzone((prevState) => !prevState)}
            >
              Dropzone
            </Button>
          </Flex>
        </Flex>
        <FileDropzone
          dropzoneOpenRef={dropzoneOpenRef}
          showDropzone={showDropzone}
          setFiles={setFiles}
        />
        <TableTemplate tableHeads={tableHeads}>
          <tbody>
            {allAssets.isLoading && <Loader />}
            {allAssets.data
              ?.filter((assets) => {
                if (defferedSearchQuery === "") {
                  return true;
                }
                return assets.file.name
                  .toLowerCase()
                  .includes(defferedSearchQuery.toLowerCase());
              })
              .map((file) => (
                <tr key={file.file.name}>
                  <td>
                    <img
                      alt={file.file.alt}
                      src={file.base64}
                      width={"50px"}
                      height={"50px"}
                    />
                  </td>
                  <td>{file.file.name}</td>
                  <td>
                    <Input
                      placeholder="Alt text"
                      sx={() => ({ width: "90%" })}
                      onChange={(e) => {
                        setAltText(e.currentTarget.value);
                      }}
                      defaultValue={file.file.alt}
                      onBlur={async () => {
                        await updateAsset.mutateAsync({
                          assetName: file.file.name,
                          asset: {
                            base64: file.base64,
                            file: {
                              ...file.file,
                              alt: altText,
                              lastModifiedDate: new Date().toDateString(),
                            },
                          },
                        });
                        await allAssets.refetch();
                      }}
                    />
                  </td>
                  <td>{file.file.type}</td>
                  <td>{sizeToUnit(file.file.size)}</td>
                  <td>{file.file.lastModifiedDate}</td>
                </tr>
              ))}
          </tbody>
        </TableTemplate>
      </View>
    </Layout>
  );
};

const sizeToUnit = (size: number) => {
  if (size > 1000000) {
    return sizeInMB(size);
  } else if (size > 1000) {
    return sizeInKB(size);
  } else {
    return sizeInBytes(size);
  }
};
const sizeInMB = (size: number) => {
  return (size / 1000000).toFixed(1) + "MB";
};

const sizeInKB = (size: number) => {
  return (size / 1000).toFixed(1) + "KB";
};

const sizeInBytes = (size: number) => {
  return size.toFixed(1) + "B";
};
