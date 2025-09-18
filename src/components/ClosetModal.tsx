import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ClosetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (imageUrl: string, category: 'superior' | 'inferior') => void;
}

export const ClosetModal = ({ isOpen, onClose, onImageAdd }: ClosetModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'superior' | 'inferior' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "El archivo es demasiado grande. Máximo 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) return;

    setIsUploading(true);
    try {
      // For now, we'll create a local URL for the image
      // This will be replaced with Supabase storage upload later
      const imageUrl = URL.createObjectURL(selectedFile);
      
      onImageAdd(imageUrl, selectedCategory);
      
      toast({
        title: "¡Imagen agregada!",
        description: `La imagen se guardó en la categoría ${selectedCategory === 'superior' ? 'Superior' : 'Inferior'}.`,
      });

      // Reset modal state
      setSelectedFile(null);
      setPreviewUrl(null);
      setSelectedCategory(null);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedCategory(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Agregar al Closet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="text-center">
              {!previewUrl ? (
                <div className="border-2 border-dashed border-border rounded-xl p-8 hover:border-primary transition">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Selecciona una imagen</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    JPG, PNG o WEBP hasta 10MB
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar imagen
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-border"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                      setSelectedFile(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Category Selection */}
          {previewUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">
                ¿Dónde quieres guardar esta imagen?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  className={`category-btn ${selectedCategory === 'superior' ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory('superior')}
                >
                  👕 Superior
                  <p className="text-sm text-muted-foreground mt-1">
                    Camisetas, blusas, chaquetas...
                  </p>
                </button>
                <button
                  className={`category-btn ${selectedCategory === 'inferior' ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory('inferior')}
                >
                  👖 Inferior
                  <p className="text-sm text-muted-foreground mt-1">
                    Pantalones, faldas, shorts...
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {previewUrl && selectedCategory && (
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Agregando...
                </>
              ) : (
                'Agregar al Closet'
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};