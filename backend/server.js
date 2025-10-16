// import path from "path";
// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './db/mongodb.connection.js';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

// import authRoutes from './routes/auth.route.js';
// import productRoutes from './routes/product.route.js';
// import contactRoutes from './routes/contact.route.js';

// dotenv.config();

// const PORT = process.env.PORT || 5000
// const app = express();

// console.log({ authRoutes, productRoutes, contactRoutes });

// const __dirname = path.resolve();

// // Increase body size limit to 10mb (or more if needed)
// app.use(express.json({ limit: "10mb" })); //& This helps in parsing json data from the client
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // If using body-parser separately
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// app.use(cookieParser());


// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/send-mail', contactRoutes);

// if (process.env.NODE_ENV === "production") {
//     // Correct path: Go up from /backend, then into /frontend/dist
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     // Correct path for the catch-all route
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
//     });
// }


// app.listen(PORT, () => {
//     console.log(`Server is running ✅ on http://localhost:${PORT}`);
//     connectDB();
// })


import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongodb.connection.js';
import cookieParser from 'cookie-parser';
// ❌ No need to import 'body-parser' separately

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import contactRoutes from './routes/contact.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

// Use Express's built-in parsers. This is all you need.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/send-mail', contactRoutes);

// --- Static file serving for production ---
if (process.env.NODE_ENV === "production") {
    // ✅ Correct path: Join project root (__dirname) with 'frontend/dist'
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // ✅ Correct catch-all route to serve the React app
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running ✅ on http://localhost:${PORT}`);
    connectDB();
})