import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongodb.connection.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.route.js';
import contactRoutes from './routes/contact.route.js';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

// Increase body size limit to 10mb (or more if needed)
app.use(express.json({ limit: "10mb" })); //& This helps in parsing json data from the client
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// If using body-parser separately
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/send-mail', contactRoutes);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


app.listen(PORT, () => {
    console.log(`Server is running ✅ on http://localhost:${PORT}`);
    connectDB();
})

