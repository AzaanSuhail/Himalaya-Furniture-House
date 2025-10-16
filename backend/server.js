import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Keeping helmet for other security headers (like X-Frame-Options)
import connectDB from "./db/mongodb.connection.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

// ----------------------------------------------------
// ✅ CORRECTED CSP DEFINITION
// Define a targeted CSP that allows all necessary domains.
// This is more secure and reliable than the overly permissive "default-src *"
const CORRECTED_CSP_VALUE = `
    default-src 'self';
    script-src 'self';
    // Allow Google Fonts stylesheet API and 'unsafe-inline' for build system styles
    style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
    // Allow Google Fonts assets (the actual font files)
    font-src 'self' https://fonts.gstatic.com; 
    // Allow your own images and inline data: URIs (used for small icons/logos)
    img-src 'self' data:;
`;
const CSP_HEADER = CORRECTED_CSP_VALUE.replace(/\s+/g, ' ').trim();

// Function to apply the CSP header
const setCspHeader = (req, res, next) => {
    // We remove the header first in case Render or another middleware set a default
    res.removeHeader("Content-Security-Policy");
    res.setHeader("Content-Security-Policy", CSP_HEADER);
    next();
};

// ----------------------------------------------------

// ✅ Helmet - Still useful for other security headers (referrer, no-sniff, etc.)
// We disable the CSP part of Helmet so we can set our own reliable header.
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

// ✅ Middleware to apply the Corrected CSP on all requests
app.use(setCspHeader);

// ✅ Parsers and cookies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/send-mail", contactRoutes);

// ✅ Static frontend
if (process.env.NODE_ENV === "production") {
    // Apply CSP when serving static files
    app.use(express.static(path.join(__dirname, "frontend", "dist"), {
        setHeaders: (res, path, stat) => {
            // Overrides default static file server headers if needed
            res.setHeader('Content-Security-Policy', CSP_HEADER);
        }
    }));

    // ✅ Catch-all route for SPA history/routing (Index.html)
    app.get("*", (req, res, next) => {
        // Set the CSP one last time before sending index.html
        res.setHeader('Content-Security-Policy', CSP_HEADER);
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// ✅ Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    connectDB();
});
