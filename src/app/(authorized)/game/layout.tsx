import { SignalRProvider } from "@/context/signalR/signalRContext";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignalRProvider connectionUrl={`${process.env.NEXT_PUBLIC_API_URL!}/game`}>
      {children}
    </SignalRProvider>
  );
}
