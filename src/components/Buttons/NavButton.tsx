import {
  RxCaretLeft,
  RxCaretRight,
  RxCaretUp,
  RxCaretDown,
  RxQuestionMark as DefaultIcon
} from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { cn } from "@/lib/utils";

interface ButtonProps {
  variant: "left" | "right" | "up" | "down" | "search" | "home";
  onClick: () => void;
}

const variantIconMap = {
  home: <HiHome className="text-black" size={20} />,
  search: <BiSearch className="text-black" size={20} />,
  up: <RxCaretUp size={35} />,
  down: <RxCaretDown size={35} />,
  left: <RxCaretLeft size={35} />,
  right: <RxCaretRight size={35} />,
};

const defaultIcon = <DefaultIcon className="p-1 bg-red-800" size={35} />;

export const NavButton = ({ onClick, variant }: ButtonProps) => {

  const icon = variantIconMap[variant] || defaultIcon;

  const add = ["home", "search"].includes(variant) && "bg-white p-2";
  return (
    <button
      onClick={onClick}
      className={cn("flex cursor-pointer items-center justify-center rounded-full bg-black transition hover:opacity-75", add)}
    >
      {icon}
    </button>
  );
};
