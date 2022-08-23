import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ChakraProvider, theme } from "@chakra-ui/react";

import { Routes } from "./routes";

import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </ChakraProvider>
);
