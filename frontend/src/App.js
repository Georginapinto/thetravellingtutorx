import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Students from "@/pages/Students";
import Parents from "@/pages/Parents";
import Teachers from "@/pages/Teachers";
import TutorPartner from "@/pages/TutorPartner";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import ResourceShop from "@/pages/ResourceShop";
import Shop from "@/pages/Shop";
import FreeResources from "@/pages/FreeResources";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import InstallPrompt from "@/components/InstallPrompt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/students" element={<Students />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/tutor-partner" element={<TutorPartner />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/resource-shop" element={<Shop />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/free-resources" element={<FreeResources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <InstallPrompt />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
