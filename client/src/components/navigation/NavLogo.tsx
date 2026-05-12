import Icon from "@/components/Icon";
import AdrenalinkLogo from "@/assets/icons/AdrenalinkLogo.svg";
import AdrenalinkLogo_Dark from "@/assets/icons/AdrenalinkLogo_dark.svg";
import AdrenalinkLogo_small from "@/assets/icons/AdrenalinkLogo_small.svg";

type NavLogoProps = {
  isInternalPage: boolean;
};

export default function NavLogo({ isInternalPage }: NavLogoProps) {
  return (
    <div className="navigation__logo">
      <a href="/">
        <div className="navigation__logo--large">
          <Icon
            src={isInternalPage ? AdrenalinkLogo_Dark : AdrenalinkLogo}
            width={200}
            height={100}
          />
        </div>
        <div className="navigation__logo--small">
          <Icon src={AdrenalinkLogo_small} width={50} height={50} />
        </div>
      </a>
    </div>
  );
}
