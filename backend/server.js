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

app.use(
    helmet({
        // Disable the default 'frameguard' to allow embedding if necessary (optional)
        // frameguard: false, 

        contentSecurityPolicy: {
            directives: {
                // Allows resources from your own domain ('self')
                'default-src': ["'self'"],

                // Allows scripts (JS) from your domain
                'script-src': ["'self'"],

                // Allows styles (CSS) from your domain AND Google Fonts
                'style-src': ["'self'", "https://fonts.googleapis.com"],

                // Allows the actual font files from Google's server
                'font-src': ["'self'", "https://fonts.gstatic.com"],

                // Allows images/assets from your domain ('self') and data URIs (e.g., base64 images)
                'img-src': ["'self'", "data:"],

                // You may need to add this if using inline event handlers or styles (less secure)
                // 'script-src-elem': ["'self'", "'unsafe-inline'"],
                // 'style-src-elem': ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
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