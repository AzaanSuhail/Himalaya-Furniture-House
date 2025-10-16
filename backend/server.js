import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongodb.connection.js';
import cookieParser from 'cookie-parser';
// ⭐ IMPORT HELMET HERE ⭐
import helmet from 'helmet';

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

// ------------------------------------------------------------------
// ⭐ CONFIGURATION TO FIX CONTENT SECURITY POLICY ERROR (CSP) ⭐
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// ⭐ CONFIGURATION TO FIX CONTENT SECURITY POLICY ERROR (CSP) ⭐
// ------------------------------------------------------------------

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                // ✅ Allow scripts from self and inline (for React hydration)
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                scriptSrcElem: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],

                // ✅ Allow styles from self and Google Fonts
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                styleSrcElem: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],

                // ✅ Allow fonts from Google Fonts and self
                fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],

                // ✅ Allow images from self and data URIs
                imgSrc: ["'self'", "data:"],

                // ✅ Allow API calls to your own domain
                connectSrc: ["'self'"],

                // ✅ Allow iframes/videos only from self (optional)
                frameSrc: ["'self'"],
            },
        },
    })
);

// ------------------------------------------------------------------
// ⭐ END HELMET CONFIGURATION ⭐
// ------------------------------------------------------------------

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