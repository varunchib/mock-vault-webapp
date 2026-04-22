import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import ExamPage from "./pages/ExamPage";
import MockPage from "./pages/MockPage";
import QuestionPage from "./pages/QuestionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[62px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exam/:id" element={<ExamPage />} />
          <Route path="/mock/:id" element={<MockPage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
