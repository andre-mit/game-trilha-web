"use client";
import { useRouter } from "next/navigation";
import { GiReturnArrow } from "react-icons/gi";

const BackButton: React.FC = () => {
  const router = useRouter();

  const backPreviewsPage = () => {
    if (window.history.state && window.history.state.idx > 0) {
        router.back();
    } else {
        router.push("/");         
    }
  };
  return (
    <button
      className="return flex-no-shrink fill-current"
      onClick={backPreviewsPage}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="ml-2 bg-white dark:bg-white rounded-md px-3 py-1 min-w flex items-center">
          <GiReturnArrow className="w-24 h-24 fill-black" />
        </span>
      </div>
    </button>
  );
};

export default BackButton;
