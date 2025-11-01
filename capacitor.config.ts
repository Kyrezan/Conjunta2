import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.25bc2c567fa74c33bb81411ce6b9a833',
  appName: 'Conjunta2',
  webDir: 'dist',
  server: {
    url: 'https://25bc2c56-7fa7-4c33-bb81-411ce6b9a833.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      // Configuración para acceso a la cámara
    }
  }
};

export default config;
