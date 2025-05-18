const billDatabase = {
    'SH': { amount: 100, currency: '₽', status: 'active' },
    'AB': { amount: 200, currency: '₽', status: 'active' },
    'CD': { amount: 500, currency: '₽', status: 'active' },
    'EF': { amount: 1000, currency: '₽', status: 'active' },
    'GH': { amount: 2000, currency: '₽', status: 'active' },
    'IJ': { amount: 5000, currency: '₽', status: 'active' }
};

document.getElementById('checkBtn').addEventListener('click', checkBill);
document.getElementById('serialInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkBill();
});

function checkBill() {
    const input = document.getElementById('serialInput').value.toUpperCase().trim();
    const inputContainer = document.querySelector('.input-container');
    const billContainer = document.getElementById('billContainer');
    
    if(/^[A-Z]{2}\d{8}$/.test(input)) {
        const code = input.substring(0, 2);
        const billData = billDatabase[code];
        
        if(billData) {
            inputContainer.classList.add('hidden');
            billContainer.classList.remove('hidden');
            
            updateBillDisplay(input, billData);
            return;
        }
    }
    
    alert('Неверный серийный номер!\nПроверьте формат: 2 буквы + 8 цифр');
}

function updateBillDisplay(serial, data) {
    const bill = document.querySelector('.bill');
    bill.setAttribute('data-denomination', data.amount);
    
    document.querySelector('.serial-number').textContent = serial;
    document.querySelector('.denomination').textContent = 
        `${data.amount}${data.currency}`;
    
    const voidStamp = document.querySelector('.void-stamp');
    data.status === 'void' ? 
        voidStamp.classList.remove('hidden') :
        voidStamp.classList.add('hidden');
}

function voidBill() {
    const serial = document.querySelector('.serial-number').textContent;
    const code = serial.substring(0, 2);
    
    if(billDatabase[code] && billDatabase[code].status === 'active') {
        billDatabase[code].status = 'void';
        updateBillDisplay(serial, billDatabase[code]);
        localStorage.setItem(serial, 'void');
    }
}

// Восстановление состояния при загрузке
window.addEventListener('load', () => {
    Object.keys(localStorage).forEach(serial => {
        const code = serial.substring(0, 2);
        if(billDatabase[code]) {
            billDatabase[code].status = 'void';
        }
    });
});
