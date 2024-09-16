document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.querySelector('.expense-list');
    const totalAmount = document.getElementById('total-amount');
    const clearExpensesButton = document.getElementById('clear-expenses');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const closeModalButton = document.querySelector('.modal .close');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render the list of expenses
    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <span>${expense.date}</span>
                <span>${expense.category}</span>
                <span>${expense.description}</span>
                <span>₹${expense.amount}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
            total += parseFloat(expense.amount);
        });
        totalAmount.textContent = total.toFixed(2);

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                expenses.splice(index, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();
            });
        });
    };

    // Handle expense form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;

        const expense = {
            amount,
            description,
            date,
            category
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    });

    // Clear all expenses
    clearExpensesButton.addEventListener('click', () => {
        expenses = [];
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    });

    // Show forgot password modal
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordModal.style.display = 'block';
    });

    // Close forgot password modal
    closeModalButton.addEventListener('click', () => {
        forgotPasswordModal.style.display = 'none';
    });

    // Handle forgot password form submission
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const recoverEmail = document.getElementById('recover-email').value;

        // Handle sending recovery email logic here
        alert(`Recovery email sent to: ${recoverEmail}`);
        forgotPasswordModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });

    // Initial render of expenses
    renderExpenses();
});
