const billCodes = {
    'SH': 100,
    'AB': 200,
    'CD': 500,
    'EF': 1000,
    'GH': 2000,
    'IJ': 5000
};

document.getElementById('checkBtn').addEventListener('click', checkBill);
document.getElementById('serialInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkBill();
});

function checkBill() {
    const input = document.getElementById('serialInput').value.toUpperCase().trim();
    const inputGroup = document.querySelector('.input-group');
    const billDisplay = document.getElementById('billDisplay');
    
    if(/^[A-Z]{2}\d{8}$/.test(input)) {
        const code = input.substr(0, 2);
        const amount = billCodes[code];
        
        if(amount) {
            inputGroup.classList.add('hidden');
            
            setTimeout(() => {
                billDisplay.classList.add('visible');
                billDisplay.setAttribute('data-amount', amount);
                billDisplay.querySelector('.serial-number').textContent = input;
                billDisplay.querySelector('.amount').textContent = `${amount}₽`;
                billDisplay.classList.remove('hidden');
            }, 400);
            
            return;
        }
    }
    
    alert('Ошибка! Введите номер в формате: 2 буквы + 8 цифр\nПример: SH12345678');
}

document.getElementById('billDisplay').addEventListener('click', resetUI);

function resetUI() {
    const billDisplay = document.getElementById('billDisplay');
    billDisplay.classList.remove('visible');
    billDisplay.classList.add('hidden');
    
    setTimeout(() => {
        document.querySelector('.input-group').classList.remove('hidden');
        document.getElementById('serialInput').value = '';
        document.getElementById('serialInput').focus();
    }, 300);
}
