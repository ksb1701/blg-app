# blg-app

A modern blog application rebuilt from the ground up. Originally built with a vanilla web stack, this project has been completely migrated to **Next.js** to leverage modern React features, server-side rendering, and dynamic routing.

> **🚧 Work in Progress:** The core application is fully functional! However, it is currently a work in progress as I am actively focusing on performance optimizations, specifically reducing data load times and improving rendering speeds.

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + UI Components
* **Database:** MongoDB (via Mongoose)

## ✨ Features

* **Modern Routing:** Utilizes Next.js App Router for pages like Home, Articles, and About Me.
* **Dynamic Content:** Fetches and renders blog articles dynamically from a MongoDB database.
* **On-Demand Revalidation:** Includes API routes (`/api/revalidate`) to refresh cached data when new content is published.
* **Responsive UI:** Styled cleanly with Tailwind CSS across all device sizes.

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js installed and a MongoDB database cluster set up.

### Installation

1.  Install the project dependencies:
    ```bash
    npm install
    ```

2.  Set up your environment variables. Create a `.env.local` file in the root directory and add your connection string:
    ```env
    MONGODB_URI=your_mongodb_connection_string_here
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to view the app.

## 📂 Project Structure

* `app/` - Application routes (`/`, `/articles`, `/articles/[slug]`, `/about-me`).
* `components/` - Reusable UI elements (Navbar, buttons, inputs, pagination).
* `lib/` - Utility functions and the MongoDB connection instance.
* `models/` - Mongoose database schemas (e.g., `Article.ts`).
