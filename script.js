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

function colorRow(time) {
  var planNow = moment(time, "h:mm A");
  var currentHour = moment().startOf('hour');
  var currentTime = moment();

  if (planNow.isBefore(currentTime, 'minute')) {
    return "past";
  } else if (planNow.isSame(currentHour, 'hour')) {
    if (currentTime.isBetween(planNow, planNow.clone().add(30, 'minutes'))) {
      return "present";
    } else {
      return "future";
    }
  } else {
    return "future";
  }
}


function updateColors() {
  var currentDate = moment().add(dayOffset, 'days').startOf('day');

  $(".time-block").each(function(index, element) {
    var timeLabel = planWeek[dayOffset][index].time;
    var color = colorRow(timeLabel);

    if (color === "future") {
      $(element).css("background-color", "#E2B5F7");
    } else if (color === "past") {
      if (moment(timeLabel, "h:mm A").isBefore(currentDate)) {
        $(element).css("background-color", "#F4BBA2");
      }
    } if (color === "present") {
      $(element).css("background-color", "#C9BAD3");
    } else {
      $(element).css("background-color", "");
    }
  });
}



// Update colors every half hour
setInterval(updateColors, 1800000); // 1800000 milliseconds = 30 minutes


// calculates the current date based on the dayOffset variable
function updateDay() {
  var currentDate = moment().add(dayOffset, 'days');

  // clears the contents of the container element
  $(".container").empty();

let id = 8.5;

// iterates each timeblock in the planweek array for the current dayoffset, and generates HTML elements to display the time blocks in the scheduler
  planWeek[dayOffset].forEach(function(timeBlock, index) {
    // console.log("time-block", timeBlock);
    id=id+.5
    if (index >= 26) {
  id=9

  }

   
    // extracts the time property from the timeBlock object
    var timeLabel = timeBlock.time;
    // calls the colorRow function to determine the background color for current time block
    var blockColor = colorRow(timeLabel);
   
    

    // string containing HTML markup for a single time blcok, including the time label, textarea, and save button
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
  updateColors(); // 
}

function updateTimer() {
  setInterval(function() {
    var currentTime = moment();
    var formattedTime = currentTime.format("h:mm:ss A");
    $("#timer").text(formattedTime);
  }, 1000); // Update every second

  
}

// interactive previous/next buttons
// $("#prev-btn").on("click", function() {
//   dayOffset--;
//   if (dayOffset < 0) {
//     dayOffset = planWeek.length - 1;
//   }
//   console.log("Prev button clicked. Day offset:", dayOffset);
//   updateDay();
// });

// $("#next-btn").on("click", function() {
//   dayOffset++;
//   if (dayOffset >= planWeek.length) {
//     dayOffset = 0;
//   }
//   console.log("Next button clicked. Day offset:", dayOffset);
//   updateDay();
// });


// loads saved events on page load and update the UI
window.onload = function() {
  for (var i = 0; i < planWeek.length; i++) {
    for (var j = 0; j < planWeek[i].length; j++) {
      var eventId = 'event' + j;
      var event = localStorage.getItem(eventId + '-' + i); // 
      if (event !== null) {
        planWeek[i][j].event = event;
      }
    }
  }
  updateDay();
};

// saves events entered into the text area
// retreives the value of the textarea eleemnt with the id 'event' + id
function saveEvent(id) {
  var event = document.getElementById('event' + id).value;
  // used to save the event to the browsers local storage
  localStorage.setItem('event' + id + '-' + dayOffset, event); 
  // updated with the new event value, ensures that the planWeek array stays in sync w local storage
  planWeek[dayOffset][id].event = event;
}

// uses the jQuery to attach an event listener to all textarea elements within the container eleement
$(".container").on("input", "textarea", function() {
  var index = $(this).attr('id').replace('event', '');
  saveEvent(index);
});

// updated colors every minute
setInterval(updateColors, 60000);

// initial update of the day
updateDay();