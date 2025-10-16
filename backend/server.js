import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./db/mongodb.connection.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

// ✅ Helmet first
app.use(helmet({
    contentSecurityPolicy: false, // Disable Helmet’s default CSP
}));

// ✅ Force remove Render's CSP
app.use((req, res, next) => {
    res.removeHeader("Content-Security-Policy");
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
    );
    next();
});

// ✅ Parsers and cookies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/send-mail", contactRoutes);

// ✅ Static serving
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running ✅ on http://localhost:${PORT}`);
    connectDB();
});
