let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.querySelector('.calendar');
const newEventContainer = document.querySelector('.newEventContainer');
const deleteEventContainer = document.querySelector('.deleteEventContainer');
const eventSection = document.querySelector('.eventSection');
const eventTitleInput = document.querySelector('.newEventContainer__input');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function openDayWindow(date) {

    clicked = date;

    let count = 0;
    let events_for_day = [];

    for (let i = 0; i < events.length; i++) {

        if (events[i].date === clicked) {
            count++;
            events_for_day.push(events[i]);
        }
    }

    if (newEventContainer.style.opacity === '1') {
        removeAllChildWindows();
    }

    document.querySelector('.windowTitle--newEvent').innerText = clicked;


    if (count > 0) {

        for (let i = 0; i < events_for_day.length; i++) {

            const clonedEventContainer = document.createElement('div');
            const clonedContainerText = document.createElement('p');
            const clonedContainerBtnDel = document.createElement('button');

            clonedEventContainer.classList.add('eventSection__deleteEventContainer');
            clonedEventContainer.classList.add('deleteEventContainer');
            clonedEventContainer.append(clonedContainerText, clonedContainerBtnDel);

            clonedContainerText.classList.add('deleteEventContainer__text');
            clonedContainerText.innerText = events_for_day[i].title;

            clonedContainerBtnDel.classList.add('deleteEventContainer__button');
            clonedContainerBtnDel.classList.add('deleteEventContainer__button--delete');
            clonedContainerBtnDel.setAttribute('id', `${events.filter(e => e.date === clicked)[i].id}`);
            clonedContainerBtnDel.innerText = 'Delete';

            eventSection.appendChild(clonedEventContainer);
            clonedEventContainer.style.display = 'grid';

            tempArr = document.querySelectorAll('.deleteEventContainer');
            const tempDelEvent = tempArr[tempArr.length - 1];
                
            tempDelEvent.style.opacity = '1';
            tempDelEvent.style.height = '60px';

        }

        newEventContainer.style.opacity = '1';
        newEventContainer.style.height = 'auto';

    } else {

        newEventContainer.style.opacity = '1';
        newEventContainer.style.height = 'auto';

    }

    initiateButtons();

}

function loadCalendar() {

    const date = new Date();

    if (nav !== 0) {

        date.setMonth(new Date().getMonth() + nav);
        
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const first_day_month = new Date(year, month, 1);
    const days_in_month = new Date(year, month + 1, 0).getDate();

    const date_str = first_day_month.toLocaleDateString('en-gb', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    
    const padding_days = weekdays.indexOf(date_str.split(', ')[0]);

    document.querySelector('.monthDisplay__name').innerText = `${ date.toLocaleDateString('en-gb', { month: 'long' }) } ${ year }`;

    calendar.innerHTML = '';
    
    for(let i = 1; i <= padding_days + days_in_month; i++) {

        const day_container = document.createElement('div');
        day_container.classList.add('calendar__day');
        day_container.classList.add('day');

        const day_num = document.createElement('div');
        day_num.classList.add('day__num');
        day_container.appendChild(day_num);

        const day_str = `${i - padding_days}.${month}.${year}`;

        if (i > padding_days) {

            day_num.innerText = i - padding_days;

            if (i - padding_days === day && nav === 0) {
                day_container.classList.add('day--current');
            }

            let count = events.filter(e => e.date === day_str).length;

            if (count !== 0){

                const event_indicator = document.createElement('div');
                day_container.appendChild(event_indicator);
                event_indicator.classList.add('day__eventIndicator');
                event_indicator.innerText = count;

            }
                

            day_container.addEventListener('click', () => {
                openDayWindow(day_str);
            });

        } else {

            day_container.classList.add('calendar__day--padding');

        }

        calendar.appendChild(day_container);

    }

}

function closeNewEventWindow() {

    eventTitleInput.classList.remove('error');
    newEventContainer.style.opacity = '0';
    newEventContainer.style.height = '0';
    newEventContainer.style.overflow = 'hidden';
    deleteEventContainer.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;

};

function saveEvent() {

    if (eventTitleInput.value) {

        eventTitleInput.classList.remove('error');

        let idNewEvent = 0;

        if (events.length == 0) {
            idNewEvent = 0;
        } else {

            for (let i = 0; i < events.length; i++) {
                if (idNewEvent <= parseInt(events[i].id)) {
                    idNewEvent = parseInt(events[i].id) + 1;
                    }
                };

        };
        
        events.push({
            id: idNewEvent,
            date: clicked,
            title: eventTitleInput.value
        });

        localStorage.setItem('events', JSON.stringify(events));

        closeNewEventWindow();
        loadCalendar();
        sortEvents();
        removeAllChildWindows();

    } else {

        eventTitleInput.classList.add('error');

    }

};

function deleteEvent(idBtn) {
    events = events.filter(e => e.id !== idBtn);
    localStorage.setItem('events', JSON.stringify(events));
    loadCalendar();
    sortEvents();
    removeAllChildWindows();
    closeNewEventWindow();
}

function removeAllChildWindows() {
    while (eventSection.children.length > 1) {
        eventSection.removeChild(eventSection.lastChild);
    }
}

function removeChildWindows() {
    while (eventSection.children.length > 2) {
        eventSection.removeChild(eventSection.lastChild);
    }
}

function sortEvents() {
    for (let j = 0; j < events.length; j++) {
        for (let i = 0; i < events.length - 1; i++) {
            let splitFirst = events[i].date.split('.');
            let splitSecond = events[i+1].date.split('.');

            if (parseInt(splitFirst[2]) > parseInt(splitSecond[2])) {
                temp = events[i];
                events[i] = events[i+1];
                events[i+1] = temp;
            }

            if (parseInt(splitFirst[2]) === parseInt(splitSecond[2])) {

                if (parseInt(splitFirst[1]) > parseInt(splitSecond[1])) {
                    temp = events[i];
                    events[i] = events[i+1];
                    events[i+1] = temp;
                }

                if (parseInt(splitFirst[1]) === parseInt(splitSecond[1])) {

                    if (parseInt(splitFirst[0]) > parseInt(splitSecond[0])) {
                       temp = events[i];
                       events[i] = events[i+1];
                       events[i+1] = temp;
                    }
               }
            }
        }
    }
}

function initiateNavButtons() {

    document.querySelector('.monthDisplay__btn--next').addEventListener('click', () => {

        nav++;
        loadCalendar();

    });

    document.querySelector('.monthDisplay__btn--back').addEventListener('click', () => {

        nav--;
        loadCalendar();

    });

};

function initiateButtons() {

    document.querySelector('.newEventContainer__button--save').addEventListener('click', () => {

        saveEvent();

    });

    document.querySelector('.newEventContainer__button--cancel').addEventListener('click', () => {

        closeNewEventWindow();
        removeAllChildWindows();

    });

    let delEv = events.filter(e => e.date === clicked);

    if (delEv.length > 0) {
        for (let i = 0; i <= delEv.length; i++) {
            let tempBtn = document.querySelectorAll('.deleteEventContainer__button--delete')[i];
            tempBtn.addEventListener('click', () => deleteEvent(parseInt(tempBtn.id)));
        }
    };

};

loadCalendar();
initiateNavButtons();