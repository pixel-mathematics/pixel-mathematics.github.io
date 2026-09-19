"use client";

import { resetUserPasswordAction } from "@/data/users/admin-actions";
import { UserProfile } from "@/data/users/admin-queries";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

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
import { toast } from "@/components/ui/toast";

import { type DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, UserProfile>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
    cell: (cell) => {
      const rawId = cell.getValue();
      return `${rawId.slice(0, 8)}...`;
    },
  }),
  columnHelper.accessor("full_name", {
    header: "Họ tên",
  }),
  columnHelper.accessor("user_id", {
    header: "Mã học viên",
  }),
  columnHelper.display({
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => {
      const profile = row.original;

      async function handleResetUserPassword() {
        const result = await resetUserPasswordAction({
          userId: profile.id,
          password: profile.user_id!,
        });

        if (!result.success) {
          toast.add({ type: "error", description: result.message });
          return;
        }

        toast.add({ type: "success", description: "Đặt lại mật khẩu thành công" });
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(profile.id)}>
                Sao chép ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleResetUserPassword}>
                Đặt lại mật khẩu
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
