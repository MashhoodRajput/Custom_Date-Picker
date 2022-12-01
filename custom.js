let calenderRender = document.querySelector('.date-picker')
const date_Picker = document.querySelector('.label')


// Constructor Function
function CalendarControl() {
    const calendar = new Date()

    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        selectedDate: calendar.getDate(),
        calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        calMonthName: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
        // DAYS IN MONTH
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay() + 1;
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay() + 1;
        },
        navigateToPreviousMonth: function () {
            calendarControl.setMonthDateforFeb()
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
           calendarControl.setMonthDateforFeb()
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },

        // Next Month Last Date for Feb
        getNextMonthLastDate: function () {
            let nextMonthLastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth() + 2, 0).getDate();
                return nextMonthLastDate;
        },
        //PREVIOUS MONTH LAST DATE
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(), 0).getDate();
            return lastDate;
        },
        //NEXT Month Date if Date less than 28
        setMonthDateforFeb: function(){
            let nextMonthLastDate =calendarControl.getNextMonthLastDate();
            let PreviousMonthLastDate =calendarControl.getPreviousMonthLastDate();
            if(nextMonthLastDate< 30 && calendarControl.selectedDate >28 || PreviousMonthLastDate < 30 && calendarControl.selectedDate >28 ){
                calendar.setMonth(calendar.getMonth(),28)
               calendarControl.selectedDate = 28
            }
        },
        //format date
        
        formatDate: function (newdate) {
            
            let day = newdate.getDate()
            let month = newdate.getMonth() + 1
            let year = newdate.getFullYear()

            if (month < 10) {
                month = `0${month}`
            }
            if (day < 10) {
                day = `0${day}`
            }
            return `${day} / ${month} / ${year}`
        },



        // RENDER CALENDAR
        renderCalendar: function () {
            
            calenderRender.innerHTML += `
<div class="label"></div>
	    <div class="inner-table">
            <div class="today-date"></div>
	   <div class="months">
	        <div class="arrows prev">&lt;</div>
	        <div class="month"></div>
	        <div class="arrows next">&gt;</div>
        </div>
	   <div class="calender-table">
            <div class="weeks">
        <div class="weeksName"></div>
            </div>
	        <div class="days">
             <div class="day"></div>
            </div>
	   </div>
</div>
`
        },


        //SELECTED DATE IN LABEL
        selectDate: function (e) {
            let selectedDate = parseInt(e.target.textContent)
            let newdate = new Date(calendar.getFullYear(), calendar.getMonth(), selectedDate)
            calendarControl.selectedDate = selectedDate
            calendarControl.plotDates()
            calendarControl.highlightToday()
            calendarControl.attachEvents()
            calendarControl.todayDate_In_Lable(newdate)

        },

        
        //HIGLIGHT TODAY DATE
        highlightToday: function () {
            const dayElement = document.querySelectorAll('.day')
            for (i = 1; i <= dayElement.length; i++) {
                if ((i) == calendarControl.selectedDate) {
                    document.querySelectorAll('.day')[calendarControl.selectedDate - 1].classList.add('currentDate')
                }
            }

        },

        // CURRENT DATE
        todayDate_In_Lable: function (newdate) {
            const labelDateElement = document.querySelector('.label')
            labelDateElement.textContent = calendarControl.formatDate(newdate)
            labelDateElement.dataset.value = newdate
        },


        //DISPLAY DATE WITH NAME IN TODY-DATE
        today_Date: function () {
            const todyDate_Element = document.querySelector('.today-date')
            todyDate_Element.innerHTML = `
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]},
        ${calendarControl.localDate.getDate()}-${calendarControl.calMonthName[calendarControl.localDate.getMonth()]}-${calendarControl.localDate.getFullYear()} `
        },

        //DISPLAY MONTH AND YEAR
        displayMonth: function () {

            const monthElement = document.querySelector('.month')
            monthElement.innerHTML = `
        ${calendarControl.calMonthName[calendar.getMonth()]}
        ${calendar.getFullYear()}`
        },


        // DISPLAY WEEKS NAME
        displayWeeks: function () {
            const calendarTable = document.querySelector('.calender-table')
            let weekNameRender = document.createElement('div')
            weekNameRender.classList.add('weeks')
            for (i = 0; i < calendarControl.calWeekDays.length; i++) {
                weekNameRender.innerHTML += `
             <div class='weeksName'>${calendarControl.calWeekDays[i]}</div>`
            }
            calendarTable.appendChild(weekNameRender)
        },

        // HIDE AND SHOW CALENDAR
        toggleHideShow: function () {
            const innerTable = document.querySelector('.inner-table')
            innerTable.classList.toggle('active')
        },


        // ATTACHED EVENTS
        attachEvents: function () {
            const date_Picker = document.querySelector('.label');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next')
            const selectDateElement = document.querySelectorAll('.day')
            // EVENTS
            date_Picker.addEventListener('click', calendarControl.toggleHideShow)
            prevBtn.addEventListener('click', calendarControl.navigateToPreviousMonth)

            nextBtn.addEventListener('click', calendarControl.navigateToNextMonth)
            for (i = 0; i < selectDateElement.length; i++) {
                selectDateElement[i].addEventListener('click', calendarControl.selectDate)

            }
        },

        // REMAINING ITEM TO RENDER
        plotDates: function () {
            const table_Body = document.querySelector('.calender-table');
            table_Body.innerHTML = ''
          
            calendarControl.todayDate_In_Lable(calendar)
            calendarControl.today_Date()
            calendarControl.displayMonth()
            calendarControl.displayWeeks()

            let count = 1;
            let prevDateCount = 0;
            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear());
            let daysElement = document.createElement('div')
            const calendarTable = document.querySelector('.calender-table')
            daysElement.classList.add('days')
            for (let i = 1; i < calendarDays; i++) {

                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;

                    daysElement.innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    daysElement.innerHTML += `<div class="day" data-num=${count}>${count++}</div>`;
                }

            }
            calendarTable.appendChild(daysElement)


            //RAMAING DATES AFTER MONTH DATES
            for (let j = 0; j < prevDateCount + 1; j++) {
                daysElement.innerHTML += `<div class="day" data-num=${count}>${count++}</div>`;
            }
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates()
            calendarControl.highlightToday()
        },


        //PREVIOUS MONTH DATES
        plotPrevMonthDates: function (dates) {
            dates.reverse()
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },

        // NEXT MONTH Number Days shown 

        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.days').childElementCount;
            //7 lines
            if (childElemCount > 35) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            //6 lines
            if (childElemCount >= 28 && childElemCount <= 35) {
                let diff = 35 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.days').innerHTML += `<div class="next-date">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendar.setDate(calendarControl.selectedDate)
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        // INIT FUNCTIONS
        init: function () {
            calendarControl.renderCalendar()
            calendarControl.plotDates()
            calendarControl.attachEvents()
            calendarControl.highlightToday()
            

        },
    };
    calendarControl.init();
}


const calendarControl = new CalendarControl()

// licensed by Mashhood Rajput