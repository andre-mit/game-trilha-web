"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchWrapper } from "@/services/fetchWrapper";
import { useEffect, useState } from "react";
import Avatar, { AvatarFullConfig } from "react-nice-avatar";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";

type RankingTableProps = {
  Id: string;
  name: string;
  avatar: AvatarFullConfig;
  score: number;
  position: number;
};

export default function RankingTable() {
  const [ranking, setRanking] = useState<RankingTableProps[]>([]);
  const [myRanking, setMyRanking] = useState<RankingTableProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { id } = useUser();
  const token = Cookies.get("auth_token");

  useEffect(() => {
    async function getRanking() {
      const { data, statusCode, success } = await fetchWrapper<
        RankingTableProps[]
      >("ranking", { method: "GET" }, token, "json");

      if (success && statusCode === 200) {
        setRanking(data as RankingTableProps[]);
      } else {
        toast({ title: "Erro ao carregar ranking", variant: "error" });
      }
      setLoading(false);
    }

    if (ranking.length === 0) getRanking();
  }, [toast, token]);

  useEffect(() => {
    async function getMyRanking() {
      const { data, statusCode, success } =
        await fetchWrapper<RankingTableProps>(
          "ranking/me",
          {
            method: "GET",
            cache: "no-cache",
          },
          token,
          "json"
        );

      if (success && statusCode === 200) {
        setMyRanking(data as RankingTableProps);
      } else {
        toast({ title: "Erro ao carregar sua colocação", variant: "error" });
      }
    }

    if (!ranking.some((x) => x.Id == id)) getMyRanking();
  }, [ranking, toast, id, token]);

  const fakeRanking = Array.from({ length: 5 });
  return (
    <>
      <table className="table-auto min-w-full bg-white text-black rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-yellow-400 text-black">
            <th className="py-2 border border-black" style={{ width: "6ch" }}>
              Lugar
            </th>
            <th className="py-2 border border-black">Players</th>
            <th className="py-2 border border-black">Score</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? fakeRanking.map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton className="h-16 px-4 border border-black" />
                  </td>
                  <td>
                    <Skeleton className="h-16 px-4 border border-black" />
                  </td>
                  <td>
                    <Skeleton className="h-16 px-4 border border-black" />
                  </td>
                </tr>
              ))
            : ranking.map((item, index) => (
                <tr key={index}>
                  <td className="h-16 px-4 border border-black">
                    {item.position}
                  </td>
                  <td className="px-4 border border-black flex items-center gap-8 p-2">
                    <Avatar {...item.avatar} className="w-12 h-12" />{" "}
                    <span className="text-xl">{item.name}</span>
                  </td>
                  <td className="px-4 border border-black">{item.score}</td>
                </tr>
              ))}
          {myRanking && (
            <tr className="bg-yellow-400 text-black">
              <td className="h-16 px-4 border border-black">
                {myRanking.position}
              </td>
              <td className="px-4 border border-black flex items-center gap-8 p-2">
                <Avatar {...myRanking.avatar} className="w-12 h-12" />{" "}
                <span className="text-xl">{myRanking.name}</span>
              </td>
              <td className="px-4 border border-black">{myRanking.score}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
