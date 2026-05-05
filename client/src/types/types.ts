export type School = {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
};

export type Lesson = {
  id: number;
  schoolId: number;
  lessonType: string;
  sportType: string;
  level: string;
  durationHours: number;
  priceEuro: number;
  location: string;
  equipmentIncluded: boolean;
  school: School; // Inkluderas via Prismas join
  imageUrl?: string;
  description: string;
};

export type AvailableTimeSlot = {
  id: number;
  lessonId: number;
  startTime: string; // Kommer som ISO-sträng från API:et
  isBooked: boolean;
  lesson?: Lesson; // Inkluderas via Prismas join
};

export type SearchParams = {
  activeItem?: { label: string } | null;
  selectedDates?: { startDate: string | null; endDate: string | null } | null;
};
