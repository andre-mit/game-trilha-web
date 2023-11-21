type ItemFooterProps = {
  children: React.ReactNode;
};

export default function ItemFooter({ children }: ItemFooterProps) {
  return <footer className="flex w-full mt-4">{children}</footer>;
}
