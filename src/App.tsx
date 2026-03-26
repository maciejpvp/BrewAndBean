import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import { Navbar } from './components/navbar/Navbar';
import { CheckoutNavbar } from './components/navbar/CheckoutNavbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { getAuthenticatedUserProfile } from './services/authService';
import { useUserStore } from './store/useUserStore';
import { useThemeStore } from './store/useThemeStore';
import OurStoryPage from './pages/OurStoryPage';
import BrewGuides from './pages/BrewGuides';
import { Footer } from './components/Footer';
import RoastsPage from './pages/RoastsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './utils/ProtectedRoute';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthenticatedUserProfile()
      .then((profile) => {
        if (profile) setUser(profile);
        else clearUser();
      })
      .catch(() => clearUser())
      .finally(() => setLoading(false));
  }, [setUser, clearUser]);

  return (
    <Routes>
      {/* Auth routes — no navbar */}
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute requiredGroup="admin" isLoading={loading} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

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
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/our-story" element={<OurStoryPage />} />
                <Route path="/brew-guides" element={<BrewGuides />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route path="/roasts" element={<RoastsPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default function App() {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}