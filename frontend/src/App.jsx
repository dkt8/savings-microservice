import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/products/ProductListPage";
import CreateProductPage from "./pages/products/CreateProductPage";
import OpenAccountPage from "./pages/accounts/OpenAccountPage";
import AccountListPage from "./pages/accounts/AccountListPage";
import AccountDetailPage from "./pages/accounts/AccountDetailPage";
import ReadmePage from "./pages/ReadmePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/create" element={<CreateProductPage />} />
            <Route path="accounts" element={<AccountListPage />} />
            <Route path="accounts/open" element={<OpenAccountPage />} />
            <Route path="accounts/:id" element={<AccountDetailPage />} />
            <Route path="readme" element={<ReadmePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

