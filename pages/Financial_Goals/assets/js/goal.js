document.addEventListener("DOMContentLoaded", function () {
    const goalForm = document.getElementById("goal-form");
    const tbody = document.querySelector('.goal-table tbody');
    const userId = localStorage.getItem("id");

    if (!userId) {
        alert("User ID is missing. Please log in again.");
        return;
    }

    // Fetch goals from API 
    function fetchGoalsFromAPI() {
        axios.get(`https://demo-api-skills.vercel.app/api/FinanceManager/goals/user/${userId}`)
            .then(response => {
                const goals = response.data || [];
                localStorage.setItem("goals", JSON.stringify(goals));
                displayGoals(goals);
            })
            .catch(error => {
                console.error("Error fetching goals from API:", error);
            });
    }

    function loadGoals() {
            fetchGoalsFromAPI();
    }

    // Function to display goals in the table
    function displayGoals(goals) {
        tbody.innerHTML = "";
        goals.forEach(addGoalToTable);
    }

    // Function to add a goal to the table
    function addGoalToTable(goal) {
        const row = document.createElement('tr');
        row.setAttribute('data-goal-id', goal.id);

        row.innerHTML = `
            <td>${goal.title}</td>
            <td>${goal.targetAmount}</td>
            <td>${goal.description}</td>
            <td>${new Date(goal.deadline).toLocaleDateString('en-US')}</td>
            <td>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    }

    // Handle form submission
    goalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("goal-title").value;
        const description = document.getElementById("goal-description").value;
        const targetAmount = document.getElementById("goal-target").value;
        const deadline = document.getElementById("goal-deadline").value;

        if (!title || !description || !targetAmount || !deadline) {
            alert("All fields are required!");
            return;
        }

        const goalData = {
            title,
            description,
            targetAmount,
            deadline,
            userId
        };

        axios.post('https://demo-api-skills.vercel.app/api/FinanceManager/goals', goalData)
            .then(response => {
                const newGoal = response.data;
                const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
                storedGoals.push(newGoal);
                localStorage.setItem("goals", JSON.stringify(storedGoals));
                addGoalToTable(newGoal);
                alert("Goal created successfully!");
            })
            .catch(error => {
                console.error("Error creating goal:", error);
                alert("Error creating goal!");
            });
    });

    // Event delegation for updating and deleting goals
    tbody.addEventListener("click", function (event) {
        const row = event.target.closest("tr");
        const goalId = row.getAttribute("data-goal-id");

        if (event.target.classList.contains("delete-btn")) {
            if (!confirm("Are you sure you want to delete this goal?")) return;

            axios.delete(`https://demo-api-skills.vercel.app/api/FinanceManager/goals/${goalId}`)
                .then(() => {
                    const storedGoals = JSON.parse(localStorage.getItem("goals")).filter(goal => goal.id !== goalId);
                    localStorage.setItem("goals", JSON.stringify(storedGoals));
                    row.remove();
                    alert("Goal deleted successfully!");
                })
                .catch(error => {
                    console.error("Error deleting goal:", error);
                    alert("Error deleting goal!");
                });
        }

        if (event.target.classList.contains("update-btn")) {
            const updatedTitle = prompt("Enter new title:", row.cells[0].textContent);
            const updatedTargetAmount = prompt("Enter new target amount:", row.cells[1].textContent);
            const updatedDescription = prompt("Enter new description:", row.cells[2].textContent);
            const updatedDeadline = prompt("Enter new deadline (YYYY-MM-DD):", row.cells[3].textContent);

            if (!updatedTitle || !updatedTargetAmount || !updatedDescription || !updatedDeadline) {
                alert("All fields are required to update the goal.");
                return;
            }

            const updatedGoal = {
                title: updatedTitle,
                targetAmount: updatedTargetAmount,
                description: updatedDescription,
                deadline: updatedDeadline
            };

            axios.put(`https://demo-api-skills.vercel.app/api/FinanceManager/goals/${goalId}`, updatedGoal)
                .then(() => {
                    // Update the goal data in localStorage immediately
                    const storedGoals = JSON.parse(localStorage.getItem("goals")).map(goal =>
                        goal.id === goalId ? { ...goal, ...updatedGoal } : goal
                    );
                    localStorage.setItem("goals", JSON.stringify(storedGoals));

                    // Update the goal row in the table immediately without reloading
                    row.cells[0].textContent = updatedGoal.title;
                    row.cells[1].textContent = updatedGoal.targetAmount;
                    row.cells[2].textContent = updatedGoal.description;
                    row.cells[3].textContent = new Date(updatedGoal.deadline).toLocaleDateString('en-US');
                    
                    alert("Goal updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating goal:", error);
                    alert("Error updating goal!");
                });
        }
    });

    loadGoals();
});
