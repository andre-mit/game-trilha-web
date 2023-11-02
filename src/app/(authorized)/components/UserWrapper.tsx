import { UserType, useUser } from "@/hooks/useUser";
import { fetchWrapper } from "@/services/fetchWrapper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import UserInitializer from "@/hooks/useUser/UserInitializer";

export default async function UserWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("auth_token")?.value;
  const getUser = async () => {
    try {
      const response = await fetchWrapper<UserType>(
        "Users",
        {},
        token,
        "json"
      );
      if (response.success) {
        return response.data;
      } else {
        cookies().delete("auth_token");
        redirect("/login");
      }
    } catch (error) {}
  };

  const user = (await getUser()) as UserType;
  useUser.setState(user);

  return (
    <>
      <UserInitializer user={user} />
      {children}
    </>
  );
}
