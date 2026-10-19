// Booking dates are stored as midnight UTC of the chosen day ("2026-10-25" -> 2026-10-25T00:00Z).
// Formatting them in UTC keeps the day the guest picked, instead of showing the day before west of UTC.
export function formatBookingDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// The calendar day a guest picked, as "YYYY-MM-DD", so the server stores that day and not a time of day.
export function toDateOnly(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
