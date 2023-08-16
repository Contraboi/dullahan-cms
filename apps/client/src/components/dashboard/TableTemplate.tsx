import { Table } from "@mantine/core";
import { ReactNode } from "react";

interface UsersTableProps {
  tableHeads: Array<{
    title: string;
    width?: string;
  }>;
  children: ReactNode;
}

export function TableTemplate({ children, tableHeads }: UsersTableProps) {
  return (
    <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
      <thead>
        <tr>
          {tableHeads.map((head, index) => (
            <th style={{ width: head.width ?? "" }} key={index}>
              {head.title}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </Table>
  );
}
