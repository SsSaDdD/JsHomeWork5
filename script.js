let myTickets = [];
const TICKET_PRICE = 62;
let selectedSeats = [];
let currentDirection = "";
let currentDate = "";

function showSeats() {
    const dirSelect = document.getElementById('direction');
    const dateInput = document.getElementById('date');

    if(!dateInput.value) {
        alert("Будь ласка, оберіть дату поїздки!");
        return;
    }

    currentDirection = dirSelect.value;
    currentDate = dateInput.value;

    const dateObj = new Date(currentDate);
    currentDate = dateObj.toLocaleDateString('uk-UA');

    const grid = document.getElementById('seats-grid');
    grid.innerHTML = '';
    selectedSeats = [];
    updatePrice();

    for (let i = 1; i <= 28; i++) {
        const isBooked = myTickets.some(ticket =>
            ticket.direction === currentDirection &&
            ticket.date === currentDate &&
            ticket.seat === i
        );

        const div = document.createElement('div');
        div.className = 'seat-wrapper';

        const disabledAttr = isBooked ? 'disabled' : '';
        const bookedStyle = isBooked ? 'background-color: #ddd;' : '';

        div.innerHTML = `
                    <input type="checkbox" value="${i}" onchange="toggleSeat(this)" ${disabledAttr}>
                    <span>${i}</span>
                `;
        if(isBooked) div.style.backgroundColor = "#e0e0e0";

        grid.appendChild(div);
    }

    document.getElementById('seat-section').style.display = 'block';
}

function toggleSeat(checkbox) {
    const seatNum = parseInt(checkbox.value);

    if (checkbox.checked) {
        selectedSeats.push(seatNum);
    } else {
        selectedSeats = selectedSeats.filter(s => s !== seatNum);
    }
    updatePrice();
}

function updatePrice() {
    const total = selectedSeats.length * TICKET_PRICE;
    document.getElementById('total-price').innerText = total;
}

function bookTickets() {
    if (selectedSeats.length === 0) {
        alert("Ви не обрали жодного місця!");
        return;
    }

    selectedSeats.forEach(seatNum => {
        const newTicket = {
            direction: currentDirection,
            date: currentDate,
            seat: seatNum
        };
        myTickets.push(newTicket);
    });

    renderTicketsTable();

    alert("Успішно заброньовано!");
    document.getElementById('seat-section').style.display = 'none';
    selectedSeats = [];
    updatePrice();
}

function renderTicketsTable() {
    const tbody = document.getElementById('tickets-body');
    tbody.innerHTML = '';

    myTickets.forEach(ticket => {
        const row = `
                    <tr>
                        <td>${ticket.direction}</td>
                        <td>${ticket.date}</td>
                        <td>${ticket.seat}</td>
                    </tr>
                `;
        tbody.innerHTML += row;
    });
}