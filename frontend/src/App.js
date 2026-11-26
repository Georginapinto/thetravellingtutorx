import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Parents from "@/pages/Parents";
import Teachers from "@/pages/Teachers";
import TutorPartner from "@/pages/TutorPartner";
import Contact from "@/pages/Contact";
import Tuition from "@/pages/Tuition";
import Resources from "@/pages/Resources";
import Schools from "@/pages/Schools";
import FreeResources from "@/pages/FreeResources";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import InstallPrompt from "@/components/InstallPrompt";
import ScrollManager from "@/components/ScrollManager";
import { SignupPopup, StickySignupBar } from "@/components/SignupPopup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tuition" element={<Tuition />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/tutor-partner" element={<TutorPartner />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/free-resources" element={<FreeResources />} />
            <Route path="/blog" element={<Blog />} />
            {/* Old addresses, kept so existing links and bookmarks still work. */}
            <Route path="/students" element={<Navigate to="/tuition" replace />} />
            <Route path="/courses" element={<Navigate to="/tuition" replace />} />
            <Route path="/shop" element={<Navigate to="/resources" replace />} />
            <Route path="/resource-shop" element={<Navigate to="/resources" replace />} />
            <Route path="/testimonials" element={<Navigate to="/about#testimonials" replace />} />
            <Route path="/faqs" element={<Navigate to="/about#faqs" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <InstallPrompt />
        <SignupPopup />
        <StickySignupBar />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
