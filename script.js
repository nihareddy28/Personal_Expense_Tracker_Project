const form = document.getElementById('expense-form');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const sortSelect = document.getElementById('sort-select');

let expenses = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (name && !isNaN(amount) && amount > 0) {
        const expense = {
            id: Date.now(),
            name,
            amount
        };

        expenses.push(expense);
        updateUI();

        // Clear inputs
        nameInput.value = '';
        amountInput.value = '';
    }
});

function updateUI() {
    expenseList.innerHTML = '';

    let sortedExpenses = [...expenses];
    const sortOption = sortSelect.value;

    if (sortOption === 'amount-asc') {
        sortedExpenses.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === 'amount-desc') {
        sortedExpenses.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === 'newest') {
        sortedExpenses.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'oldest') {
        sortedExpenses.sort((a, b) => a.id - b.id);
    }

    let total = 0;

    sortedExpenses.forEach(expense => {
        total += expense.amount;

        const div = document.createElement('div');
        div.classList.add('expense-item');
        div.innerHTML = `
      <span>${expense.name}: ₹${expense.amount}</span>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;
        expenseList.appendChild(div);
    });

    totalAmount.textContent = total.toFixed(2);
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateUI();
}

sortSelect.addEventListener('change', updateUI);
