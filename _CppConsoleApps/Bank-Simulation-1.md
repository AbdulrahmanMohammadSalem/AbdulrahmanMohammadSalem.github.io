---
title: "Bank Simulation #1"
excerpt: "A full-fledged C++ banking and ATM simulation with real-world features and file-based persistence."
overlay_text: "3rd"
weight: 3
top_project: true
---
---
# Description
This project is a **comprehensive banking simulation system** built entirely in C++ as a console-based application. It is divided into two interconnected programs:
1. **Bank System (Employee-Facing):** Used by bank staff to manage clients, users, transactions, and system settings.
2. **ATM Simulation (Client-Facing):** Used by clients to perform typical banking operations like withdrawals, deposits, transfers, and checking balances.

Both applications share the same underlying storage files to ensure consistent data handling. Together, they simulate a real-world banking ecosystem with both administrative and customer-facing operations.

# Technologies Used
- **C++ (Standard 11/14)** — Core language for implementation.
- **Standard Library Features:**
  - `<fstream>` for file handling.
  - `<vector>` for dynamic data structures.
  - `<iomanip>` for formatted output.
  - `<ctime>` for time/date stamping.
  - `<sstream>` for parsing and formatting.
- **Console-Based UI** with menu-driven navigation.
- **File-Based Persistent Storage** for clients, users, messages, history, and system settings.

# Functionality / Features (High-Level)
## Bank System (Employee-Facing)
- **Client Management:** Add, update, delete, lock/unlock, and search clients.
- **User Management:** Create, update, delete, and manage permissions for employees.
- **Transactions:** Deposit, withdraw, calculate total balances, and review transaction histories.
- **History Tracking:** Full audit trail for every client action (deposits, withdrawals, updates, etc.).
- **Messaging System:** Employees can send and clear messages for clients (viewable at ATM).
- **Settings Management:** Customize tables (fields visibility) and text/background colors.
- **Security Features:** Account locking/unlocking, PIN code management.

## ATM Simulation (Client-Facing)
- **Login System** with PIN-based authentication and limited login trials.
- **Quick Withdraw Options** (pre-set amounts like 20, 50, 100, etc.).
- **Normal Withdraw** (custom amounts with validation).
- **Deposits & Transfers** with balance checks and confirmation prompts.
- **Account History:** Clients can review past transactions.
- **Messaging:** Clients can receive messages from bank staff.
- **Profile Updates:** Change phone number and PIN securely.
- **Balance Inquiry:** Real-time account balance display.
- **Account Lock Handling:** Locked accounts prompt users to contact the bank.

# Implementation Highlights
## File-Based Persistent Storage
Both the Bank System and ATM use **plain text files** (`Clients.txt`, `Users.txt`, `History.txt`, `Messages.txt`, `Settings.txt`) to maintain data consistency.
- Data is serialized with a custom delimiter (`#//#`) for safe parsing.
- Each program has its own **conversion functions** (`convertClientLineToRecord`, `convertClientRecordToLine`, etc.) that transform between human-readable lines and structured `struct`s like `sClient` or `sUser`.
- This design eliminates the need for external databases, while still mimicking how databases store and retrieve structured records.

🔹*Portfolio Value:* Shows mastery of **low-level data persistence and careful structuring** without relying on ORM or external DB tools.

## Client Management & Validation (Bank System)
- Employees can **add, update, delete, search, and lock/unlock** client accounts.
- Input validation is robust — phone numbers, names, and PIN codes are strictly checked for length, numeric count, and formatting.
- Account numbers are checked for **uniqueness** before adding new clients.

🔹*Portfolio Value:* Demonstrates a solid grasp of **input validation, data integrity, and edge-case handling**.

## User Management & Permissions (Bank System Only)
- Employees (users) are stored separately in `Users.txt`.
- Permissions are encoded with **bitmasking techniques**, allowing fine-grained control (e.g., full access vs. partial permissions for client/user management).
- Active user is always tracked, and unauthorized actions trigger **"Access Denied"** screens.

🔹*Portfolio Value:* Highlights understanding of **role-based access control (RBAC)** and encoding permissions efficiently.

## Transactions (Both Programs)
- **ATM:** Clients can deposit, withdraw (quick or normal), and transfer money.
- **Bank System:** Employees can also deposit and withdraw on behalf of clients, plus calculate total balances across all accounts.
- Every transaction updates:
  - **Client balance**
  - **Modification timestamp** (`dateModified`)
  - **History file (`History.txt`)** with the action type (`Deposit`, `Withdraw`, `Transfer`, etc.)

🔹*Portfolio Value:* Shows ability to design **stateful operations with audit trails** and consistent file updates.

## Transaction History & Audit Trail (Both)
- Every client has a dedicated **history log** embedded in `History.txt`.
- Records store date, PIN, name, phone, balance, and **action** type (via `enum enClientUpdateType`).
- Bank employees can pull client histories for auditing.
- Clients themselves can review their transaction history via the ATM.

🔹*Portfolio Value:* Demonstrates **auditing, logging, and accountability** — crucial in financial systems.

## Messaging System (Cross-Program)
- **Bank System:** Employees can send or clear messages tied to specific accounts.
- **ATM:** Clients can read their messages during login sessions. Messages support multi-line input (via `\n` escape handling).
- This simulates real-world bank-to-client communication (e.g., warnings, updates, promotions).

🔹*Portfolio Value:* Shows understanding of **inter-system communication** and multi-program coordination.

## Security Features
- **PIN Code Management:** Clients can change their PIN securely at the ATM.
- **Phone Number Update:** Clients can update their personal info with validation.
- **Account Locking:**
  - Automatic: Account locks after **three consecutive failed login attempts** at the ATM.
  - Manual: Bank employees can lock/unlock accounts through the Bank System.
- **Audit Trail:** All security changes (PIN updates, locks/unlocks) are logged in the history file.

🔹*Portfolio Value:* Reflects thoughtfulness around data protection and fraud prevention, even at a simulation level.

## Customizable System Settings (Bank System)
- Table views (clients/users) can be customized: fields shown/hidden are controlled via bitmask flags.
- Text/background color customization via encoded settings in `Settings.txt`.
- Default settings auto-populate if missing.

🔹*Portfolio Value:* Shows foresight into **configurable systems** and a taste for usability.

## Console UI & Navigation (Both)
- Menu-driven interface with clear headers, separators, and consistent design.
- **ATM:** Focused on user-friendliness, minimal options, and confirmations.
- **Bank System:** More advanced with sub-menus for clients, users, transactions, settings.
- **Operation Cancelation:** Entering `-99` cancels most operations (withdrawals, deposits, searches, etc.), letting users back out without disrupting the system.
- **Confirmation Prompts:** Before critical actions (like withdrawals, deposits, transfers, or deletions), users must explicitly confirm with `[Y] - [N]`.
- **Clear Console Navigation:** Consistent menu-driven flow with screen clearing (`system("cls")`) and pauses for readability.

🔹*Portfolio Value:* While console-based, the UI is thoughtfully crafted to mimic user experience design principles.

# Conclusion
- Built a **two-part banking ecosystem** (Bank System + ATM) sharing the same storage, simulating real-world banking workflows.
- Implemented **file-based persistence** with custom serialization and parsing logic.
- Added robust **client and user management** features, including fine-grained permission control.
- Ensured **transaction integrity** with real-time balance updates and a full audit trail in `History.txt`.
- Integrated a **messaging system** bridging employees and clients.
- Enhanced **security** via PIN changes, account locking, and strict input validation.
- Designed a **customizable console UI** with configurable tables and color settings for usability.

# Screenshots
## Bank System

<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Main-Menu-Screen.png">
  
    <figcaption>Main Menu Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Manage-Clients-Screen.png">
  
    <figcaption>Manage Clients Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Clients-List-Screen.png">
  
    <figcaption>Clients List Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Find-Client-Screen.png">
  
    <figcaption>Find Client Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Change-Background-Color-Screen.png">
  
    <figcaption>Change Background Color Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Update-User-Info-Screen.png">
  
    <figcaption>Update User Info Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/Bank_System/Access-Denied-Screen.png">
  
    <figcaption>Access Denied Screen</figcaption>
  </figure>
</div>

## ATM

<div class="screenshots-grid">
  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/ATM/Client-Login-Screen.png">
  
    <figcaption>Client Login Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/ATM/Main-Menu-Screen.png">
  
    <figcaption>Main Menu Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/ATM/Quick-Withdraw-Screen.png">
  
    <figcaption>Quick Withraw Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/ATM/Transfer-Money-Screen.png">
  
    <figcaption>Transfer Money Screen</figcaption>
  </figure>

  <figure>
    <img src="../../assets/images/screenshots/CppConsoleApps/Bank_Simulation_1/ATM/Account-Locked-Screen.png">
  
    <figcaption>Account Locked Screen</figcaption>
  </figure>
</div>

<div class="lightbox" id="lightbox">
  <span class="close">&times;</span>
  <button class="prev">&#10094;</button>
  <img class="lightbox-image" src="" alt="">
  <button class="next">&#10095;</button>
  <div class="lightbox-caption"></div>
</div>

<script src="../../assets/js/screenshot-image-overlay.js"></script>

# Try the Project
- *You can download the executable files for both Bank System & ATM from [here](https://drive.google.com/uc?export=download&id=1KTkgwjrW3a3Ly92_NBR2AdiXYbREoKY7).*
- *Please note that the default username is `"Admin"`, with the password `"1234"`.*

> Since this application is not digitally signed by a recognized publisher, your system may display a warning before running it. You can safely ignore it and continue.

# Source code
- You can find the source code for:
  - Bank System [here](https://gist.github.com/AbdulrahmanMohammadSalem/1450ca88387f721b828efb958604f3d6).
  - ATM [here](https://gist.github.com/AbdulrahmanMohammadSalem/268c25d851fa0dbc348347e3c5116a85).