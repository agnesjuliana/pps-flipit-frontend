# FlipIt - Flashcard Learning Application

A modern web-based flashcard application built with Next.js that helps users study and learn effectively through interactive flashcards, folders, quizzes, and streak tracking.

## ✨ Features

- 📚 **Create & Manage Flashcards** - Create and organize flashcards into folders
- 🎯 **Quiz Mode** - Test your knowledge with interactive quizzes
- 🔥 **Streak Tracking** - Keep track of your daily study streaks
- 👥 **Leaderboard** - Compete with other users and see global rankings
- 📊 **Activity Tracking** - Monitor your learning progress and statistics
- 👤 **User Profiles** - Manage your account and view personal stats
- 🔐 **Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- 🚀 **Next.js 13** (App Router) with React 18
- ⛓️ **TypeScript** - For type-safe development
- 🎨 **TailwindCSS** - Modern utility-first CSS framework
- 🎭 **Material-UI (MUI)** - Component library
- 📦 **pnpm** - Fast package manager
- 🏎️ **Turbo** - Monorepo build tool

## 📋 Developer Tools

- ✅ **ESLint** - Code linting
- 🎀 **Prettier** - Code formatting
- 🐕 **Husky** - Git hooks
- 📝 **CommitLint** - Conventional commits
- 🔄 **Renovate** - Automated dependency updates

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 10.22.0+ (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd flipit-frontend
```

2. Install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
pnpm build
pnpm start
```

### Other Useful Commands

- **Linting & Formatting:**
  ```bash
  pnpm lint           # Run ESLint
  pnpm lint:fix       # Fix linting issues
  pnpm format         # Format code with Prettier
  ```

- **Type Checking:**
  ```bash
  pnpm type-check     # Check TypeScript types
  ```

- **Turbo Build:**
  ```bash
  pnpm build:turbo    # Build with Turbo for faster builds
  pnpm check:turbo    # Lint and type-check with Turbo
  ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── api/            # API routes for backend integration
│   ├── app/            # Main app pages (dashboard)
│   ├── login/          # Login page
│   ├── registration/   # Registration page
│   └── ...
├── lib/                # Utilities and reusable code
│   ├── components/     # Reusable React components
│   ├── layout/         # Layout components
│   ├── styles/         # Global styles and utilities
│   └── types/          # TypeScript type definitions
└── middleware.ts       # Next.js middleware
```

## 🔗 API Endpoints

The application connects to several API endpoints:

- **Auth** - User authentication and login
- **Flashcard** - Create, read, update, delete flashcards
- **Folder** - Manage flashcard folders
- **Quiz/Play** - Quiz functionality
- **Streak** - Streak tracking
- **Leaderboard** - User rankings

## 🎯 Key Pages

- `/` - Home/Dashboard
- `/login` - User login
- `/registration` - User registration
- `/home/create-flashcard` - Create new flashcards
- `/home/create-folder` - Create new folders
- `/flashcard/[id]` - View flashcard
- `/quiz/[id]` - Take a quiz
- `/folder/[id]` - View folder contents
- `/leaderboard` - Global rankings
- `/profile` - User profile
- `/activity` - Activity history
- `/streak-tracker` - Streak tracking

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Material-UI Documentation](https://mui.com)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
