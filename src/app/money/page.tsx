import { GiTakeMyMoney } from "react-icons/gi"
import BackButton from "../components/backButton";

type moneyType = {
  name: string;
  price: number;
};


export default function Flex() {
  const moneyItems: moneyType[] = [
    {
      name: "30",
      price: 5.99,
    },
    {
      name: "150",
      price: 10.99,
    },
    {
      name: "300",
      price: 25.99,
    },
    {
      name: "500",
      price: 30.99,
    },
    {
        name: "15.000",
        price: 105.99,
    },
    {
        name: "30.000",
        price: 250.99,
    },
   
  ];


  function Item(item: moneyType) {
    return (
      <div className="money h-[160px] w-[175px] fill-current bg-purple-800 rounded-3xl flex flex-col itens-center">
        <button className="flex flex-col items-center justify-center gap-1">
          <span className="text-white font-bold text-lg ">
            {item.name}
          </span>
          <GiTakeMyMoney className="w-20 h-20 fill-green-500 dark:fill-white drop-shadow-xl shadow-slate-800 dark:drop-shadow-md dark:shadow-white" />
          <span className="text-white drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-md bg-green-500 dark:bg-green-400 rounded-full px-3 py-1 min-w-half">
            R$ {item.price} +
          </span>
        </button>
      </div>
    );
  }

  return (
    <><div className="flex ">
      <div className="flex-none justify-start">
        <BackButton />
      </div>
      <div className="flex-auto w-50 ">
        <h1 className="ttext-black drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-4xl  rounded-md px-3 py-2 text-center"> Comprar Moedas </h1>
      </div>
      <div className="flex-none bg-white rounded-2xl m-3 p-3 justify-center items-center">
        <h2 className="dark:text-black"> Você possui: <br/> XXX moedas  </h2>
      </div>
    </div>
    <div className="flex justify-center items-center h-[100vh] ">
      <main className="flex flex-wrap gap-12 justify-center place-self-center">
        {moneyItems.map((item) => (
          <Item key={item.name} name={item.name} price={item.price} />
        ))}
      </main>
    </div></>
  );
}