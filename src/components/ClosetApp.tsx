import { useState } from "react";
import { Gallery } from "./Gallery";
import { ClosetModal } from "./ClosetModal";
import { Button } from "@/components/ui/button";
import { Plus, Shirt } from "lucide-react";
import sampleTop1 from "@/assets/sample-top-1.jpg";
import sampleTop2 from "@/assets/sample-top-2.jpg";
import sampleBottom1 from "@/assets/sample-bottom-1.jpg";
import sampleBottom2 from "@/assets/sample-bottom-2.jpg";
interface ClothingItem {
  id: string;
  url: string;
  category: 'superior' | 'inferior';
  createdAt: Date;
}
export const ClosetApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize with sample images
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([{
    id: '1',
    url: sampleTop1,
    category: 'superior',
    createdAt: new Date()
  }, {
    id: '2',
    url: sampleTop2,
    category: 'superior',
    createdAt: new Date()
  }, {
    id: '3',
    url: sampleBottom1,
    category: 'inferior',
    createdAt: new Date()
  }, {
    id: '4',
    url: sampleBottom2,
    category: 'inferior',
    createdAt: new Date()
  }]);

  // Separate items by category
  const superiorItems = clothingItems.filter(item => item.category === 'superior').sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(item => item.url);
  const inferiorItems = clothingItems.filter(item => item.category === 'inferior').sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(item => item.url);
  const handleImageAdd = (imageUrl: string, category: 'superior' | 'inferior') => {
    const newItem: ClothingItem = {
      id: Date.now().toString(),
      url: imageUrl,
      category,
      createdAt: new Date()
    };
    setClothingItems(prev => [...prev, newItem]);
  };
  const handleImageSelect = (galleryType: string, index: number) => {
    console.log(`Selected ${galleryType} image at index ${index}`);
    // Here you could add functionality like full-screen view, edit, delete, etc.
  };
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      {/* Header */}
      <header className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <Shirt className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Mi Closet
          </h1>
        </div>
        
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto space-y-8">
        {/* Superior Gallery */}
        <div className="animate-fade-in" style={{
        animationDelay: '0.1s'
      }}>
          <Gallery title="Superior" images={superiorItems} onImageSelect={index => handleImageSelect('superior', index)} />
        </div>

        {/* Inferior Gallery */}
        <div className="animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          <Gallery title="Inferior" images={inferiorItems} onImageSelect={index => handleImageSelect('inferior', index)} />
        </div>

        {/* Statistics */}
        <div className="animate-fade-in" style={{
        animationDelay: '0.3s'
      }}>
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Resumen del Closet</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{superiorItems.length}</div>
                <div className="text-sm text-muted-foreground">Prendas Superiores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{inferiorItems.length}</div>
                <div className="text-sm text-muted-foreground">Prendas Inferiores</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Closet Button */}
      <Button className="closet-btn animate-scale-in" onClick={() => setIsModalOpen(true)} style={{
      animationDelay: '0.5s'
    }}>
        <Plus className="w-8 h-8" />
      </Button>

      {/* Upload Modal */}
      <ClosetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onImageAdd={handleImageAdd} />
    </div>;
};