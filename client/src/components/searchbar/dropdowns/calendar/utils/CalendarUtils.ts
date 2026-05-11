export const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Cell = { day: number; active: boolean };

/**
 * Bygger upp en array med exakt 42 celler (6 veckor) för kalenderns rutnät.
 */
export function getCalendarCells(year: number, month: number): Cell[] {
  const firstDay = new Date(year, month, 1).getDay();
  // Konvertera Sunday=0 till Monday=0 offset
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: Cell[] = [];

  // 1. Lägg till dagar från föregående månad (inaktiva)
  for (let i = 0; i < offset; i++) {
    cells.push({ day: daysInPrev - offset + 1 + i, active: false });
  }

  // 2. Lägg till dagar för den aktuella månaden (aktiva)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, active: true });
  }

  // 3. Fyll ut resten med dagar från nästa månad (inaktiva) tills vi har 42 celler
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, active: false });
  }

  return cells;
}

/**
 * Returnerar rätt CSS-klass för en dag baserat på det valda datumspannet.
 */
export function getDayClass(
  day: number,
  startDay: number | null,
  endDay: number | null,
): string {
  if (!startDay) return "";

  if (startDay && endDay) {
    if (day === startDay) return "calendar-dropdown__day--start";
    if (day === endDay) return "calendar-dropdown__day--end";
    if (day > startDay && day < endDay) return "calendar-dropdown__day--range";
  } else {
    if (day === startDay)
      return "calendar-dropdown__day--start calendar-dropdown__day--end";
  }

  return "";
}
