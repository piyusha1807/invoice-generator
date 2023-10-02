import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from './App';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import ErrorPage from "./errorPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <InvoiceList/>,
        },
        {
          path: "form",
          element: <InvoiceForm/>,
        },
        {
          path: "form/:formType/:id",
          element: <InvoiceForm/>,
        },
      ]
    },
  ]);

  export default router;
  
  