$("document").ready(function () {

    // Shows todays's date
    var today = dayjs().format('dddd[,] MMMM D[th]');
    if ((today.includes('1th') || today.includes('2th') || today.includes('3th')) && !(today.includes('11th') || today.includes('12th') || today.includes('13th'))) {
        today = today.replace("1th", "1st").replace("2th", "2nd").replace("3th", "3rd");;
    }
    $('#currentDay').text(today);

    // Adds space below the header line and scheduler
    $("header").css("margin-bottom", "30px");

    var saveMsg = $('<p>');
    var saveSpan = $('<span>');

    saveSpan.css({ "display": "none", "color": "red" }).text("localStorage!");
    saveMsg.text("Changes saved in ").addClass("d-flex d-none justify-content-center");
    saveMsg.append(saveSpan);
    $(".container").prepend(saveMsg);

    // Gets previous schedules from local storage
    const oldSchedules = JSON.parse(localStorage.getItem("schedules"));

    var hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

    // Creates the structure of the schedualer and shows previous schedules
    for (let i = 0; i < hours.length; i++) {
        // Adds a row
        $(".container").append("<div class='row'></div>");

        // Adds a time block to the row
        $(".row:last").append("<div class='col-1 text-right hour'><p class='time-block'>" + hours[i] + "</p></div>");

        // Adds an input section to the row
        $(".row:last").append("<div class='col-10 border border-dark p-0'><input class='description'></input></div>");
        // Checks if already there was a schedule for this time and adds it to input
        if (oldSchedules != null) {
            if (oldSchedules[i] != undefined) {
                $("input:last").attr("value", oldSchedules[i]);
            }
        }

        // Adds a save button
        $(".row:last").append("<div class='col-1 p-0'><button class='saveBtn w-100 h-100'></button></div>");
    }

    // Styles the input element
    $(".description").addClass("w-100 h-100 m-0 p-2 border-0 text-dark text-wrap");

    // Gets the current hour
    var now = dayjs().hour();
    // Finds the current time index in the hour array if any exist
    currentTimeIndex = now - 9;

    // Sets the color of scheduler
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

    // Adds image to the save button 
    $(".saveBtn").append("<img class='w-25 h-25' src='./images/save-button.png' alt='Save'>");

    // Defines the functionality of the save botton (saving schedules in the local storage)
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
        localStorage.setItem("schedules", JSON.stringify(schedules));

        // Shows a message for 1 sec that event was saved
        saveMsg.addClass("d-inline").removeClass("d-none");
        saveSpan.addClass("d-inline").removeClass("d-none");
        setTimeout(function () {
            saveMsg.addClass("d-none");
            saveSpan.addClass("d-none");
        }, 1000);
    });

    //Adds bottom margin
    $(".container").css("margin-bottom", "40px");
});