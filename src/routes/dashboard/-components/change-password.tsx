import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { KeyRoundIcon } from "lucide-react";
import * as z from "zod";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { changePassword } from "@/queries/account";

const changePasswordFormSchema = z
  .object({
    password: z.string().min(6, { message: "Mật khẩu mới ít nhất 6 kí tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận lại mật khẩu mới" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu mới xác nhận không khớp",
    path: ["confirmPassword"],
  });

export function ChangePassword() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: changePasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await changePasswordMutation.mutateAsync(value);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      form.reset();
      setOpen(false);
      toast.add({
        type: "success",
        description: "Đổi mật khẩu thành công",
      });
    },
    onError: (error) => {
      setOpen(false);
      toast.add({
        type: "error",
        description: error?.message,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="border-border flex items-center gap-4 rounded-md border p-4 text-left">
          <KeyRoundIcon className="text-primary size-8" />
          <div>
            <p className="text-lg font-medium">Đổi mật khẩu tài khoản</p>
            <p className="text-muted-foreground">Mật khẩu ít nhất 6 kí tự</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu tài khoản</DialogTitle>
          <DialogDescription>
            Nhập mật khẩu mới có ít nhất 6 kí tự
          </DialogDescription>
        </DialogHeader>
        <form
          id="change-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Xác nhận mật khẩu
                    </FieldLabel>
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter className="justify-end">
          <DialogClose render={<Button variant="outline">Hủy</Button>} />
          <Button
            type="submit"
            form="change-password-form"
            disabled={changePasswordMutation.isPending}
          >
            Đổi mật khẩu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
