type ItemProps = {
  children: React.ReactNode;
};

export default function Item({ children }: ItemProps) {
  return (
    <div className="flex flex-col items-center rounded-xl w-64 bg-green-300 shadow-md">
      {children}
    </div>
  );
}
