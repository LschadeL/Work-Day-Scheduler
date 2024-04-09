currentTime = dayjs().hour();

$(function () {
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    showTimes();
    $("button.saveBtn").click(createSchedule);
    $("#clearBtn").click(clearSchedule);
});

function showTimes() {
   const timeId = $(this).attr("id");
   const savedData = localStorage.getItem(timeId);
   const hourBlock = parseInt(timeId.split("-")[1]);
   const currentMinute = currentTime.minute(0);
   const timeBlock = dayjs().hour(hourBlock).minute(0);

   $(".time-block").each(function () {
        if (savedData !== null) {
            $(this).children(".description").val(savedData);
        };

        if (timeBlock.isBefore(currentMinute, "hour")) {
            $(this).removeClass("present future").addClass("past");
        } else if (timeBlock.isSame(currentMinute, "hour")) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });
};

function createSchedule() {
    const timeId = $(this).parent().attr("id");
    const userInput = $(this).siblings(".description").val();

    localStorage.setItem(timeId, userInput);
};
  
function clearSchedule() {
    localStorage.clear();
    location.reload();
};