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

var dayOffset = 0;

function colorRow(time) {
  var planDate = moment(time, "h:mm A");
  var currentDate = moment().startOf('hour');

  if (planDate.isBefore(currentDate)) {
    return "past";
  } else if (planDate.isSame(currentDate, 'minute')) {
    return "present";
  } else {
    return "future";
  }
}



function updateColors() {
  var currentDate = moment().add(dayOffset, 'days').startOf('day');

  $(".time-block").each(function(index, element) {
    var timeLabel = planWeek[dayOffset][index].time;
    var planDate = moment(timeLabel, "h:mm A").startOf('day');

    var color = "";
    if (planDate.isBefore(currentDate)) {
      color = "past";
    } else if (planDate.isSame(currentDate, 'day')) {
      color = "present";
    } else {
      color = "future";
    }

    console.log("Time: " + timeLabel + ", Color: " + color);
    
    $(element).removeClass("past present future").addClass(color);
  });
}


function updateDay() {
  var currentDate = moment().add(dayOffset, 'days');

  $(".container").empty();

  planWeek[dayOffset].forEach(function(timeBlock, index) {
    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);
    var row =
    `<div class="row time-block ${blockColor}">
      <div class="col-2 col-md-1 hour text-center py-3">${timeLabel}</div>
      <textarea id="event${index}" class="col-8 col-md-10 description" rows="3">${timeBlock.event}</textarea>
      <button class="btn saveBtn col-2 col-md-1" data-index="${index}" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`;
    $(".container").append(row);
  });

  $("#currentDay").text(currentDate.format("dddd, MMM Do YYYY"));

  // Update the timer
  updateTimer();

  updateColors(); // Update colors after rendering the time blocks
}

function updateTimer() {
  setInterval(function() {
    var currentTime = moment();
    var formattedTime = currentTime.format("h:mm:ss A");
    $("#timer").text(formattedTime);
  }, 1000); // Update every second
}


$("#prev-btn").on("click", function() {
  dayOffset--;
  if (dayOffset < 0) {
    dayOffset = planWeek.length - 1;
  }
  console.log("Prev button clicked. Day offset:", dayOffset);
  updateDay();
});

$("#next-btn").on("click", function() {
  dayOffset++;
  if (dayOffset >= planWeek.length) {
    dayOffset = 0;
  }
  console.log("Next button clicked. Day offset:", dayOffset);
  updateDay();
});


// Load saved events on page load and update the UI
window.onload = function() {
  for (var i = 0; i < planWeek.length; i++) {
    for (var j = 0; j < planWeek[i].length; j++) {
      var eventId = 'event' + j;
      var event = localStorage.getItem(eventId + '-' + i); // Use a unique identifier for each day
      if (event !== null) {
        planWeek[i][j].event = event;
      }
    }
  }
  updateDay();
};

function saveEvent(id) {
  var event = document.getElementById('event' + id).value;
  localStorage.setItem('event' + id + '-' + dayOffset, event); // Use a unique identifier for each day
  planWeek[dayOffset][id].event = event;
}

$(".container").on("input", "textarea", function() {
  var index = $(this).attr('id').replace('event', '');
  saveEvent(index);
});

// Update colors every minute
setInterval(updateColors, 60000); // 60000 milliseconds = 1 minute

// Initial update of the day
updateDay();