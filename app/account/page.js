import getUser from "@/services/get-user";
import { redirect } from "next/navigation";

export default async function Account() {
  const user = await getUser();

  if (!user.success) {
    redirect("/?mode=login");
  }

  console.log(user);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome,{user.data.username}</h1>
      <p>{user.data.email}</p>
    </div>
  );
}
