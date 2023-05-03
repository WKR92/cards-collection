"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface IReactQueryWrapper {
  children: React.ReactNode;
}

const ReactQueryWrapper = ({ children }: IReactQueryWrapper) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ToastContainer />
  </QueryClientProvider>
);

export default ReactQueryWrapper;
