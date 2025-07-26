InvoiceManage 📝

A full-stack, production-ready invoice management platform built from the ground up. This application allows users to sign up, manage their details, and create, send, and track professional invoices. It features magic link authentication, PDF generation, and automated email reminders for a seamless user experience.

✨ Features
Magic Link Authentication: Secure, passwordless login using one-time magic links sent via email.

User Onboarding: A streamlined onboarding process for new users to enter their personal and company details 

Intuitive Dashboard: A clean dashboard displaying key metrics like total revenue, issued invoices, pending payments, and an animated chart.

Full Invoice CRUD:

Create & Edit: A robust, custom form for creating and editing invoices with server-side and client-side validation.

Delete & Mark as Paid: Easily manage the status of invoices.

PDF Generation: Generate professional, high-quality PDF invoices on the fly—not just screenshots.

Automated Emails:

Send invoices directly to clients via custom email templates.

Send one-click payment reminders for overdue invoices.

Performance Optimized: Utilizes modern web features like streaming with React Suspense to ensure a fast user experience on data-heavy pages.

.

💻 Tech Stack
This project uses a modern, end-to-end TypeScript stack:

Framework: Next.js 15
Styling: Tailwind CSS
UI Components: Shadcn UI
ORM: Prisma
Database: PostgreSQL (powered by Neon)
Authentication: Auth.js (NextAuth.js)
Form Validation: Conform & Zod
Email Service: Mailtrap

