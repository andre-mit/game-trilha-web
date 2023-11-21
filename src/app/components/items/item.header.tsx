type ItemHeaderProps = {
  name: string;
};

export default function ItemHeader({ name }: ItemHeaderProps) {
  return (
    <header className="bg-yellow-900 flex w-full rounded-xl p-3 text-xl items-center justify-center mb-4">
        
      <span>{name}</span>
    </header>
  );
}
