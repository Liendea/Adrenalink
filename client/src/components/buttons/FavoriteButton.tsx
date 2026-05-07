import Icon from "@/components/Icon";
import FavoriteIcon from "@/assets/icons/favourite_btn.svg";
import FavoriteIcon_Active from "@/assets/icons/favourite_btn_active.svg";

type FavoriteButtonProps = {
  favorited: boolean;
};

export default function FavoriteButton({ favorited }: FavoriteButtonProps) {
  return (
    <>
      {favorited ? (
        <Icon src={FavoriteIcon_Active} width={50} height={50} />
      ) : (
        <Icon src={FavoriteIcon} width={50} height={50} />
      )}
    </>
  );
}
