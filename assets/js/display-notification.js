window.addEventListener('load',() => {setTimeout(function() {
        if(window.localStorage.getItem('showNotification') == null || window.localStorage.getItem('showNotification') != 'no') {
            notification.style.display='block';
            notification.focus();
        }
    },5000)});

const notification = document.querySelector('.notification-window');

notification.addEventListener('keyup', (event) => {
    switch(event.keyCode){
        case 39: showNextHint(); break;
        case 37: showPrevHint(); break;
        case 27: closeWindow();
    }
});

// We show only first 9 notifications
const MAX_AMOUNT = 9;
const hintsArray=[
    'Email tip of the day \r\n More than 60% of emails we send do not require a response.\r\n Use "No response needed" to make',
    'It is the 2 hint \r\nRather than forcing you reader to download an attachment and open it in a separate program, you will probably get faster results if you just copy-paste the most important part of the document into the body of your message.',
    'Hint 3 \r\n It is the 3 hint',
    'Hint 4 \r\n It is the 3 hint',
    'Hint 5 \r\n It is the 3 hint',
    'Hint 6 \r\n It is the 3 hint',
    'Hint 7 \r\n It is the 3 hint',
    'Hint 8 \r\n It is the 3 hint',
    'Hint 9 \r\n It is the 3 hint',
    'Hint 10 \r\n It is the 3 hint',
    'Hint 11 \r\n It is the 3 hint'
];

const lastIndex = hintsArray.length > MAX_AMOUNT ? MAX_AMOUNT: hintsArray.length;
const hintMarks =  document.querySelector('.hint-marks');
let amount = 0;
while (amount < lastIndex){
    let li = document.createElement('li');
    let mark = document.createElement('i');
    mark.classList.add('fas');
    mark.classList.add('fa-circle');
    if(amount == 0){
        mark.classList.add('active');
    }
    li.appendChild(mark);
    hintMarks.appendChild(li);
    amount += 1;
}

const mainText = document.querySelector('.main-text');

let selectedHint = 0;
mainText.textContent = hintsArray[selectedHint];


const closeIcon = document.querySelector('.close-icon');
closeIcon.addEventListener('click', closeWindow);
function closeWindow(){ notification.style.display='none';}

const disableCheckbox = document.querySelector('#disableTips');
disableCheckbox.addEventListener('change', changeCheckbox);

function changeCheckbox(e) {
    if(e.target.checked){
        window.localStorage.setItem('showNotification','no');
    } else{
        window.localStorage.removeItem('showNotification');
    }
}

const allHintsMarks = document.querySelectorAll('.hint-marks i');
const nextHint = document.querySelector('#nextHint');
nextHint.addEventListener('click', showNextHint);

function showNextHint() {
    allHintsMarks.item(selectedHint).classList.remove('active');
    if(selectedHint < (lastIndex- 1)){
        selectedHint += 1;
    } else {
        selectedHint = 0;
    }

    mainText.textContent = hintsArray[selectedHint];
    allHintsMarks.item(selectedHint).classList.add('active')
}

const prevHint = document.querySelector('#prevHint');
prevHint.addEventListener('click', showPrevHint);

function showPrevHint() {
    allHintsMarks.item(selectedHint).classList.remove('active');
    if(selectedHint > 0){
        selectedHint -=1 ;
    } else {
        selectedHint = lastIndex-1;
    }

    mainText.textContent = hintsArray[selectedHint];
    allHintsMarks.item(selectedHint).classList.add('active');
}
