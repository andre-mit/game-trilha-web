"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { GiTakeMyMoney } from "react-icons/gi";

const BalanceLink = () => {
  const {balance} = useUser();
  return (
    <div className="money flex-no-shrink fill-current">
      <Link href="money" className="flex flex-col items-center justify-center gap-1">
        <GiTakeMyMoney className="w-24 h-24 fill-green-500 dark:fill-green-400 drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
        <span className="text-white drop-shadow-xl text-center shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-full">
          {balance} +
        </span>
      </Link>
    </div>
  );
};

export default BalanceLink;
