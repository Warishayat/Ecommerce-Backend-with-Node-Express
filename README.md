## 🛍️ Ecommerce Backend — Node.js + Express + MongoDB

A complete **Ecommerce Backend API** built using **Node.js**, **Express**, and **MongoDB**, featuring **Cloudinary image uploads**, **JWT authentication**, and a **cart system with automatic price calculation**.
This serves as a solid backend foundation for an ecommerce platform with scalability and clean architecture.

---

### 🚀 Live API

**🌐 Deployed Link:** (https://ecommerce-backend-with-node-express.onrender.com)

---

## 🧩 Features

✅ User Signup/Login (JWT Auth)
✅ Role-based Access (Admin/User)
✅ Product CRUD with Image Upload (Cloudinary)
✅ Shopping Cart with Auto Total Calculation
✅ Contact/Message System for Users
✅ Secure Password Hashing (bcrypt)
✅ Environment Variables with dotenv
✅ Modular Folder Structure for Scalability

---

## 🏗️ Tech Stack

| Category              | Technology           |
| --------------------- | -------------------- |
| **Backend Framework** | Node.js + Express.js |
| **Database**          | MongoDB + Mongoose   |
| **Authentication**    | JSON Web Token (JWT) |
| **File Uploads**      | Multer + Cloudinary  |
| **Security**          | bcrypt, dotenv       |
| **Server Hosting**    | Render               |

---

## 📁 Folder Structure

```
Ecommerce-Backend/
│
├── Config/
│   ├── cloudinary.js
│
├── Controller/
│   ├── AuthController.js
│   ├── ProductController.js
│   ├── CartController.js
│   ├── MessageController.js
│
├── Middleware/
│   ├── Authentication.js
│   ├── Upload.js
│   ├── PriceCalculate.js
│
├── Models/
│   ├── User.js
│   ├── Product-Listing.js
│   ├── CartSchema.js
│   ├── Message.js
│
├── Router/
│   ├── AuthRouter.js
│   ├── ProductRouter.js
│   ├── CartRouter.js
│   ├── MessageRouter.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in your root directory and add the following:

```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧠 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/signup` | Register new user       |
| POST   | `/auth/login`  | Login and get JWT token |

---

### 🛒 Product Routes

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| POST   | `/products/createProduct` | Create a product (Admin only) |
| GET    | `/products/all`           | Get all products              |
| GET    | `/products/:id`           | Get product by ID             |
| PUT    | `/products/update/:id`    | Update a product (Admin only) |
| DELETE | `/products/delete/:id`    | Delete a product (Admin only) |

---

### 🛍️ Cart Routes

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/cart/add`               | Add product to cart       |
| GET    | `/cart`                   | Get user cart             |
| PUT    | `/cart/update`            | Update cart item quantity |
| DELETE | `/cart/delete/:productId` | Remove product from cart  |

---

### 💬 Message Routes

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/messages/send` | Send a message to admin       |
| GET    | `/messages/all`  | Get all messages (Admin only) |

---

## 🧪 Testing with Postman

You can test the API using [Postman](https://www.postman.com/):

1. **Signup/Login** to get a JWT token
2. Use **Bearer Token** authentication in headers
3. For image upload → use **form-data**:

   * `key`: `image` (type: File)
   * Add other fields like `title`, `price`, `description`, etc.

**Base URL:**

```
https://ecommerce-backend-with-node-express.onrender.com
```

Example:

```
GET https://ecommerce-backend-with-node-express.onrender.com/products/all
```

---

## 🧰 Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `npm install`   | Install dependencies      |
| `npm run dev`   | Start server with nodemon |
| `node index.js` | Start production server   |

---

## ☁️ Deployment (CI/CD with Render)

This project is deployed using **Render** with automatic GitHub CI/CD setup.

### 🧱 Build Settings

* **Build Command:** `npm install`
* **Start Command:** `node index.js`
* **Instance Type:** Free (sufficient for small projects)

### 🔁 Auto Deploy

Every time you **push to GitHub**, Render will:

1. Fetch latest code
2. Rebuild the app
3. Auto-deploy to the live URL

---

## 👤 Author

**Waris Hayat**
💻 GitHub: [@Warishayat](https://github.com/Warishayat)
🌐 Live API: (https://ecommerce-backend-with-node-express.onrender.com)

---

## ⭐ Contribute

Contributions are welcome!

* Fork this repository
* Create a new branch (`feature/your-feature`)
* Commit your changes
* Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License** — you’re free to use and modify it.

---

