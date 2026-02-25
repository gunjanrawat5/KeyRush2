import { redirect } from "next/navigation";
import HomeClient from "@/src/components/HomeClient";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guests can stay on homepage
  if (!user) {
    return <HomeClient />;
  }

  // Logged-in users must have username set
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  // If profile missing, or username not set -> send to /profile
  if (error || !profile?.username) {
    redirect("/profile");
  }

  return <HomeClient />;
}
