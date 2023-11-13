import UserWrapper from "./components/UserWrapper";

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserWrapper>{children}</UserWrapper>
    </>
  );
}
