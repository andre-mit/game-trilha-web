const Piece = ({ backgroundImage }: { backgroundImage?: string }) => {
  return (
    <div
      className="w-[300px] h-[300px] rounded-full"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default Piece;
