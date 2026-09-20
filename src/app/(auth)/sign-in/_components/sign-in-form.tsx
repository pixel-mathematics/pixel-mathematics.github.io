"use client";

import { useActionState } from "react";
import { signInAction } from "@/data/auth/actions";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { Container } from "@/components/shared/container";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, {});

  return (
    <Container className="min-w-full md:min-w-[480px]">
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Nhập ID và mật khẩu để tiếp tục</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="sign-in-form" action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="id">Mã học viên</FieldLabel>
                <Input id="id" name="id" placeholder="27T09ABC01" />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <PasswordInput id="password" name="password" placeholder="********" />
              </Field>
            </FieldGroup>
            {/* Thêm nút submit ẩn này để bắt sự kiện nhấn Enter từ bàn phím */}
            <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1}>
              Submit ẩn
            </button>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              size="lg"
              type="submit"
              form="sign-in-form"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Tiếp tục"}
            </Button>
          </Field>
          {/* Thông báo lỗi chung từ Supabase (nếu sai mật khẩu) */}
          {state?.message && !state?.errors && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </Container>
  );
}
