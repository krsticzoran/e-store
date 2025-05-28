import getUser from "@/services/get-user";
import { redirect } from "next/navigation";
import AccountForm from "@/components/account/account-form";

export default async function Account() {
  const user = await getUser();

  // If the user is not authenticated or fetching user data failed, redirect to the homepage
  if (!user.success) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome,{user.data.username}</h1>
      <AccountForm user={user.data} id={user.id} />
    </div>
  );
}
