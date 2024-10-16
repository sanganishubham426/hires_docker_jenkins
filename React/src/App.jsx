import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "./Pages/404Page";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import JobPostPage from "./Pages/JobPostPage";
import ViewJobPostPage from "./Pages/ViewJobPostPage";
import BulkResumesPage from "./Pages/BulkResumesPage";
import CandidateResumePage from "./Pages/CandidateResumePage";
import SettingsPage from "./Pages/SettingsPage";
import RegistrationPage from "./Pages/RegistrationPage";
import DefaultAPICall from "./Components/DefaultAPICall";
import { Worker } from "@react-pdf-viewer/core";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer style={{ width: "350px" }} />
        <DefaultAPICall />
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" />
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/email-verification" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<RegistrationPage />} />
          <Route path="/create-password" element={<RegistrationPage />} />

          <Route element={<Layout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobpost"
              element={
                <ProtectedRoute>
                  <JobPostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewjobpost"
              element={
                <ProtectedRoute>
                  <ViewJobPostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bulk-resumes"
              element={
                <ProtectedRoute>
                  <BulkResumesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate-resumes"
              element={
                <ProtectedRoute>
                  <CandidateResumePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
