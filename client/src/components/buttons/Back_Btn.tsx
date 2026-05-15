import Icon from "../Icon";
import chevronleft from "@/assets/icons/ChevronLeft.svg";
import "./Buttons.scss";

type Back_BtnProps = {
  onClick: () => void;
};
export default function Back_Btn({ onClick }: Back_BtnProps) {
  return (
    <button className="back_btn" onClick={onClick}>
      <Icon src={chevronleft} /> Back
    </button>
  );
}
