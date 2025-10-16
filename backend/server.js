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

// ✅ Security: Helmet setup (simplified and conflict-free)
app.use(
    helmet({
        crossOriginEmbedderPolicy: false, // disable COEP for compatibility
        originAgentCluster: true,
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "img-src": ["'self'", "https:", "data:", "blob:"],
            },
        },
    })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/send-mail", contactRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "frontend", "dist");
    app.use(express.static(frontendPath));

    // Catch-all route (React Router)
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendPath, "index.html"));
    });
}

// ✅ Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    connectDB();
});
