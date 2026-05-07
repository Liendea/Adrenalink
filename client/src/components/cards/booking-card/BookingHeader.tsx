type BookingHeaderProps = {
  image: string;
  alt?: string;
  onClose?: () => void;
};

export default function BookingHeader({ image, alt }: BookingHeaderProps) {
  return (
    <div className="booking-card__image-wrap">
      <img
        src={image}
        alt={alt}
        className="booking-card__image"
        loading="lazy"
      />
    </div>
  );
}
