import "./Buttons.scss";
import type { ReactNode } from "react";

type Cta_BtnProps = {
  onClick: () => void;
  children: ReactNode;
};
export default function Cta_Btn({ onClick, children }: Cta_BtnProps) {
  return (
    <button className="cta" onClick={onClick}>
      {children}
    </button>
  );
}
