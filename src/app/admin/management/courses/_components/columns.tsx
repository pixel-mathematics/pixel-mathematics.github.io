"use client";

import Link from "next/link";
import { Course } from "@/data/courses/admin-queries";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Course>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: (cell) => {
      const rawId = cell.getValue();
      return <span className="text-muted-foreground">{rawId}</span>;
    },
  }),
  columnHelper.accessor("title", {
    header: "Khóa học",
    cell: (cell) => {
      const rawTitle = cell.getValue();
      const course = cell.row.original;
      return (
        <Link href={`/admin/management/courses/${course.id}`}>
          <Button variant="link" className="px-0">
            {rawTitle}
          </Button>
        </Link>
      );
    },
  }),
  columnHelper.accessor("subject.title", {
    header: "Phân môn",
  }),
  columnHelper.display({
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(course.id)}>
                Sao chép ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/admin/management/courses/${course.id}/edit`}>Chỉnh sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
