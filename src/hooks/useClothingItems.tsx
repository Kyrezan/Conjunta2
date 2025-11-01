import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface ClothingItem {
  id: string;
  url: string;
  category: 'superior' | 'inferior';
  created_at: string;
}

export const useClothingItems = (userId: string | undefined) => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems((data || []).map(item => ({
        id: item.id,
        url: item.url,
        category: item.category as 'superior' | 'inferior',
        created_at: item.created_at
      })));
    } catch (error) {
      console.error('Error fetching items:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las prendas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [userId]);

  const addItem = async (file: File, category: 'superior' | 'inferior') => {
    if (!userId) return null;

    try {
      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('clothing-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('clothing-images')
        .getPublicUrl(fileName);

      // Insert into database
      const { data, error } = await supabase
        .from('clothing_items')
        .insert({
          user_id: userId,
          url: publicUrl,
          category,
        })
        .select()
        .single();

      if (error) throw error;

      const newItem: ClothingItem = {
        id: data.id,
        url: data.url,
        category: data.category as 'superior' | 'inferior',
        created_at: data.created_at
      };

      setItems(prev => [newItem, ...prev]);
      
      toast({
        title: "¡Imagen agregada!",
        description: `La imagen se guardó en la categoría ${category === 'superior' ? 'Superior' : 'Inferior'}.`,
      });

      return data;
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteItem = async (id: string, url: string) => {
    try {
      // Extract file path from URL
      const urlParts = url.split('/');
      const filePath = urlParts.slice(-2).join('/');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('clothing-images')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Prenda eliminada",
        description: "La prenda se eliminó correctamente.",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la prenda.",
        variant: "destructive",
      });
    }
  };

  return { items, loading, addItem, deleteItem, refreshItems: fetchItems };
};