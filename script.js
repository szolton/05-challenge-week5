var planWeek = [
  [
    { time: "9:00 AM", event: "" },
    { time: "9:30 AM", event: "" },
    { time: "10:00 AM", event: "" },
    { time: "10:30 AM", event: "" },
    { time: "11:00 AM", event: "" },
    { time: "12:00 PM", event: "" },
    { time: "12:30 PM", event: "" },
    { time: "1:00 PM", event: "" },
    { time: "1:30 PM", event: "" },
    { time: "2:00 PM", event: "" },
    { time: "2:30 PM", event: "" },
    { time: "3:00 PM", event: "" },
    { time: "3:30 PM", event: "" },
    { time: "4:00 PM", event: "" },
    { time: "4:30 PM", event: "" },
    { time: "5:00 PM", event: "" },
  ],
];

// prevents redeclaration
var dayOffset = 0;

// function to determine the color of a time block based on the current time
function colorRow(time) {
  // gets the current time
  var currentTime = moment();

  // converts the time string of the time block to a moment object
  var planNow = moment(time, "h:mm A");

// checks if the current time is within the same hour and 30 minutes of the time block
  if (currentTime.isSame(planNow, 'hour') && currentTime.isBetween(planNow, planNow.clone().add(30, 'minutes'))) {
    // return 'present' if the current time is within the time block
    return "present";
  } else if (planNow.isBefore(currentTime)) {
    // return 'future' if the time block is in the future
    return "past";
  } else {
    return "future";
  }
}

// Function to update colors based on current time
function updateColors() {
  var currentHour = moment().startOf('hour');

  $(".time-block").each(function(index, element) {
    var timeLabel = planWeek[0][index].time;
    var planNow = moment(timeLabel, "h:mm A");

    if (planNow.isSame(currentHour, 'hour')) {
      if (moment().isBetween(planNow, planNow.clone().add(30, 'minutes'))) {
        $(element).css("background-color", "#F4E1F3"); // Present time
        return;
      }
    }

    if (planNow.isBefore(moment(), 'minute')) {
      $(element).css("background-color", "#F4BBA2"); // Past time
    } else {
      $(element).css("background-color", "#E2B5F7"); // Future time
    }
  });
}


// Update colors every half hour
setInterval(updateColors, 1800000); // 1800000 milliseconds = 30 minutes

// initial update of the day
updateColors();


function updateColorsBasedOnCurrentTime() {
  $(".time-block").each(function(index, element) {
    var timeLabel = planWeek[dayOffset][index].time;
    var color = colorRow(timeLabel);

    if (color === "present") {
      $(element).css("background-color", "#F4E1F3"); // Set background color to #F4E1F3 for present time
    } else {
      $(element).css("background-color", "");
    }
  });
}


// calculates the current date based on the dayOffset variable
function updateDay() {
  var currentDate = moment().add(dayOffset, 'days');

  // clears the contents of the container element
  $(".container").empty();

  let id = 8.5;

  // iterates each timeblock in the planweek array for the current dayoffset, and generates HTML elements to display the time blocks in the scheduler
  planWeek[dayOffset].forEach(function(timeBlock, index) {
    id = id + .5
    if (index >= 26) {
      id = 9
    }

    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);

    var row =
    `<div class="row time-block ${blockColor}">
      <div id="${id}" class="col-2 col-md-1 hour text-center py-3">${timeLabel}</div>
      <textarea id="event${index}" class="col-8 col-md-10 description" rows="3">${timeBlock.event}</textarea>
      <button class="btn saveBtn col-2 col-md-1" data-index="${index}" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`;
    $(".container").append(row);
  });

  $("#currentDay").text(currentDate.format("dddd, MMM Do YYYY"));

  // updates the timer
  updateTimer();

  // updates colors after rendering the time blocks
  updateColors();

  // update colors based on current time after rendering
  updateColorsBasedOnCurrentTime();
}

var timerInterval; // Define a variable to hold the interval

function updateTimer() {
  clearInterval(timerInterval); // Clear the previous interval
  timerInterval = setInterval(function() {
    var currentTime = moment();
    var formattedTime = currentTime.format("h:mm:ss A");
    $("#timer").text(formattedTime);
  }, 1000); // Update every second
}

// loads saved events on page load and update the UI
window.onload = function() {
  for (var i = 0; i < planWeek.length; i++) {
    for (var j = 0; j < planWeek[i].length; j++) {
      var eventId = 'event' + j;
      var event = localStorage.getItem(eventId + '-' + i);
      if (event !== null) {
        planWeek[i][j].event = event;
      }
    }
  }
  updateDay();
};

// saves events entered into the text area
function saveEvent(id) {
  var event = document.getElementById('event' + id).value;
  localStorage.setItem('event' + id + '-' + dayOffset, event);
  planWeek[dayOffset][id].event = event;
}

// attach an event listener to all textarea elements within the container element
$(".container").on("input", "textarea", function() {
  var index = $(this).attr('id').replace('event', '');
  saveEvent(index);
});

// initial update of the day
updateDay();
