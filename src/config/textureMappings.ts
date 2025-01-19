// Type definitions for texture categories
interface TextureMap {
  [key: string]: string;
}

interface TextureCategories {
  countertops: TextureMap;
  siding: TextureMap;
  flooring?: TextureMap;
  roofing?: TextureMap;
}

// GLB model URL
export const GLB_URL = import.meta.env.VITE_SUPABASE_GLB_URL || 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/cottage-house/model.glb';

export const TEXTURES: TextureCategories = {
  countertops: {
    blackQuartz: import.meta.env.VITE_TEXTURE_BLACK_QUARTZ,
    oak: import.meta.env.VITE_TEXTURE_OAK,
  },
  siding: {
    ironGray: "", // TODO: Add actual siding textures
    pearlGray: "", // TODO: Add actual siding textures
  }
}; 