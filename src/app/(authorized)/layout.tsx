import UserWrapper from "./components/UserWrapper";
import FullScreenButton from "./components/fullScreenButton";

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserWrapper>{children}</UserWrapper>
      <FullScreenButton />
    </>
  );
}
