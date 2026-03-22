import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import coffeeTheme from './theme';
import { Navbar } from './components/navbar/Navbar';
import { CheckoutNavbar } from './components/navbar/CheckoutNavbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { getAuthenticatedUserProfile } from './services/authService';
import { useUserStore } from './store/useUserStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { setUser, clearUser } = useUserStore();
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  useEffect(() => {
    getAuthenticatedUserProfile()
      .then((profile) => {
        if (profile) setUser(profile);
        else clearUser();
      })
      .catch(() => clearUser());
  }, [setUser, clearUser]);

  return (
    <Routes>
      {/* Auth routes — no navbar */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main app routes — with navbar */}
      <Route
        path="/*"
        element={
          <>
            <nav>
              {isCheckout ? <CheckoutNavbar /> : <Navbar />}
            </nav>
            <main>
              <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
          </>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={coffeeTheme}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}