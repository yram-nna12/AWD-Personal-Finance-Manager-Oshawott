document.addEventListener("DOMContentLoaded", function () {
    loadTransactions(); // Load stored transactions

    document.getElementById("typeSelect").addEventListener("change", function () {
        let categoryDropdown = document.getElementById("categorySelect");
        categoryDropdown.innerHTML = ""; // Clear previous options

        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Category";
        categoryDropdown.appendChild(defaultOption);

        let incomeCategories = [
            "Salary & Wages", "Freelance", "Investments", "Business Revenue",
            "Government Benefits", "Gifts & Allowances", "Rental Income", "Other Income"
        ];

        let expenseCategories = [
            "Food & Dining", "Housing & Utilities", "Transportation", "Health & Wellness",
            "Entertainment", "Personal Care", "Education", "Debt & Loans", "Cleaning Supplies",
            "Savings & Investments", "Miscellaneous", "Other Expense"
        ];

        let selectedType = this.value;
        let categories = selectedType === "Income" ? incomeCategories : selectedType === "Expense" ? expenseCategories : [];

        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    });
});

function addTransaction() {
    let name = document.querySelector(".placeholder-name").value.trim();
    let description = document.querySelector(".placeholder-description").value.trim();
    let amount = parseFloat(document.querySelector(".placeholder-amount").value);
    let currency = document.querySelector(".currency").value;
    let type = document.getElementById("typeSelect").value;
    let category = document.getElementById("categorySelect").value;
    let date = document.querySelector(".date-picker").value;

    if (!name || !description || isNaN(amount) || !type || type === "Select Type" || !category || !date) {
        alert("Please fill out all fields correctly.");
        return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let transaction = {
        id: transactions.length + 1,
        name, description, amount, currency, type, category, date
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Clear input fields after adding
    document.querySelector(".placeholder-name").value = "";
    document.querySelector(".placeholder-description").value = "";
    document.querySelector(".placeholder-amount").value = "";
    document.getElementById("typeSelect").value = "Select Type";
    document.getElementById("categorySelect").innerHTML = '<option value="">Select Category</option>';
    document.querySelector(".date-picker").value = "";

    loadTransactions();
}

function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let tableBody = document.getElementById("transaction-body");
    tableBody.innerHTML = "";

    let totalIncome = 0, totalExpense = 0;

    if (transactions.length === 0) {
        tableBody.innerHTML = `<tr class="placeholder-row">
            <td colspan="7" class="empty-placeholder">No transactions yet.</td>
        </tr>`;
    } else {
        transactions.forEach((trans, index) => {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${trans.type}</td>
                <td>${trans.currency}${trans.amount.toFixed(2)}</td>
                <td>${trans.category}</td>
                <td>${trans.date}</td>
                <td>${trans.description}</td>
                <td><button onclick="deleteTransaction(${index})">Delete</button></td>
            </tr>`;
            tableBody.innerHTML += row;

            if (trans.type === "Income") {
                totalIncome += trans.amount;
            } else if (trans.type === "Expense") {
                totalExpense += trans.amount;
            }
        });
    }

    document.getElementById("total-income").innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expense").innerText = `$${totalExpense.toFixed(2)}`;
    document.getElementById("balance").innerText = `$${(totalIncome - totalExpense).toFixed(2)}`;
}

function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadTransactions();
}
