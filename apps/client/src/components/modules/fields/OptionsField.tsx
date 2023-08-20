import { ChangeEvent, useEffect, useState } from "react";
import { Input, Button, Table, CloseButton } from "@mantine/core";
import { FieldTypes, OptionsFieldType } from "../../../types/FieldTypes";

type OptionsFieldProps = {
  moduleData: FieldTypes;
  setModuleData: (data: FieldTypes) => void;
};

const optionsFieldData = {
  title: "Options",
  description: "Set the array keys and their optional labels.",
};

export const OptionsField = ({
  setModuleData,
  moduleData,
}: OptionsFieldProps) => {
  const [optionsState, setOptionsState] = useState<Array<OptionsFieldType>>(
    moduleData.options ? moduleData.options : []
  );

  useEffect(() => {
    setModuleData({ ...moduleData, options: optionsState });
  }, [optionsState, ...optionsState]);

  const rows = optionsState?.map((option, index) => (
    <tr key={index} onClick={(e) => console.log(e.target)}>
      <td style={{ width: "30%" }}>
        <Input
          value={option.key}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOptionsState((prev) => {
              const newState = [...prev];
              newState[index].key = e.target.value;
              return newState;
            })
          }
        />
      </td>
      <td>
        <Input
          value={option.label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setOptionsState((prev) => {
              const newState = [...prev];
              newState[index].label = e.target.value;
              return newState;
            });
          }}
        />
      </td>
      <td width={"1%"}>
        <CloseButton
          title="Remove row"
          iconSize={15}
          onClick={() => {
            setOptionsState(
              optionsState.filter(
                (optionToBeRemoved) => option.key !== optionToBeRemoved.key
              )
            );
          }}
        />
      </td>
    </tr>
  ));

  return (
    <Input.Wrapper
      label={optionsFieldData.title}
      description={optionsFieldData.description}
    >
      {optionsState.length > 0 && (
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Key</th>
              <th>Label</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
      <Button
        variant={"outline"}
        mt={"xs"}
        onClick={() =>
          setOptionsState([
            ...optionsState,
            {
              id: optionsState.length + 1,
              key: "",
              label: "",
              value: "",
              required: true,
            },
          ])
        }
      >
        Add row
      </Button>
    </Input.Wrapper>
  );
};
