import Icon from "@/components/Icon";
import FavoriteIcon from "@/assets/icons/favourite_btn.svg";
import FavoriteIcon_Active from "@/assets/icons/favourite_btn_active.svg";

import "./FavoriteButton.scss";

type FavoriteButtonProps = {
  favorited: boolean;
};

export default function FavoriteButton({ favorited }: FavoriteButtonProps) {
  return (
    <div
      className={`favorite-button ${favorited ? "favorite-button--favorited" : ""}`}
    >
      <div className="favorite-button__inactive">
        <Icon src={FavoriteIcon} width={50} height={50} />
      </div>
      <div className="favorite-button__active">
        <Icon src={FavoriteIcon_Active} width={50} height={50} />
      </div>
    </div>
  );
}
