// Function to update the displayed date and time blocks
function updateDay() {
  var currentDate = moment().subtract(dayOffset, 'days'); // Calculate the date based on the offset
  var planWorkday = [
    { time: "9:00 AM", event: "" },
    { time: "10:00 AM", event: "" },
    { time: "11:00 AM", event: "" },
    { time: "12:00 PM", event: "" },
    { time: "1:00 PM", event: "" },
    { time: "2:00 PM", event: "" },
    { time: "3:00 PM", event: "" },
    { time: "4:00 PM", event: "" },
    { time: "5:00 PM", event: "" },
  ];

  // Retrieve saved events from localStorage
  var savedEvents = localStorage.getItem("workDay");
  if (savedEvents) {
    planWorkday = JSON.parse(savedEvents);
  }

  $(".container").empty(); // Clear the container before re-populating

  planWorkday.forEach(function(timeBlock, index) {
    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);
    var row =
      `<div class="time-block" id="hour-${index}">
        <div class="hour">${timeLabel}</div>
        <textarea class="${blockColor}">${timeBlock.event}</textarea>
        <button class="saveBtn">Save</button>
      </div>`;
    $(".container").append(row);
  });

  // Update the displayed date
  $("#currentDay").text(currentDate.format("dddd, MMM Do YYYY"));

  // Save textarea content to localStorage when save button is clicked
  $(".saveBtn").on("click", function() {
    var index = $(this).closest(".time-block").attr("id").split("-")[1];
    var event = $(this).siblings("textarea").val();
    planWorkday[index].event = event;
    localStorage.setItem("workDay", JSON.stringify(planWorkday));
  });
}

function colorRow(time) {
  var planNow = moment();
  var planEntry = moment(time, "h:mm A");
  if (planNow.isBefore(planEntry)) {
    return "future";
  } else if (planNow.isAfter(planEntry)) {
    return "past";
  } else {
    return "present";
  }
}

// Initial load of the current day
var dayOffset = 0;
updateDay();

// Button click event to show the next day
$("#prev-btn").on("click", function() {
  dayOffset++; // Increment the offset to go to the next day
  console.log("Next button clicked. Day offset:", dayOffset);
  updateDay(); // Update the displayed date and time blocks
});

// Button click event to show the next day
$("#next-btn").on("click", function() {
  dayOffset--; // Decrement the offset to go to the next day
  console.log("Next button clicked. Day offset:", dayOffset);
  updateDay(); // Update the displayed date and time blocks
});
