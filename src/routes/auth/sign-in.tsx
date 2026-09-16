import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import * as z from "zod";
import { Container } from "@/components/shared/container";
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
import { toast } from "@/components/ui/toast";
import { supabase } from "@/lib/supabase";
import { signInWithPassword } from "@/queries/auth";

const signInFormSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const Route = createFileRoute("/auth/sign-in")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      throw redirect({
        to: "/dashboard",
        replace: true,
      });
    }
  },
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signInWithPasswordMutation = useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      form.reset();
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        description: error?.message,
      });
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
    <Container className="min-w-full sm:min-w-[480px]">
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
                        placeholder="Ví dụ: 27T09ABC01"
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
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="********"
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
              size="lg"
              type="submit"
              form="sign-in-form"
              className="w-full"
              disabled={signInWithPasswordMutation.isPending}
            >
              {signInWithPasswordMutation.isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Tiếp tục"
              )}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </Container>
  );
}
