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
    const input = document.getElementById('serialInput').value.toUpperCase();
    const billDisplay = document.getElementById('billDisplay');
    
    if(input.length === 10 && /^[A-Z]{2}\d{8}$/.test(input)) {
        const code = input.substr(0, 2);
        const amount = billCodes[code];
        
        if(amount) {
            billDisplay.classList.remove('hidden');
            billDisplay.setAttribute('data-amount', amount);
            billDisplay.querySelector('.bill-number').textContent = input;
            billDisplay.querySelector('.bill-amount').textContent = `${amount}₽`;
            return;
        }
    }
    
    alert('Некорректный номер купюры! Формат: 2 буквы + 8 цифр');
}
