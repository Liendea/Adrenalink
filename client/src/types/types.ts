export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  role: string;
  profileImage: string | null;
};

export type School = {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
  createdAt: string;
  lessons: Lesson[];
  averageRating: number;
  ratingCount: number;
  lng: number;
  lat: number;
};

export type Lesson = {
  id: number;
  schoolId: number;
  lessonType: string;
  sportType: string;
  level: string;
  durationHours: number;
  price: number;
  location: string;
  equipmentIncluded: boolean;
  school: School; // Inkluderas via Prismas join
  imageUrl?: string;
  description: string;
  lng: number;
  lat: number;
  instructor?: string;
  date?: string; // ISO-sträng som representerar datumet för lektionen
  time?: string; // ISO-sträng som representerar starttiden för lektionen
};

export type LessonWithSlots = Lesson & {
  availableTimes: AvailableTimeSlot[];
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

// SEARCH BAR TYPES
export type ActiveDropdown = "location" | "calendar" | null;

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export type SelectedItem = {
  label: string;
  sub: string;
  type?: "nearby" | "destination";
};

// Favorite context types
export type FavoriteEntry = {
  id: number;
  lessonId: number | null;
  schoolId: number | null;
  lesson?: Lesson | null;
  school?: School | null;
};

// Booking
export type Booking = {
  bookingId: number;
  lessonId: number;
  slotId: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
  createdAt: string;
  lesson: Lesson;
  slot: AvailableTimeSlot;
};
