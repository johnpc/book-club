/**
 * Utility functions for handling dates in New York time zone
 */

/**
 * Format a date string to display in New York time zone
 * @param dateString - ISO date string or any valid date input
 * @returns Formatted date string in New York time zone
 */
export function formatDateToNewYork(
  dateString: string | Date | undefined,
): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Format the date in New York time zone
  return date.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get today's date in New York time zone as an ISO string (YYYY-MM-DD)
 * @returns Today's date in YYYY-MM-DD format
 */
export function getTodayInNewYork(): string {
  const now = new Date();

  // Get the date components in New York time zone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("en-CA", options); // en-CA gives YYYY-MM-DD format
  return formatter.format(now);
}

/**
 * Convert a local date to New York time zone
 * @param date - Date object or string to convert
 * @returns Date object adjusted to New York time zone
 */
export function convertToNewYorkTime(date: Date | string): Date {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  // Create a formatter that will give us the time in New York
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Get the formatted date parts
  const parts = formatter.formatToParts(inputDate);

  // Extract the date components
  const year = parseInt(
    parts.find((part) => part.type === "year")?.value || "0",
  );
  const month =
    parseInt(parts.find((part) => part.type === "month")?.value || "0") - 1; // Months are 0-indexed
  const day = parseInt(parts.find((part) => part.type === "day")?.value || "0");
  const hour = parseInt(
    parts.find((part) => part.type === "hour")?.value || "0",
  );
  const minute = parseInt(
    parts.find((part) => part.type === "minute")?.value || "0",
  );
  const second = parseInt(
    parts.find((part) => part.type === "second")?.value || "0",
  );

  // Create a new date with the New York time components
  return new Date(year, month, day, hour, minute, second);
}
