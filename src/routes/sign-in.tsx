import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { Container } from "@/components/container";
import { LogoIcon } from "@/components/custom-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInWithPassword } from "@/queries/auth";

const signInFormSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signInWithPasswordMutation = useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      navigate({ to: "/dashboard" });
    },
  });

  const form = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
    validators: {
      onSubmit: signInFormSchema,
    },
    onSubmit: async ({ value }) => {
      signInWithPasswordMutation.mutateAsync(value);
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });

  return (
    <div className="mt-32 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <LogoIcon size={32} />
        <div className="text-2xl font-semibold">
          <span className="text-primary">Pixel</span> Mathematics
        </div>
      </div>
      <Container className="max-w-[480px]">
        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Nhập ID và mật khẩu để tiếp tục</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="sign-in-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="id"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Mã học viên/phụ huynh
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="HV1234"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
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
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="submit"
                form="sign-in-form"
                className="w-full"
                disabled={signInWithPasswordMutation.isPending}
              >
                Tiếp tục
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
}
