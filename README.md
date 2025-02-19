
# Blood Aid

## Live Site

🔗 [Blood Aid Live Site](https://blood-aid-by-alifa.web.app)  
🔗 [Blood Aid Server GitHub](https://github.com/alifa-ara-heya/blood-aid-server)

---

## Admin Access

- **Email:** bloodadmin@admin.com  
- **Password:** Abc@123

---

## Purpose

Blood Aid is a user-friendly platform designed to connect blood donors with recipients in need. It streamlines the donation process while promoting a safe and efficient blood donation network.

---

## Key Features

1. **User Registration & Authentication**  
2. **Role Management (Admin, Volunteer, Donor)**  
3. **Donation Requests**  
4. **Search Functionality**  
5. **Dynamic Dashboard**  
6. **Content Management**  
7. **Responsive Design**  
8. **Pagination & Filtering**  
9. **Payment Integration**  
10. **Notifications**

---

## Technologies Used

- **Frontend:** React.js, React Router, React Query, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Other Tools:** Firebase, Stripe, React Hook Form, Axios, SweetAlert2  

---

## Dependencies Overview

### Core
- **React.js**: Frontend framework for UI development  
- **React Router**: Client-side routing  
- **React Query**: Data fetching and caching  

### Backend & Database
- **Node.js**: Server-side JavaScript runtime  
- **MongoDB**: NoSQL database for data storage  
- **Axios**: API requests  

### UI/UX & Animations
- **Tailwind CSS**: Styling framework  
- **AOS**: Scroll animations  
- **Lottie-React**: Animation rendering  

### Authentication & Payments
- **Firebase**: Authentication and hosting  
- **Stripe**: Payment processing  

### Forms & Content Management
- **React Hook Form**: Form validation and management  
- **Jodit React**: WYSIWYG rich text editor  

### Utilities
- **SweetAlert2**: User notifications  
- **Prop Types**: Type-checking for React props  

---

## How to Run the Project Locally

### Prerequisites
- **Node.js** (v16+), **npm** or **yarn**, **Git**

### Steps
1. Clone the repositories:
   - Client: `git clone https://github.com/alifa-ara-heya/blood-aid-client.git`  
   - Server: `git clone https://github.com/alifa-ara-heya/blood-aid-server.git`  

2. Navigate to each directory and install dependencies:  
   ```bash
   npm install
   ```

3. Set up environment variables:
   - **Client**: Add Firebase configuration to `.env` in the client directory.  
   - **Server**: Add `PORT`, `MONGO_URI`, and `STRIPE_SECRET_KEY` to `.env` in the server directory.  

4. Start the servers:
   - Backend: Run `npm start` in the server directory (default: `http://localhost:5000`).  
   - Frontend: Run `npm start` in the client directory (default: `http://localhost:3000`).  

5. Log in as Admin:  
   - **Email:** bloodadmin@admin.com  
   - **Password:** Abc@123  
