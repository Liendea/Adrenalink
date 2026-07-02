type IconProps = {
  src: string;
  height?: number;
  width?: number;
  className?: string;
};

export default function Icon({
  src,
  height = 20,
  width = 20,
  className,
}: IconProps) {
  return <img src={src} height={height} width={width} className={className} />;
}
