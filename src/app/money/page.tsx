import BackButton from "../components/backButton";
import Item, { MoneyType } from "../components/store/item";

export default function Money() {
  const moneyItems: MoneyType[] = [
    {
      name: "30 Moedas",
      coinAmmount: "30",
      price: 5.99,
    },
    {
      name: "150 Moedas",
      coinAmmount: "150",
      price: 10.99,
    },
    {
      name: "300 Moedas",
      coinAmmount: "300",
      price: 25.99,
    },
    {
      name: "500 Moedas",
      coinAmmount: "500",
      price: 30.99,
    },
    {
      name: "15.000 Moedas",
      coinAmmount: "15.000",
      price: 105.99,
    },
    {
      name: "30.000 Moedas",
      coinAmmount: "30.000",
      price: 250.99,
    },
  ];

  return (
    <>
      <div className="flex ">
        <div className="flex-none justify-start">
          <BackButton />
        </div>
        <div className="flex-auto w-50 ">
          <h1 className="ttext-black drop-shadow-xl shadow-white dark:drop-shadow-md dark:shadow-white font-semibold text-4xl  rounded-md px-3 py-2 text-center">
            {" "}
            Comprar Moedas{" "}
          </h1>
        </div>
        <div className="flex-none bg-white rounded-2xl m-3 p-3 justify-center items-center">
          <h2 className="dark:text-black">
            {" "}
            Você possui: <br /> XXX moedas{" "}
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center h-[100vh] ">
        <main className="flex flex-wrap gap-12 justify-center place-self-center">
          {moneyItems.map((item) => (
            <Item key={item.name} name={item.name} coinAmmount={item.coinAmmount}  price={item.price} />
          ))}
        </main>
      </div>
    </>
  );
}
