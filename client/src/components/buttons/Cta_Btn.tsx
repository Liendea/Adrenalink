import "./Buttons.scss";
import type { ReactNode } from "react";

type Cta_BtnProps = {
  onClick: () => void;
  children: ReactNode;
  disabled: boolean;
  className?: string;
};
export default function Cta_Btn({
  onClick,
  children,
  disabled,
  className = "cta",
}: Cta_BtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={"cta " + className}
    >
      {children}
    </button>
  );
}
