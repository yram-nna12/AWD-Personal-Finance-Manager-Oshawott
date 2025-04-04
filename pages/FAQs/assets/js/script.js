document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".faq-category");
    const faqContainer = document.getElementById("faq-list");

    // Predefined questions for each category
    const faqData = {
        general: [
            { question: "HOW THIS APP WORKS?", answer: "The app helps you manage your finances efficiently by tracking your income expense and overall balance. It let's you manage, customize your goals show it it changes over the years or even months and days" },
            { question: "CAN I EDIT OR DELETE TRANSACTION?", answer: "Yes, we use top-notch encryption methods." },
            { question: "IS THIS APP FOR FREE?", answer: "Yes, there is a free version available." },
            { question: "CAN I GET FINANCIAL GOAL", answer: "Yes, as you created your account you can customize your financial goal without hassle" },
        ],
        financial: [
            { question: "CAN I GET FINANCIAL GOALS?", answer: "Yes, you can track your financial goals with our planner." },
            { question: "HOW CAN I TRACK MY EXPENSE?", answer: "You can track your expenses using our built-in expense tracker, which categorizes and visualizes your spending." },
            { question: "CAN I LINK MY BANK ACCOUNT TO THIS APP?", answer: "No, this app does not support direct bank account linking. However, you can manually input transactions." },
            { question: "DOES THE APP SUPPORT MULTIPLE CURRENCIES?", answer: "Yes, you can switch between different currencies in the settings." },
            { question: "HOW CAN I SET A BUDGET?", answer: "Go to the Budget section and set limits for different spending categories." },
        ],
        security: [
            { question: "HOW SECURE IS MY DATA?", answer: "We implement advanced security protocols." },
            { question: "IS MY FINANCIAL DATA SECURED?", answer: "Yes, we use top-notch encryption methods." },
            { question: "WHAT HAPPENS IF I LOSE MY DEVICE?", answer: "Yes, you can restore data from backups." },
            { question: "WHAT HAPPENS IF I LOSE MY DEVICE?", answer: "You can log in from another device." },  
        ],
        account: [
            { question: "CAN I DELETE MY ACCOUNT?", answer: "Yes, you can request account deletion in the settings under Account Management." },
            { question: "CAN I USE THE APP WITHOUT AN ACCOUNT?", answer: "No, an account is required to access all features and securely store your data." },
            { question: "IS THERE ANY PERSONALIZATION IN MY ACCOUNT?", answer: "No, there are no personalization features available." },
            { question: "HOW DO I RESET MY PASSWORD?", answer: " Click on Forgot Password on the login screen and follow the instructions sent to your email." },
        ],
    };

    // Function to update FAQ list based on selected category
    function updateFAQ(category) {
        faqContainer.innerHTML = ""; // Clear current FAQ
        faqData[category].forEach((item) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");
            faqItem.innerHTML = `
                <button class="faq-question">${item.question}</button>
                <div class="faq-answer" style="display: none;">${item.answer}</div>
            `;
            faqContainer.appendChild(faqItem);

            // Toggle answer visibility
            faqItem.querySelector(".faq-question").addEventListener("click", function () {
                const answer = this.nextElementSibling;
                answer.style.display = answer.style.display === "block" ? "none" : "block";
            });
        });
    }

    // Add click event to category buttons
    categories.forEach((category) => {
        category.addEventListener("click", function () {
            categories.forEach((btn) => btn.classList.remove("active")); // Remove active state
            this.classList.add("active"); // Set active state
            const categoryType = this.getAttribute("data-category");
            updateFAQ(categoryType);
        });
    });

    // Load default FAQ category (General)
    updateFAQ("general");
});

document.addEventListener("DOMContentLoaded", function () {
    // Ensure EmailJS is loaded before initialization
    if (typeof emailjs !== "undefined") {
        emailjs.init("GJ-Ehj5DNYU9HH385"); // Replace with your EmailJS Public Key
    } else {
        console.error("EmailJS not loaded");
    }

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const serviceID = "service_80odfld";  // Replace with your Service ID
        const templateID = "template_3pmiqcs"; // Replace with your Template ID

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        emailjs.send(serviceID, templateID, params)
            .then(response => {
                document.getElementById("status").innerText = "Message Sent Successfully!";
                document.getElementById("status").style.color = "green";
                document.getElementById("contact-form").reset();
            })
            .catch(error => {
                document.getElementById("status").innerText = "Failed to send message. Try again!";
                document.getElementById("status").style.color = "red";
                console.error("EmailJS Error:", error);
            });
    });
});


