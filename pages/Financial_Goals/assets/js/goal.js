document.getElementById("goal-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("goal-title").value;
    const description = document.getElementById("goal-description").value;
    const targetAmount = document.getElementById("goal-target").value;
    const deadline = document.getElementById("goal-deadline").value; // Input value
    const userId = localStorage.getItem("id"); // Ensure user ID is correctly fetched

    // Validate inputs
    if (!title || !description || !targetAmount || !deadline || !userId) {
        alert("All fields are required!");
        return;
    }

    // Format the deadline using a helper function
    const formattedDeadline = formatDate(deadline); 

    const goalData = {
        title: title,
        description: description,
        targetAmount: targetAmount,
        deadline: formattedDeadline, // Use the formatted deadline
        userId: userId
    };

    axios.post('https://demo-api-skills.vercel.app/api/FinanceManager/goals', goalData)
        .then(response => {
            console.log("Goal created successfully:", response.data);
            alert("Goal created successfully!");

            // Call function to add the new goal to the table
            addGoalToTable(response.data); // Use response data to populate the table
        })
        .catch(error => {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                alert("Error creating goal: " + error.response.data.error || "Unknown error");
            } else {
                console.error("Error message:", error.message);
                alert("Error creating goal: " + error.message);
            }
        });
});

// Function to format date from 'YYYY-MM-DDT00:00:00.000Z' to 'YYYY-MM-DD'
function formatDate(dateString) {
    const date = new Date(dateString);  // Convert input date string to Date object
    const formattedDate = date.toLocaleDateString('en-CA');  // 'en-CA' ensures 'YYYY-MM-DD' format
    return formattedDate;
}


// Function to add a goal to the table
function addGoalToTable(goal) {
    const tbody = document.querySelector('.goal-table tbody');

    const row = document.createElement('tr');
    row.setAttribute('data-goal-id', goal.id);

    const titleCell = document.createElement('td');
    titleCell.textContent = goal.title;

    const targetAmountCell = document.createElement('td');
    targetAmountCell.textContent = goal.targetAmount;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = goal.description;

    // Convert deadline string to a Date object and format it to MM/DD/YYYY
    const deadlineDate = new Date(goal.deadline);
    const formattedDeadline = deadlineDate.toLocaleDateString('en-US');  // Format as MM/DD/YYYY

    const deadlineCell = document.createElement('td');
    deadlineCell.textContent = formattedDeadline;

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
        <button class="delete-btn">Delete</button>
        <button class="update-btn">Update</button>
    `;

    row.appendChild(titleCell);
    row.appendChild(targetAmountCell);
    row.appendChild(descriptionCell);
    row.appendChild(deadlineCell);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
}

// Event listener for deleting a goal
document.addEventListener('click', function(event) {
    // Delete goal logic
    if (event.target && event.target.classList.contains('delete-btn')) {
        const goalId = event.target.closest('tr').getAttribute('data-goal-id');

        if (!goalId) {
            alert("Goal ID is missing!");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this goal?");
        if (!confirmDelete) return;

        console.log("Deleting goal with ID:", goalId);

        axios.delete(`https://demo-api-skills.vercel.app/api/FinanceManager/goals/${goalId}`)
            .then(response => {
                console.log("Goal deleted successfully:", response.data);
                const rowToDelete = event.target.closest('tr');
                rowToDelete.remove();
                alert("Goal deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting goal:", error);

                if (error.response) {
                    alert("Error deleting goal: " + error.response.data.error || "Unknown error");
                } else if (error.request) {
                    alert("Error deleting goal: No response from server");
                } else {
                    alert("Error deleting goal: " + error.message);
                }
            });
    }

    // Update goal logic
    if (event.target && event.target.classList.contains('update-btn')) {
        const goalId = event.target.closest('tr').getAttribute('data-goal-id');
        
        if (!goalId) {
            alert("Goal ID is missing!");
            return;
        }

        // Example logic for updating (showing form or updating directly)
        const title = prompt("Enter new title:");
        const description = prompt("Enter new description:");
        const targetAmount = prompt("Enter new target amount:");
        const deadline = prompt("Enter new deadline (YYYY-MM-DD):");

        if (!title || !description || !targetAmount || !deadline) {
            alert("All fields are required to update the goal.");
            return;
        }

        const updatedGoal = {
            title: title,
            description: description,
            targetAmount: parseFloat(targetAmount),
            deadline: deadline
        };

        console.log("Updating goal with ID:", goalId);

        axios.put(`https://demo-api-skills.vercel.app/api/FinanceManager/goals/${goalId}`, updatedGoal)
            .then(response => {
                console.log("Goal updated successfully:", response.data);
                alert("Goal updated successfully!");

                // Update the goal row in the table with new values
                const rowToUpdate = event.target.closest('tr');
                rowToUpdate.querySelector('td:nth-child(1)').textContent = updatedGoal.title;
                rowToUpdate.querySelector('td:nth-child(2)').textContent = updatedGoal.targetAmount;
                rowToUpdate.querySelector('td:nth-child(3)').textContent = updatedGoal.description;
                rowToUpdate.querySelector('td:nth-child(4)').textContent = new Date(updatedGoal.deadline).toLocaleDateString('en-US');
            })
            .catch(error => {
                console.error("Error updating goal:", error);

                if (error.response) {
                    alert("Error updating goal: " + error.response.data.error || "Unknown error");
                } else if (error.request) {
                    alert("Error updating goal: No response from server");
                } else {
                    alert("Error updating goal: " + error.message);
                }
            });
    }
});
