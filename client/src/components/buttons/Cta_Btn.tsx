import "./Buttons.scss";
import type { ReactNode } from "react";

type Cta_BtnProps = {
  onClick: () => void;
  children: ReactNode;
  disabled: boolean;
};
export default function Cta_Btn({ onClick, children, disabled }: Cta_BtnProps) {
  return (
    <button className="cta" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
