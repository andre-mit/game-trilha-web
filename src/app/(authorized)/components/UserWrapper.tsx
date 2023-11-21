import { useUser } from "@/hooks/useUser";
import UserInitializer from "@/hooks/useUser/UserInitializer";
import { getUser } from "./UserWrapper.actions";
import { UserType } from "@/@types/user";

export default async function UserWrapper({
  children,
}: {
  children: React.ReactNode;
}) {  
  const user = (await getUser()) as UserType;
  useUser.setState(user);

  return (
    <>
      <UserInitializer user={user} />
      {children}
    </>
  );
}
