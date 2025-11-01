import { useState } from "react";
import { Gallery } from "./Gallery";
import { ClosetModal } from "./ClosetModal";
import { Button } from "@/components/ui/button";
import { Plus, Shirt, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useClothingItems } from "@/hooks/useClothingItems";

export const ClosetApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { items, loading, deleteItem } = useClothingItems(user?.id);

  // Separate items by category
  const superiorItems = items
    .filter(item => item.category === 'superior')
    .map(item => item.url);
  
  const inferiorItems = items
    .filter(item => item.category === 'inferior')
    .map(item => item.url);

  const handleImageSelect = (galleryType: string, index: number) => {
    console.log(`Selected ${galleryType} image at index ${index}`);
  };

  const handleImageDelete = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      await deleteItem(id, item.url);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
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
      <ClosetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onImageDelete={handleImageDelete}
        clothingItems={items}
        userId={user?.id}
      />
    </div>;
};