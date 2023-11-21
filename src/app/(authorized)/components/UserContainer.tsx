"use client";
import Avatar from "react-nice-avatar";
import { useUser } from "@/hooks/useUser";
import truncateText from "@/helpers/truncateText";
import Link from "next/link";

const UserContainer = ({
  suppressHydrationWarning = false,
}: {
  suppressHydrationWarning?: boolean;
}) => {
  const { name, avatar } = useUser();

  return (
    <div suppressHydrationWarning={suppressHydrationWarning} className="flex flex-col items-center gap-2">
      <Avatar className="w-32 h-32" {...avatar} />
      <span>{truncateText(name, 20)}</span>
    </div>
  );
};

export default UserContainer;
