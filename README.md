
# 🚌 Linotix - Bus Ticket Management System

<p align="center">
  <img src="https://img.shields.io/badge/Status-Completed-green?style=for-the-badge" alt="Status"/>
  <a href="https://github.com/Wasee-Ur-Rehman/Ticket-Management-System-Linotix-/issues">
    <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" alt="Contributions Welcome"/>
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"/>
</p>

> A full-stack MERN application for booking, managing, and tracking local bus tickets with an integrated email confirmation system.

**Linotix** is a digital platform designed to modernize the local bus ticketing process. It allows passengers to easily book tickets for various routes, and provides administrators with a powerful dashboard to manage bookings, users, and services. Say goodbye to paper tickets and long queues!

---

## ✨ Key Features

The system offers a tailored experience for both passengers and administrators.

<details>
<summary>👤 <b>Passenger Features</b></summary>

-   🔑 **Secure Account:** Simple and secure registration and login for a personalized experience.
-   🎟️ **Book a Ticket:** Easily select a bus service (product) and book a new ticket.
-   📧 **Email Confirmation:** Receive an instant confirmation and e-ticket in your email upon successful booking.
-   📊 **My Tickets Dashboard:** View a history of all your booked tickets and check their status (e.g., New, Confirmed, Used).
-   💬 **Ticket Notes:** Add notes or special requests to your booking for the operator to see.
-   🔐 **Profile Management:** Keep your personal information up-to-date.

</details>

<details>
<summary>⚙️ <b>Admin / Operator Features</b></summary>

-   👑 **Admin Dashboard:** A central hub to view all bookings, users, and system activity.
-   🎫 **Booking Management:** View all tickets booked by passengers, check their details, and update their status.
-   👥 **User Management:** Manage all registered passenger accounts from a single interface.
-   📈 **Service Oversight:** Easily see which bus routes are popular and manage the passenger list for each service.

</details>

---

## 🛠️ Tech Stack

This project is built using the **MERN stack** for a robust and scalable solution.

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Authentication & Services
![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)![Bcrypt](https://img.shields.io/badge/Bcrypt-6242F5?style=for-the-badge&logo=bcrypt&logoColor=white)![NodeMailer](https://img.shields.io/badge/NodeMailer-44A6D8?style=for-the-badge&logo=nodemailer&logoColor=white)

---

## ⚙️ Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites
Make sure you have the following installed on your machine:
-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en/) (v16 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Wasee-Ur-Rehman/Ticket-Management-System-Linotix-.git
    cd Ticket-Management-System-Linotix-
    ```
2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```
4.  **Set up environment variables:**
    -   In the `backend` directory, create a `.env` file.
    -   Add the necessary environment variables (including credentials for your email service if you plan to use the mailing feature):
        ```env
        NODE_ENV=development
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

5.  **Run the application:**
    -   You can run both the client and server concurrently from the root directory.
    ```sh
    npm run dev
    ```

The application should now be running, with the frontend on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License
 <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"/>
