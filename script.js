$("document").ready(function () {

    // Shows todays's date
    var today = dayjs().format('dddd[,] MMMM D[th]');
    if ((today.includes('1th') || today.includes('2th') || today.includes('3th')) && !(today.includes('11th') || today.includes('12th') || today.includes('13th'))) {
        today = today.replace("1th", "1st").replace("2th", "2nd").replace("3th", "3rd");;
    }
    $('#currentDay').text(today);

    const oldSchedules = JSON.parse(localStorage.getItem("schedules"));

    $("header").css("margin-bottom", "30px");

    var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    for (let i = 0; i < hours.length; i++) {
        $(".container").append("<div class='row'></div>");
        $(".row:last").append("<div class='col-1 text-right hourgit '><p class='time-block'>" + hours[i] + "</p></div>");
        $(".row:last").append("<div class='col-10 border border-dark p-0'><input class='description'></input></div>");
        if (oldSchedules != null) if (oldSchedules[i] != undefined) $("input:last").attr("value", oldSchedules[i]);
        $(".row:last").append("<div class='col-1 p-0'><button class='saveBtn w-100 h-100'></button></div>");
    }

    $(".description").addClass("w-100 h-100 m-0 p-2 border-0 text-dark text-wrap");

    var now = dayjs().hour();

    currentTimeIndex = now - 9;

    for (let i = 0; i < hours.length; i++) {
        if (i < currentTimeIndex) {
            $(".description").eq(i).addClass("past");
        }
        else if (i > currentTimeIndex) {
            $(".description").eq(i).addClass("future");
        }
        else {
            $(".description").eq(i).addClass("present");
        }
    }

    $(".saveBtn").append("<img class='w-25 h-25' src='./images/save-button.png' alt='Save'>");
    $(".saveBtn").click(function () {
        var thisRowInput = $(this).parent().parent().children().eq(1).children().eq(0).val();
        var thisRowTime = $(this).parent().parent().children().eq(0).children().eq(0).text();

        var index = hours.indexOf(thisRowTime);
        var schedules = [];
        var oldScheduales = JSON.parse(localStorage.getItem("schedules"));
        if (oldScheduales != null) {
            oldScheduales[index] = thisRowInput;
            schedules = oldScheduales;
        } else {
            schedules[index] = thisRowInput;

        }
        localStorage.setItem("schedules", JSON.stringify(schedules))
    });

    $(".container").css("margin-bottom", "40px");

})