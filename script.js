console.log(`Scripted linked`);

// Using JQuery ready method to run functions on site load
$(document).ready(function () {
  // Function to display and update current date and time
  const currentDateTime = function () {
    $("#current-day").text(moment().format("dddd, MMMM Do"));
    $("#current-time").text(moment().format("h:mm A"));
  };

  // Running currentDateTime on load
  currentDateTime();

  // Interval to update date and time every 30 seconds
  setInterval(currentDateTime, 30000);

  // Function to update row colors
  const rowColor = function () {
    let currentTime = moment().hours();
    console.log(currentTime);

    // For each loop to check and update row colors for all time-block elements
    $(".time-block").each(function () {
      let parsedRowTime = $(this).attr("id").split("-");
      let rowTime = parseInt(parsedRowTime[1]);
      console.log(parsedRowTime);
      console.log(rowTime);

      if (rowTime < currentTime) {
        $(this).addClass("past");
      } else if (rowTime > currentTime) {
        $(this).removeClass("past");
        $(this).addClass("future");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      }
    });
  };

  // Updating row colors on load
  rowColor();
  // Running rowColor function every 6 minutes
  setInterval(rowColor, 360000);

  // Function to save notes
  const saveNotes = function () {
    console.log("Button click registered");

    let hourId = $(this).parent().attr("id");
    let hourNotes = $(this).siblings(".text-box").val();

    localStorage.setItem(hourId, hourNotes);
  };

  //   Event listener for save button click
  $(".saveBtn").on("click", saveNotes);

  // For each loop to load locally stored data
  $(".time-block").each(function () {
    let hourId = $(this).attr("id");

    $(this).find(".text-box").val(localStorage.getItem(hourId));
  });
});
