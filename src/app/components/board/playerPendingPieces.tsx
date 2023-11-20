import { ProfileType } from "@/app/(authorized)/game/play/@types/profile";
import { profile } from "console";
import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const piecesContainer = tv({
  base: "p-2 gap-3 flex flex-row lg:flex-col xl:grid xl:grid-cols-3 lg:max-w-[100px] xl:max-w-none flex-wrap justify-center items-center rounded-md",
  variants: {
    containerType: {
      my: "bg-blue-700",
      opponent: "bg-red-700",
    },
  },
  defaultVariants: {
    containerType: "my",
  },
});

const piece = tv({
  base: "rounded-full w-6 h-6 sm:w-12 sm:h-12",
  variants: {
    pieceColor: {
      white: "bg-white",
      black: "bg-black",
    },
  },
});

export type PlayerPendingPiecesProps = ComponentProps<"div"> &
  VariantProps<typeof piecesContainer> &
  VariantProps<typeof piece> & {
    count: number;
    text: string;
    profile: ProfileType;
  };

const PlayerPendingPieces = ({
  count,
  className,
  containerType,
  pieceColor,
  text,
  profile,
  ...rest
}: PlayerPendingPiecesProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <span className="font-bold">{text}</span>
      <div className={piecesContainer({ containerType, className })} {...rest}>
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={piece({ pieceColor })}
            style={{
              backgroundImage: profile.pieces
                ? `url('${profile.pieces}')`
                : undefined,
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPendingPieces;
