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

/**
 * Normalize a date string to ensure it's stored consistently
 * This function ensures that dates are stored as YYYY-MM-DD format
 * without any time component, which prevents timezone issues
 * 
 * @param dateString - Date string in any format
 * @returns Date string in YYYY-MM-DD format
 */
export function normalizeDateForStorage(dateString: string): string {
  // If the date is already in YYYY-MM-DD format, return it as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Otherwise, parse the date and format it as YYYY-MM-DD
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Format a date for display in a form input
 * @param dateString - ISO date string or any valid date input
 * @returns Date string in YYYY-MM-DD format for form inputs
 */
export function formatDateForInput(dateString: string | undefined): string {
  if (!dateString) return getTodayInNewYork();
  
  // If the date is already in YYYY-MM-DD format, return it as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Otherwise, parse the date and format it as YYYY-MM-DD
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
