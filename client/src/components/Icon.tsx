type IconProps = {
  src: string;
  height?: number;
  width?: number;
};

export default function Icon({ src, height = 20, width = 20 }: IconProps) {
  return <img src={src} height={height} width={width} />;
}
