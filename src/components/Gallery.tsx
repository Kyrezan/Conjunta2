import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  title: string;
  images: string[];
  onImageSelect?: (index: number) => void;
}

export const Gallery = ({ title, images, onImageSelect }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    setTranslateX(0);
  };

  useEffect(() => {
    if (images.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= images.length) {
      setCurrentIndex(images.length - 1);
    }
  }, [images.length, currentIndex]);

  return (
    <div className="w-full">
      {/* Gallery Title */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-1">{title}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full"></div>
      </div>

      {/* Gallery Container */}
      <div className="gallery-container aspect-square">
        {images.length === 0 ? (
          // Empty State
          <div className="empty-gallery">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">No hay imágenes</p>
            <p className="text-sm">Agrega imágenes desde el menú Closet</p>
          </div>
        ) : (
          // Gallery with Images
          <div
            ref={galleryRef}
            className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Gallery Track */}
            <div
              className="gallery-track h-full"
              style={{
                transform: `translateX(${-currentIndex * 100 + (translateX / (galleryRef.current?.offsetWidth || 300)) * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => onImageSelect?.(index)}
                >
                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gallery-nav-btn prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gallery-nav-btn next"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentIndex 
                        ? 'bg-primary shadow-md' 
                        : 'bg-border hover:bg-muted-foreground'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};