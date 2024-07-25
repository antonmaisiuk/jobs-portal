// app/layout.tsx
import React from 'react';
import './globals.css'; // Импорт стилей Tailwind CSS

interface LayoutProps {
  children: React.ReactNode; // Дети, которые будут отображаться внутри макета
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
    <head>
      <title>Job App</title>
      <meta name="description" content="Find your next job here!" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body className="bg-gray-50 text-gray-800">
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <a href="/" className="text-lg font-semibold">Job App</a>
        <ul className="flex space-x-3">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          {/* Добавьте другие ссылки навигации при необходимости */}
        </ul>
      </nav>
    </header>
    <main className="container mx-auto p-4">
      {children}
    </main>
    <footer className="bg-gray-200 text-gray-600 p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Job App</p>
    </footer>
    </body>
    </html>
  );
}
