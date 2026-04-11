import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { getTheme } from './theme';
import { Navbar } from './components/navbar/Navbar';
import { CheckoutNavbar } from './components/navbar/CheckoutNavbar';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getAuthenticatedUserProfile } from './services/authService';
import { useUserStore } from './store/useUserStore';
import { useThemeStore } from './store/useThemeStore';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './utils/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const EquipmentPage = lazy(() => import('./pages/EquipmentPage').then(m => ({ default: m.EquipmentPage })));
const OurStoryPage = lazy(() => import('./pages/OurStoryPage'));
const BrewGuides = lazy(() => import('./pages/BrewGuides'));
const RoastsPage = lazy(() => import('./pages/RoastsPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AddProductForm = lazy(() => import('./components/AdminDashboard/AddProductForm'));
const InventoryPage = lazy(() => import('./pages/Dashboard/Inventory').then(m => ({ default: m.InventoryPage })));

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
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        {/* Auth routes — no navbar */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute requiredGroup="admin" isLoading={loading} />}>
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<Navigate to="inventory" replace />} />

            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/new" element={<AddProductForm />} />

            <Route path="*" element={<Navigate to="/dashboard/inventory" replace />} />
          </Route>
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
                <Suspense fallback={
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', width: '100%' }}>
                    <CircularProgress />
                  </Box>
                }>
                  <Routes>
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/our-story" element={<OurStoryPage />} />
                    <Route path="/brew-guides" element={<BrewGuides />} />
                    <Route path="/equipment" element={<EquipmentPage />} />
                    <Route path="/roasts" element={<RoastsPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Suspense>
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