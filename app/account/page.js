import getUser from "@/services/get-user";
import { redirect } from "next/navigation";
import AccountForm from "@/components/account/account-form";
import Container from "@/components/ui/container";
import Logout from "@/components/account/logout";

export default async function Account() {
  // Fetch the currently authenticated user from the server
  const user = await getUser();

  // If the user is not authenticated or fetching user data failed, redirect to the homepage
  if (!user.success) {
    redirect("/");
  }

  return (
    <Container>
      <div className="mx-5 my-16 flex flex-col items-center justify-center md:mx-0 md:my-20">
        <div className="w-full max-w-[450px]">
          <div className="flex items-center justify-between">
            <h1 className="font-youngSerif text-2xl leading-10 text-primary md:text-3xl">
              Welcome <span>{user.data.username}</span>
            </h1>

            {/* Logout component handles token removal and redirection */}
            <Logout />
          </div>
        </div>

        {/* Render the account form, passing in user data and ID */}
        <AccountForm user={user.data} id={user.id} />
      </div>
    </Container>
  );
}
