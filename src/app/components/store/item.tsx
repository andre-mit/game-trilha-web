import { GiTakeMyMoney } from "react-icons/gi";

export type MoneyType = {
  name: string;
  price: number;
};

export default function Item(item: MoneyType) {
  return (
    <div className="money h-[160px] w-[175px] fill-current bg-purple-800 rounded-3xl flex flex-col itens-center">
      <button className="flex flex-col items-center justify-center gap-1">
        <span className="text-white font-bold text-lg ">{item.name}</span>
        <GiTakeMyMoney className="w-20 h-20 fill-green-500 dark:fill-white drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
        <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-half">
          R$ {item.price}
        </span>
      </button>
    </div>
  );
}
