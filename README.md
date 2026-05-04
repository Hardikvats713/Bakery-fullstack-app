# 🥐 Sweet Crumbs Bakery

Sweet Crumbs Bakery is a modern, mobile-first web application designed to offer a seamless and visually appealing bakery ordering experience. Built with a premium, light-themed aesthetic, the app provides full frontend functionality from browsing artisanal baked goods to checking out.

## ✨ Features

- **📱 Mobile-First Design**: Optimized for mobile devices with a smooth, app-like bottom navigation bar.
- **🛍️ Complete Ordering Flow**: Browse categories, filter products, manage cart quantities, and apply promo codes (try `SWEET20`!).
- **💳 Multi-Step Checkout**: A streamlined checkout process including delivery address entry and payment method selection, ending with a success confirmation.
- **❤️ Wishlist Management**: Save your favorite pastries and cakes for later.
- **📜 Order History**: View past orders and easily reorder your favorites.
- **👤 User Profile**: Mock authentication flow (Login/Sign Up) and account management.
- **🎨 Premium UI/UX**: Crafted with beautiful typography (Playfair Display & DM Sans), soft rose accents, and smooth Framer Motion animations.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the new CSS-first `@theme` architecture)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Modular stores for Cart, Wishlist, Auth, Orders, and Filters)
- **Routing**: [React Router v6](https://reactrouter.com/) (with Lazy Loading & Suspense)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hardikvats713/Bakery-fullstack-app.git
   cd Bakery-fullstack-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to see the app in action!

## 📂 Project Structure

```text
src/
├── assets/        # Images, logos, and static assets
├── components/    # Reusable UI components (ProductCard, Layout, etc.)
├── pages/         # Page components (Home, Menu, Cart, Checkout, Profile, Wishlist, etc.)
├── data.ts        # Mock product data and categories
├── store.ts       # Zustand state management stores
├── index.css      # Global styles and Tailwind v4 theme configuration
├── App.tsx        # Routing and lazy loading configuration
└── main.tsx       # Application entry point
```

## 🎨 Design System

- **Primary Color**: Rose (`#E8877A`)
- **Accent Color**: Deep Rose (`#C45E52`)
- **Background**: Cream (`#FDF6EE`)
- **Typography**: 
  - Headings: *Playfair Display*
  - Body: *DM Sans*

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
