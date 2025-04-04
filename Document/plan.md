# Personal Finance Manager - Project Plan

---

## 1. Persona

**Name:** MonStra 
**Age:** 30 years old  
**Background:**  
* Always researching the best financial opportunities and making wise money choices.  
* Seeking to optimize budgeting, savings, and expense tracking.

**Key Characteristics:**  
* Financially Savvy
* Expense Tracking Expert  
* Goal-Oriented  
* Adaptive & Responsive   
* Adaptive & Responsive  

---

## 2. UX Flow

1. **User Authentication & Management:**  
   - **Login/Registration:** Users sign up using their email, name, and password to create an account. Users log in using their email to access their dashboard.
   - **Profile Management:** Users can update their name and other details in the profile settings.
   - **Account Deletion:** Users can delete their account, which removes all associated data.

2. **Home Dashboard:**  
   - **Financial Summary:** Displays current balance, total income, and total expenses at a glance.
   - **Recent Transactions:** A quick view of the latest income and expense entries.
   - **Navigation Menu:** Quick access to User Account, Financial Goals & Tracker,FAQ and Account Settings.

3. **Income & Expense Tracking:**  
   - **Add Transaction:** Users can log a new income or expense by providing amount, category/source, date, and description.
   - **Transaction List:** Displays all recorded transactions with filtering options for date, category, and amount.
   - **Edit Transaction:** Users can update transaction details such as amount, category, or date.
   - **Delete Transaction:** Users can remove an unwanted transaction from their records.

4. **Financial Goal Management:**  
   - **Create Goal:** Users set financial goals by defining a title, target amount, deadline, and description.
   - **Update Goal:** Users can modify their financial goal details if needed.
   - **Delete Goal:** Users can remove a financial goal from their list.
---

## 3. Layout and Navigation

* **Navigation Drawer / Bottom Navigation Bar:**  
  + **Home:** Showcase Monstra features and summary details.
  + **Home(User Logined):** Show summaries of users expense, income & current balance.
  + **Sign Up:** Allows new users to create an account to start managing their finances.
  + **Log In:** Enables existing users to access their financial management account.
  + **Profile:** User account details
  + **Log In:** Enables existing users to access their financial management account.
  + **Financial Goal:** Helps users set, track, and manage their financial goals.
  + **Financial Tracker:** Helps users set, track, and manage their financials.
  + **Settings:**  Allows users to edit name or delete their account.
  + **FAQs:**  Provides answers to common user questions about the platform and allows users to reach out for further support.

* **Screen Layouts:**  
  + **User Home Screen:**  Table-based layout displaying recent transactions with a financial summary on the side.
  + **User Accou Screen:** List-based layout displaying user details with an editable bio section.
  + **Financial Goal Screen:** Split-screen layout with a form on the left for goal input Land a table on the right displaying saved goals.
  + **Financial Tracker Screen:**
  + **Log In Screen:** Form-based layout with a left-aligned input section on a dark green background with geometric shapes. Includes email and password fields, a password visibility toggle, a login button, and a sign-up link.
  + **Sign Up Screen:** Similar to the login page but with additional first and last name fields in a two-column format. Features email, password, confirm password fields, visibility toggles, a sign-up button, and a login link.
  + **Settings Screen:** bold title and two-column input fields for first and last names. Includes "Update Account" and "Delete Account" buttons, with the latter featuring an icon for clarity.


* **Consistent Navigation:**  
  + Clear back navigation and intuitive UI components for ease of use.
  + Responsive design with a mobile-friendly layout that adapts to different screen sizes.

---

## 4. Color Scheme and Visual Style

* **Primary Colors:**  
  + **Dark Green:** Represents professionalism, stability, and a modern aesthetic.
  + **Olive Green:** symbolizing growth and interaction.

* **Accent Colors:**  
  + **Muted Green Tones:** Maintain a cohesive and minimalistic design.
  + **Soft Neutrals:**  Applied for text and subtle UI elements to ensure readability.elements.

* **Visual Style:**  
  + **Minimalist and Modern:** Clean, structured layout with dark-themed contrast and smooth typography.
  + **Consistent Iconography:** Simple, clear icons for navigation and actions like password visibility and account deletion.
  + **User-Friendly:** Focus on clear, straightforward design to provide a seamless and intuitive user experience.
  + **User-Centered Design:** Focuses on intuitive form fields, responsive elements, and easy interaction across devices.

---

## 5. Entity Relational Database (ERD)

**Key Entities:**

1. **User**
   - `user_id` (Primary Key)
   - `name`

   - `email`

   - `name`

   - `password_hash`

   - `profile_image_url`

   - `data_joined`

2. **Transactions**
   - `user_id` (Primary Key - User)
   - `type` (income / expense)

   - `amount`

   - `category` (e.g., salary, groceries, entertainment)

   - `source`

   - `descriptions` (Array of steps)

   - `date` (Boolean)

   - `timestamp`

3. **Financial Goal**
   - `user_id` (Primary Key)

   - `title`

   - `target_amount`

   - `deadline`

   - `description`

   - `timestamp`

---

## 6. Dataflow

1. **User Registration:**
   - **User Action:** fill up details (email, name & password) using the submission form.
   - **Dataflow:**  User enters email, name, and password → API creates a new account → Returns user object.

2. **User Login & Retrieval:**
   - **User Action:** Enter email and password using the submission form.
   - **Dataflow:**  User enters email & password → checked if it exist → (exist) API retrieves profile data and continue to log in, (not exist) returns to sign up

3. **Profile Update:**
   - **Dataflow:**  User updates name → API modifies profile in database → Returns updated user object.

4. **Account Deletion:**
   - **Dataflow:**  User confirms deletion → API removes user data → Returns success message → go back to log in page

5. **Financial Goals Management:**
   - **Dataflow:**  User enters goal details (title, target amount, deadline, description) → API stores goal → Returns created goal object → show on table

6. **Financial Goals Management:**
   - **Dataflow:**
      - User enters goal details (title, target amount, deadline, description) → API stores goal → Returns created goal object.
      - API fetches all goals for user → UI displays goal list.
      - User modifies goal details → API updates goal → Returns updated goal object.
      - User deletes goal → API removes goal from database → Returns success message.

7. **Income & Expense Tracking:**
   - **Dataflow:**
      - User enters expense details (amount, category, date, description) → API stores expense → Returns expense object.
      -  User logs income (amount, source, date, description) → API stores income → Returns income object.
      - API fetches transactions → UI displays income and expenses.
      - User modifies transaction → API updates transaction → Returns updated transaction.
      - User deletes transaction → API removes from database → Returns success message.

8. **Sorting & Analysis:**
 - **Dataflow:**
      - User selects sorting filters → API retrieves sorted transactions → UI updates display.
      - API calculates totals (income, expenses, savings) → UI displays financial summary.


---