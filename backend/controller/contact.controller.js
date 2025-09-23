import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Attempting to use email:', process.env.EMAIL_USER);
console.log('Is password loaded?:', !!process.env.EMAIL_PASS ? "Yes" : "NO, IT'S UNDEFINED!");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const STORE_EMAIL = process.env.STORE_EMAIL || EMAIL_USER || 'azaan.suhail@gmail.com';

if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('⚠️ EMAIL_USER or EMAIL_PASS not set. Email sending will fail until these environment variables are configured.');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Verify transporter at startup to reveal auth/network issues early
transporter.verify((error, success) => {
    if (error) {
        console.error('🔴 Nodemailer verification failed:', error);
    } else {
        console.log('✅ Nodemailer is ready to send emails');
    }
});

export const contact = async (req, res) => {
    const { name, contact: phone, address, email } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Missing required fields: name and email are required.' });
    }

    try {
        // 1) Send thank-you email to the visitor
        await transporter.sendMail({
            from: `"Himalaya Furniture House" <${EMAIL_USER}>`,
            to: email,
            subject: `Thanks for getting in touch!`,
            text: `Hi ${name},\n\nWe've got your message! Thanks for your interest in Himalaya Furniture House. We're looking it over and will get back to you soon.\n\nWarmly,\nThe Himalaya Team`,
        });

        // 2) Send notification to store/admin (reply-to visitor email so admin can reply easily)
        await transporter.sendMail({
            from: `"Website Lead" <${EMAIL_USER || 'no-reply@example.com'}>`,
            to: STORE_EMAIL,
            replyTo: email,
            subject: `New Inquiry from ${name}`,
            text: `You have a new contact form submission:\n\nName: ${name}\nContact: ${phone || 'N/A'}\nAddress: ${address || 'N/A'}\nEmail: ${email}`,
        });

        return res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('🔴 Error sending email:', error);

        // For easier backend testing, return the error message in non-production only
        const responseMessage =
            process.env.NODE_ENV === 'production'
                ? 'Failed to send email.'
                : (error && error.message) || String(error);

        return res.status(500).json({ message: responseMessage });
    }
};
