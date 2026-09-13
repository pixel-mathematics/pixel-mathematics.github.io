import type { QueryData } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/* Sign in mutation */
const DOMAIN = "@pixelmathematics.edu";

export interface SignInWithPasswordCredentials {
  id: string;
  password: string;
}

const signInWithPasswordMutation = ({
  id,
  password,
}: SignInWithPasswordCredentials) =>
  supabase.auth.signInWithPassword({ email: id + DOMAIN, password });

export async function signInWithPassword(
  credentials: SignInWithPasswordCredentials
) {
  const { data, error } = await signInWithPasswordMutation(credentials);

  if (!data || error) {
    throw new Error(`Lỗi đăng nhập #${credentials.id}`);
  }

  return data;
}

/* Fetch current user profile */
const fetchCurrentUserProfileQuery = (id: string) =>
  supabase.from("profiles").select().eq("id", id).single();

export type UserProfile = QueryData<
  ReturnType<typeof fetchCurrentUserProfileQuery>
>;

export async function fetchCurrentUserProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return null;
  }

  const { data, error } = await fetchCurrentUserProfileQuery(user.id);
  console.log(user.id, data);

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu thông tin tài khoản");
  }

  return data;
}

export const fetchCurrentUserProfileQueryOptions = queryOptions({
  queryKey: ["user_profile"],
  queryFn: fetchCurrentUserProfile,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
});
