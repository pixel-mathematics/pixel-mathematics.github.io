"use client";

import { useState } from "react";
import { changePasswordAction } from "@/data/account/actions";
import { changePasswordFormInputSchema } from "@/data/account/schemas";
import { useForm } from "@tanstack/react-form";
import { KeyRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onSubmit: changePasswordFormInputSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await changePasswordAction(value);

      if (!result.success) {
        toast.add({ type: "error", description: result.message });
        return;
      }

      toast.add({ type: "success", description: result.message });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="border-border flex items-center gap-4 rounded-md border p-4 text-left">
          <KeyRoundIcon className="text-primary size-8" />
          <div>
            <p className="text-lg font-medium">Đổi mật khẩu tài khoản</p>
            <p className="text-muted-foreground">Mật khẩu ít nhất 8 kí tự</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu tài khoản</DialogTitle>
          <DialogDescription>Nhập mật khẩu mới</DialogDescription>
        </DialogHeader>
        <form
          id="change-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="newPassword">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Mật khẩu mới</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="******"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="confirmNewPassword">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Xác nhận mật khẩu</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="******"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
        <DialogFooter className="flex-row justify-end">
          <DialogClose render={<Button variant="outline">Hủy</Button>} />
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="change-password-form"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Đang gửi..." : "Đổi mật khẩu"}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
