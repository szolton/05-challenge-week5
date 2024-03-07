var planWorkday = [
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
];

var dayOffset = 0;

// Load saved events on page load and update the UI
window.onload = function() {
  for (var i = 0; i < 15; i++) {
    var eventId = 'event' + i;
    var event = localStorage.getItem(eventId);
    if (event !== null) {
      planWorkday[i].event = event;
    }
  }
  updateDay();
};

function updateDay() {
  var currentDate = moment().add(dayOffset, 'days');

  $(".container").empty();

  planWorkday.forEach(function(timeBlock, index) {
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
}

function colorRow(time) {
  var planNow = moment();
  var planEntry = moment(time, "h:mm A");
  if (planNow.isBefore(planEntry)) {
    return "future";
  } else if (planNow.isAfter(planEntry.endOf('hour'))) {
    return "past";
  } else {
    return "present";
  }
}


function saveEvent(id) {
  var event = document.getElementById('event' + id).value;
  localStorage.setItem('event' + id, event);
  planWorkday[id].event = event;
  localStorage.setItem('workDay', JSON.stringify({ planWorkday, dayOffset }));
}

$("#prev-btn").on("click", function() {
  dayOffset--;
  console.log("Prev button clicked. Day offset:", dayOffset);
  updateDay();
});

$("#next-btn").on("click", function() {
  dayOffset++;
  console.log("Next button clicked. Day offset:", dayOffset);
  updateDay();
});

$(".container").on("click", ".saveBtn", function() {
  var index = $(this).data("index");
  var event = $("#event" + index).val();
  localStorage.setItem("event" + index, event);
});

updateDay();
