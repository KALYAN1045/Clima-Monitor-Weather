export const convertToIST = (timestamp) => {
  // Convert the timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  // Convert to IST by adding 5 hours and 30 minutes
  const utcOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  const istDate = new Date(date.getTime() + utcOffset);

  // Get hours, minutes, and AM/PM format
  let hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // if hour is 0, set to 12

  return `${hours}:${minutes} ${ampm}`;
};
