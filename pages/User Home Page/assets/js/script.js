const API_URL_GET_DETAILS = "https://demo-api-skills.vercel.app/api/FinanceManager/users/{userId}/transactions";

// Function to fetch transactions based on user ID
async function fetchTransactions(userId) {
    try {
        const response = await fetch(API_URL_GET_DETAILS.replace("{userId}", userId));
        if (!response.ok) {
            throw new Error("Failed to fetch transactions");
        }
        const transactions = await response.json();
        updateTransactionTable(transactions);
        updateSummary(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

// Function to update the transaction table
function updateTransactionTable(transactions) {
    const transactionBody = document.getElementById("transaction-body");
    transactionBody.innerHTML = ""; // Clear existing rows

    if (transactions.length === 0) {
        transactionBody.innerHTML = `<tr><td colspan="6" class="empty-placeholder">No transactions yet.</td></tr>`;
        return;
    }

    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.type}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.category || transaction.source}</td>
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td>${transaction.description || "N/A"}</td>
        `;
        transactionBody.appendChild(row);
    });
}

// Function to update the summary container
function updateSummary(transactions) {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type.toLowerCase() === "income") {
            totalIncome += transaction.amount;
        } else if (transaction.type.toLowerCase() === "expense") {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
    document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expense").textContent = `$${totalExpense.toFixed(2)}`;
}

// Simulating user login (Replace with actual user ID retrieval method)
document.addEventListener("DOMContentLoaded", () => {
    const userId = "123"; // Replace with actual user ID from authentication
    fetchTransactions(userId);
});
