document.addEventListener("DOMContentLoaded", function () {
    const typeSelect = document.getElementById("typeSelect");
    const categorySelect = document.getElementById("categorySelect");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    let totalIncome = 0;
    let totalExpense = 0;
    let transactions = []; // Store transactions
    let isSorting = false;  // Flag to prevent adding transactions when sorting

    // Function to update the summary container
    function updateSummary() {
        document.getElementById("total-income-value").textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById("total-expense-value").textContent = `$${totalExpense.toFixed(2)}`;
        const balance = totalIncome - totalExpense;
        document.getElementById("balance-value").textContent = `$${balance.toFixed(2)}`;
    }

    // Function to populate categories based on transaction type
    function updateCategoryOptions() {
        const incomeCategories = [
            "Salary & Wages", "Freelance", "Investments", "Business Revenue",
            "Government Benefits", "Gifts & Allowances", "Rental Income", "Other Income"
        ];

        const expenseCategories = [
            "Food & Dining", "Housing & Utilities", "Transportation", "Health & Wellness",
            "Entertainment", "Personal Care", "Education", "Debt & Loans", "Cleaning Supplies",
            "Savings & Investments", "Miscellaneous", "Other Expense"
        ];

        categorySelect.innerHTML = ""; // Clear previous options

        let categories = typeSelect.value === "Income" ? incomeCategories : expenseCategories;

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Event listener for type selection
    typeSelect.addEventListener("change", updateCategoryOptions);

    // Function to load saved data from localStorage
    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem("transactionData"));
        if (savedData) {
            document.getElementById("amountInput").value = savedData.amount || "";
            document.getElementById("descriptionInput").value = savedData.description || "";
            document.getElementById("datePicker").value = savedData.date || "";
            typeSelect.value = savedData.type || "Select Type";
            categorySelect.value = savedData.category || "Select Category";
        }
    }

    // Load saved data when the page loads
    loadSavedData();

    // Function to save form data to localStorage
    function saveDataToLocalStorage() {
        const amount = document.getElementById("amountInput").value.trim();
        const description = document.getElementById("descriptionInput").value.trim();
        const date = document.getElementById("datePicker").value;
        const type = typeSelect.value;
        const category = categorySelect.value;

        const transactionData = {
            amount,
            description,
            date,
            type,
            category
        };

        // Save the data to localStorage
        localStorage.setItem("transactionData", JSON.stringify(transactionData));
    }

    // Event listener to save form data to localStorage as user types
    document.getElementById("transactionForm").addEventListener("input", saveDataToLocalStorage);

    // Form submission handling
    document.getElementById("transactionForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Don't allow form submission when sorting
        if (isSorting) {
            return;
        }

        // Ensure userId is correctly retrieved
        const userId = localStorage.getItem("id");
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        // Get form input values
        const amount = document.getElementById("amountInput").value.trim();
        const description = document.getElementById("descriptionInput").value.trim();
        const date = document.getElementById("datePicker").value;
        const type = typeSelect.value;
        const category = categorySelect.value;

        // Validation checks
        if (!amount || !date || !description || type === "Select Type" || category === "Select Category") {
            alert("All fields are required!");
            return;
        }

        // Validate amount to ensure it's a valid number
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            alert("Amount must be a valid number!");
            return;
        }

        // Prepare transaction data
        const transactionData = {
            userId,
            amount: parsedAmount,
            date: date,
            description: description,
        };

        let API_URL_INCOME = "https://demo-api-skills.vercel.app/api/FinanceManager/transactions/income";
        let API_URL_EXPENSE = "https://demo-api-skills.vercel.app/api/FinanceManager/transactions/expense";

        if (type === "Income") {
            transactionData.source = category;
        } else if (type === "Expense") {
            transactionData.category = category;
        } else {
            alert("Invalid transaction type!");
            return;
        }

        // API request to record transaction
        const API_URL = type === "Income" ? API_URL_INCOME : API_URL_EXPENSE;

        axios.post(API_URL, transactionData)
            .then(response => {
                console.log("Transaction added successfully:", response.data);
                alert("Transaction recorded successfully!");

                // Update the total income/expense based on the transaction type
                if (type === "Income") {
                    totalIncome += parsedAmount;
                } else if (type === "Expense") {
                    totalExpense += parsedAmount;
                }

                // Update the summary
                updateSummary();

                // Add transaction to the table (if it's not already added)
                addTransactionToTable(response.data);
                localStorage.removeItem("transactionData"); // Clear localStorage after successful submission
            })
            .catch(error => {
                console.error("Error adding transaction:", error);
                alert("Error: " + (error.response?.data?.error || error.message));
            });
    });

    // Function to add transaction to the table dynamically
    function addTransactionToTable(transaction) {
        const tbody = document.getElementById("transaction-body");

        // Remove placeholder row if it exists
        const placeholderRow = document.querySelector(".placeholder-row");
        if (placeholderRow) {
            placeholderRow.remove();
        }

        // Check if the transaction is already in the table
        const existingRow = tbody.querySelector(`tr[data-transaction-id="${transaction.id}"]`);
        if (existingRow) return; // Prevent adding duplicate transactions

        const row = document.createElement("tr");
        row.setAttribute("data-transaction-id", transaction.id);

        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.type}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category || transaction.source}</td>
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td>
                <button class="delete-btn">Delete</button>
                <button class="update-btn">Update</button>
            </td>
        `;

        tbody.appendChild(row);
        transactions.push(transaction); // Add to the transaction array
    }

    // Event listener for deleting a transaction
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const row = event.target.closest("tr");
            const transactionId = row.getAttribute("data-transaction-id");

            if (!transactionId) {
                alert("Transaction ID is missing!");
                return;
            }

            const confirmDelete = confirm("Are you sure you want to delete this transaction?");
            if (!confirmDelete) return;

            const API_URL_DELETE_FINANCIAL_TRACKER = `https://demo-api-skills.vercel.app/api/FinanceManager/transactions/${transactionId}`;

            // Stop any further events from triggering on delete
            event.stopImmediatePropagation();

            // Prevent the form submission that could follow this event
            event.preventDefault();

            // Proceed with the delete API request
            axios.delete(API_URL_DELETE_FINANCIAL_TRACKER)
                .then(response => {
                    console.log("Transaction deleted successfully:", response.data);
                    row.remove(); // Remove the row from the table after successful deletion

                    // Update the totals and balance after deletion
                    const amount = parseFloat(row.querySelector('td:nth-child(3)').textContent);
                    const type = row.querySelector('td:nth-child(2)').textContent;

                    if (type === "Income") {
                        totalIncome -= amount;
                    } else if (type === "Expense") {
                        totalExpense -= amount;
                    }

                    // Update the summary
                    updateSummary();
                    alert("Transaction deleted successfully!");
                })
                .catch(error => {
                    console.error("Error deleting transaction:", error);
                    alert("Error deleting transaction: " + (error.response?.data?.error || error.message));
                });
        }

        // Event listener for updating a transaction
        if (event.target && event.target.classList.contains("update-btn")) {
            const transactionId = event.target.closest("tr").getAttribute("data-transaction-id");

            if (!transactionId) {
                alert("Transaction ID is missing!");
                return;
            }

            // Prevent form submission or any further propagation of the event
            event.stopImmediatePropagation();
            event.preventDefault();

            // Prompt for new values
            const amount = prompt("Enter new amount:");
            const description = prompt("Enter new description:");
            const category = prompt("Enter new category:");
            const date = prompt("Enter new date (YYYY-MM-DD):");
            const type = prompt("Enter new type (Income/Expense):");

            // Validation: Ensure all fields are filled in
            if (!amount || !description || !category || !date || !type) {
                alert("All fields are required to update the transaction.");
                return;
            }

            const updatedTransaction = {
                amount: parseFloat(amount),  // Ensure it's parsed as a number
                description: description,
                category: category,
                date: date,
                type: type
            };

            const API_URL_PUT_FINANCIAL_TRACKER = `https://demo-api-skills.vercel.app/api/FinanceManager/transactions/${transactionId}`;

            axios.put(API_URL_PUT_FINANCIAL_TRACKER, updatedTransaction)
                .then(response => {
                    console.log("Transaction updated successfully:", response.data);
                    alert("Transaction updated successfully!"); // Update message for successful update

                    // Update the row with the new values
                    const rowToUpdate = event.target.closest("tr");

                    // Update the columns for type, amount, category, date, and description
                    rowToUpdate.querySelector('td:nth-child(2)').textContent = updatedTransaction.type;  // Update type
                    rowToUpdate.querySelector('td:nth-child(3)').textContent = updatedTransaction.amount;  // Update amount
                    rowToUpdate.querySelector('td:nth-child(4)').textContent = updatedTransaction.category;  // Update category
                    rowToUpdate.querySelector('td:nth-child(5)').textContent = new Date(updatedTransaction.date).toLocaleDateString();  // Update date
                    rowToUpdate.querySelector('td:nth-child(6)').textContent = updatedTransaction.description;  // Update description

                    // Update the total income/expense dynamically
                    totalIncome = 0;
                    totalExpense = 0;
                    transactions.forEach(transaction => {
                        if (transaction.type === "Income") {
                            totalIncome += transaction.amount;
                        } else if (transaction.type === "Expense") {
                            totalExpense += transaction.amount;
                        }
                    });
                    updateSummary();
                })
                .catch(error => {
                    console.error("Error updating transaction:", error);
                    alert("Error updating transaction: " + (error.response?.data?.error || error.message));
                });
        }
    });

    // Function to sort transactions by day or month
    function sortTransactionsByTime(filter) {
        if (isSorting) {
            return;
        }

        isSorting = true;  // Set flag to prevent new submissions

        console.log("Selected filter:", filter);  // Debugging line to check filter value

        // Validate filter
        if (filter !== "days" && filter !== "months") {
            alert("Invalid filter selected. Please choose either 'days' or 'months'.");
            isSorting = false;
            return;
        }

        const userId = localStorage.getItem("id");
        if (!userId) {
            alert("User ID is missing.");
            isSorting = false;
            return;
        }

        const API_URL_GET_FINANCIAL_TRACKER = `https://demo-api-skills.vercel.app/api/FinanceManager/users/${userId}/transactions/sort?${filter}=true`;

        axios.get(API_URL_GET_FINANCIAL_TRACKER)
            .then(response => {
                const sortedTransactions = response.data;

                // Rebuild the table
                const tbody = document.getElementById("transaction-body");
                tbody.innerHTML = ""; // Clear the existing rows

                sortedTransactions.forEach(transaction => {
                    addTransactionToTable(transaction);  // Add sorted transaction to the table
                });

                isSorting = false;  // Reset the flag after sorting
            })
            .catch(error => {
                console.error("Error sorting transactions:", error);
                alert("Error sorting transactions: " + (error.response?.data?.error || error.message));
                isSorting = false;
            });
    }

    // Event listener for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = button.getAttribute("data-filter");
            sortTransactionsByTime(filter);  // Pass the selected filter to the sorting function
        });
    });
});
