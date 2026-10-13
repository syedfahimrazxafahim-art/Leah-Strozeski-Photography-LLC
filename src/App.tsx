import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { PhotoItem } from './types';
import { PHOTOGRAPHY_COLLECTION } from './data/photography';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const handleSelectPhoto = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNavigateLightbox = (index: number) => {
    if (index >= 0 && index < PHOTOGRAPHY_COLLECTION.length) {
      setSelectedPhoto(PHOTOGRAPHY_COLLECTION[index]);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-white selection:text-black">
      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Persistent Minimal Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero with Photography + Light Lines */}
        <Hero />

        {/* Dedicated Full-Size Portfolio Gallery with Image Trail */}
        <Portfolio onSelectPhoto={handleSelectPhoto} />

        {/* Editorial About Section */}
        <About />

        {/* Functional Contact & Inquiry Section */}
        <Contact />
      </main>

      {/* Refined Minimalist Footer */}
      <Footer />

      {/* Full-Screen Photography Lightbox Viewer */}
      <Lightbox
        photo={selectedPhoto}
        photos={PHOTOGRAPHY_COLLECTION}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}
