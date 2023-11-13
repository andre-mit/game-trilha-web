import { GiTakeMyMoney } from "react-icons/gi";

export type MoneyType = {
  id: number;
  name: string;
  price: number;
};

export type ItemProps = MoneyType & {
  selected?: boolean;
  onSelect: (id: number) => void;
};

export default function Item({id, name, price,onSelect, selected}: ItemProps) {
  return (
    <button onClick={() => onSelect(id)} className={`flex flex-col items-center justify-center gap-1 bg-purple-800 rounded-3xl h-[160px] w-[175px] ${selected && "border-4 border-green-500"}`}>
      <span className="text-white font-bold text-lg ">{name}</span>
      <GiTakeMyMoney className="w-20 h-20 fill-green-500 dark:fill-white drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
      <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-half">
        R$ {price}
      </span>
    </button>
  );
}
