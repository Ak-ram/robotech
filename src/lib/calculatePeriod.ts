export function calculatePeriod(startDate) {
    // Get the current date
    var currentDate = new Date();

    // Convert start date to a Date object
    startDate = new Date(startDate);

    // Calculate the difference in months
    var monthsDifference = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
    monthsDifference -= startDate.getMonth();
    monthsDifference += currentDate.getMonth();

    // Adjust the difference if the end date day is earlier than the start date day
    if (currentDate.getDate() < startDate.getDate()) {
        monthsDifference--;
        var startMonthDays = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
        var daysDifference = startMonthDays - startDate.getDate() + currentDate.getDate();
    } else {
        var daysDifference = currentDate.getDate() - startDate.getDate();
    }

    // Construct the period string with months and days
    var periodString = '';

    if (monthsDifference > 0) {
        periodString += monthsDifference + ' month';
        if (monthsDifference > 1) {
            periodString += 's';
        }
    }

    if (daysDifference > 0) {
        if (monthsDifference > 0) {
            periodString += ', ';
        }
        periodString += daysDifference + ' day';
        if (daysDifference > 1) {
            periodString += 's';
        }
    }

    return periodString;
}