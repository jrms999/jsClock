// This function is used to add a leading 0, if the value of 'i' is less than 10.
function checkTime(i) {
    // Check to see if 'i' is less than 10.
    if (i < 10) {
        // If 'i' is less than 10, add a leading 0.
        i = "0" + i;
    };
    // Return the new value of 'i' - this may be changed or unchanged, depending on if the conditional statement evaluated as 'true'
    return i;
};

// The function to actually initialize the clock - starts when the page loads due to code at the bottom of the file.
function startTime() {
    // Create a new instance of the Date() object and store it as currentTime
    var currentTime = new Date();

    // Store the values of the current hours, minutes, and seconds of the new Date() object.
    var hour   = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var second = currentTime.getSeconds();

    // We want the time displayed in the 12-hour format, but computers read time on a 24-hour format, with 0 = midnight. So, we have to convert the time to a 12-hour format. If the time is larger than 12 (meaning after 12pm/noon), then...
    if (hour > 12) {
        // We want to subtract 12 from that number. Meaning, if the computer says the value of hours is 20 (8pm), we want to subtract 12 from that value, which gives us: 8.
        hour = hour - 12;
    };

    // Computers also don't display time like our clocks do (ie: 11:09am is displayed as 11:9am). So, we need to make sure that minutes/seconds values that are less than 10 are displayed with a leading 0. So, we use the checkTime() function that we declared at the top of the file. We pass the current value of minute and second as parameters to the function. Make sure to read this as:
    // minute (the variable) = checkTime(minute [the current value of minute]). Also remember that a single = means you are re-assigning value to that variable
    minute = checkTime(minute);
    second = checkTime(second);

    // Select the element with id="time" and change the text to the current time using the values from the hour, minue, and second variables.
    document.getElementById('time').textContent = hour + ":" + minute + ":" + second;

    // Using setTimeout re-calls the startTime() function every second (1000 milliseconds), so the time being displayed on the page continuously updates.
    setTimeout(startTime, 1000);
}

// Add an event listener to the element with an id='time' to start the function when it loads, so finally the time will be displayed.
document.getElementById('time').addEventListener('onload', startTime(), false);
