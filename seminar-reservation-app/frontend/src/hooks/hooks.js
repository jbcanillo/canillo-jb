// Function to format date to 'F j, Y' (e.g., December 14, 2024)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Get the day of the month
  const day = date.getDate();
  // Get the full month name
  const month = date.toLocaleString("default", { month: "long" });
  // Get the full year
  const year = date.getFullYear();
  // Format the date as 'F j, Y'
  return `${month} ${day}, ${year}`;
};

// Function to format time to AM/PM format
const formatTime = (timeString) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);
  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  // Convert hour from 24-hour to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 ? hours12 : 12; // Convert 0 hours to 12 (midnight case)
  // Format minutes as two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // Return formatted time in 12-hour format with AM/PM
  return `${hours12}:${formattedMinutes} ${ampm}`;
};

export { formatDate, formatTime };
