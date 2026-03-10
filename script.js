function addTask(){

let input = document.getElementById("taskInput");

let text = input.value;

let li = document.createElement("li");

li.textContent = text;

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "🗑️";
deleteBtn.onclick = function(){
li.remove();
};

li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);

}

function saveTasks() {
  const items = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    items.push(li.firstChild.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(items));
}

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (!stored) return;
  const items = JSON.parse(stored);
  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(delBtn);
    document.getElementById('taskList').appendChild(li);
  });
}

window.onload = loadTasks;

// Calculator functions
let calculatorDisplay = '';

function appendNumber(num) {
  calculatorDisplay += num;
  updateDisplay();
}

function appendOperator(op) {
  if (calculatorDisplay && !calculatorDisplay.endsWith('+') && !calculatorDisplay.endsWith('-') && !calculatorDisplay.endsWith('*') && !calculatorDisplay.endsWith('/')) {
    calculatorDisplay += op;
    updateDisplay();
  }
}

function calculate() {
  try {
    calculatorDisplay = eval(calculatorDisplay);
    updateDisplay();
  } catch(e) {
    calculatorDisplay = 'Fehler';
    updateDisplay();
    setTimeout(clearDisplay, 1500);
  }
}

function clearDisplay() {
  calculatorDisplay = '';
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').value = calculatorDisplay;
}

// Calendar functions
let currentDate = new Date();

const quotes = [
  "Das Einzige, was du kontrollieren kannst, ist dein Fokus und deine Anstrengung.",
  "Jeder Tag ist eine neue Chance, besser zu werden.",
  "Erfolg ist nicht das Ziel, es ist eine Reise.",
  "Deine Einstellung bestimmt dein Schicksal.",
  "Kleine Schritte führen zu großen Ergebnissen.",
  "Die beste Zeit zum Handeln ist jetzt.",
  "Du bist fähiger, als du denkst.",
  "Gestern ist Geschichte, morgen ist ein Geheimnis. Heute ist ein Geschenk.",
  "Träume gross, arbeite hart, bleibe fokussiert.",
  "Ablehnung ist nur eine Umleitung zum besseren Weg.",
  "Dein einziger Gegner bist du selbst.",
  "Halte durch, der Durchbruch kommt.",
  "Qualität führt zu Chancen.",
  "Sei du selbst, der Rest wird folgen.",
  "Du bist stärker, als du glaubst."
];

let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  
  document.getElementById('monthYear').textContent = monthNames[month] + ' ' + year;
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);
  
  const calendarDaysContainer = document.getElementById('calendarDays');
  calendarDaysContainer.innerHTML = '';
  
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = date.getDate();
    
    if (date.getMonth() !== month) {
      dayDiv.classList.add('other-month');
    }
    
    if (date.toDateString() === today.toDateString()) {
      dayDiv.classList.add('today');
    }
    
    calendarDaysContainer.appendChild(dayDiv);
  }
  
  updateTearOffCalendar();
}

function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function updateTearOffCalendar() {
  const today = new Date();
  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  
  const dateString = dayNames[today.getDay()] + ', ' + today.getDate() + '. ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();
  document.getElementById('todayDate').textContent = dateString;
  
  document.getElementById('dailyQuote').textContent = quotes[currentQuoteIndex];
}

function getNextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  document.getElementById('dailyQuote').textContent = quotes[currentQuoteIndex];
}

window.addEventListener('DOMContentLoaded', function() {
  renderCalendar();
});