setInterval(() => {
  let date = new Date();

  // Options for formatting the date and time
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Format the date and time according to the options
  let newDate = date.toLocaleString("en-US", options);
  document.getElementById("dateElement").textContent = newDate;

  // Determine rate logic
  const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = date.getHours(); // 17 = 5pm, 18 = 6pm

  // Get the elements for weekday and weekend rates
  const weekdayRateElement = document.getElementById("weekday");
  const weekendRateElement = document.getElementById("weekend");
  let onp = document.getElementById("onp");
  let regularTen = document.getElementById("regular-ten");

  // Weekend Rate: from Friday 6:00am to Sunday 6:00pm
  if (
    (currentDay === 5 && currentHour >= 6) || // Friday from 6:00 am onwards
    currentDay === 6 || // Saturday all day
    (currentDay === 0 && currentHour < 18)
  ) {
    // Sunday before 6:00 pm
    // Show Weekend Rate
    weekendRateElement.style.display = "block";
    weekdayRateElement.style.display = "none";
  } else {
    // Show Weekday Rate
    weekdayRateElement.style.display = "block";
    weekendRateElement.style.display = "none";
  }
  //Show ONP every 8:00 pm to 6:00 am Monday to Friday and Sunday
  if (
    // Sunday from 8 PM onwards
    (currentDay === 0 && currentHour >= 20) ||
    // Monday to Thursday from 8 PM to 6 AM (next day)
    (currentDay >= 1 &&
      currentDay <= 4 &&
      (currentHour >= 20 || currentHour < 6)) ||
    // Friday before 6 AM
    (currentDay === 5 && currentHour < 6)
  ) {
    regularTen.style.display = "none";
    onp.style.display = "table-row";
  } else {
    onp.style.display = "none";
    regularTen.style.display = "table-row";
  }
}, 1000); // Update every second
