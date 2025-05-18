const billDatabase = {
    'SH': { amount: 100, status: 'active' },
    'AB': { amount: 200, status: 'active' },
    'CD': { amount: 500, status: 'active' },
    'EF': { amount: 1000, status: 'active' },
    'GH': { amount: 2000, status: 'active' },
    'IJ': { amount: 5000, status: 'active' }
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
            
            setTimeout(() => {
                billContainer.classList.add('active');
                billContainer.classList.remove('hidden');
                updateBillDisplay(input, billData);
            }, 300);
            
            return;
        }
    }
    
    alert('Ошибка! Проверьте:\n• 2 заглавные буквы в начале\n• 8 цифр после\n• Пример корректного номера: SH12345678');
}

function updateBillDisplay(serial, data) {
    const bill = document.querySelector('.bill');
    bill.setAttribute('data-denomination', data.amount);
    document.querySelector('.serial-number').textContent = serial;
    document.querySelector('.denomination').textContent = `${data.amount}₽`;
}

function voidBill() {
    const serial = document.querySelector('.serial-number').textContent;
    const code = serial.substring(0, 2);
    
    if(billDatabase[code] && billDatabase[code].status === 'active') {
        billDatabase[code].status = 'void';
        localStorage.setItem(serial, 'void');
        document.querySelector('.bill').style.opacity = '0.4';
        document.querySelector('.void-btn').disabled = true;
    }
}

window.addEventListener('load', () => {
    Object.keys(localStorage).forEach(serial => {
        const code = serial.substring(0, 2);
        if(billDatabase[code]) {
            billDatabase[code].status = 'void';
        }
    });
});
