'use client';

import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Power Fitness - Transform Your Life</title>
        <meta name="description" content="Join the best fitness community and transform your body with our expert trainers" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1E1E1E',
                color: '#fff',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#00FF87',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF4444',
                  secondary: '#fff',
                },
              }, 
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}