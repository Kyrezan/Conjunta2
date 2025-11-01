# 📱 Guía para Crear APK de Android con Capacitor

## ✅ Configuración Completada

Tu app **Conjunta2** ya está configurada con Capacitor. Ahora puedes compilarla para Android.

## 📋 Requisitos Previos

Antes de comenzar, necesitas tener instalado en tu computadora:

1. **Node.js** (v16 o superior)
2. **Git**
3. **Android Studio** (con SDK de Android)
4. **Java JDK** (v11 o superior)

## 🚀 Pasos para Crear tu APK

### 1. Exportar a GitHub

Primero, transfiere tu proyecto a GitHub:

1. Haz clic en el botón **GitHub** en la esquina superior derecha de Lovable
2. Autoriza la aplicación GitHub de Lovable
3. Crea un nuevo repositorio
4. Espera a que se complete la sincronización

### 2. Clonar el Proyecto Localmente

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Agregar Plataforma Android

```bash
npx cap add android
```

Esto creará una carpeta `android/` con tu proyecto de Android Studio.

### 5. Actualizar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=tu_key_publica
VITE_SUPABASE_PROJECT_ID=tu_project_id
```

### 6. Construir la App Web

```bash
npm run build
```

### 7. Sincronizar con Capacitor

```bash
npx cap sync android
```

Este comando copia el build web a la carpeta Android.

### 8. Abrir en Android Studio

```bash
npx cap open android
```

O manualmente:
- Abre Android Studio
- Selecciona "Open an Existing Project"
- Navega a la carpeta `android/` en tu proyecto

### 9. Configurar Firma (para APK release)

En Android Studio:

1. Ve a `Build` > `Generate Signed Bundle / APK`
2. Selecciona **APK**
3. Crea un nuevo keystore o usa uno existente
4. Completa los datos requeridos
5. Selecciona **release** como build variant

### 10. Generar APK

#### Para desarrollo (debug):

En Android Studio:
- `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`

O desde terminal:
```bash
cd android
./gradlew assembleDebug
```

El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Para producción (release):

```bash
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/app-release.apk`

## 📸 Permisos de Cámara

Tu app ya incluye el plugin de Cámara de Capacitor. Los permisos se agregarán automáticamente al AndroidManifest.xml.

Si necesitas personalizar los permisos, edita:
`android/app/src/main/AndroidManifest.xml`

## 🔄 Desarrollo en Tiempo Real

Durante el desarrollo, puedes usar hot-reload:

1. Asegúrate que tu dispositivo/emulador y tu computadora estén en la misma red
2. La app se conectará automáticamente al servidor de Lovable
3. Los cambios se reflejarán en tiempo real

Para desactivar esto y usar la versión compilada, comenta la sección `server` en `capacitor.config.ts`:

```typescript
// server: {
//   url: 'https://...',
//   cleartext: true
// },
```

## 🐛 Solución de Problemas

### Error: "SDK not found"
Instala el Android SDK en Android Studio:
- `Tools` > `SDK Manager` > Instala Android SDK Platform 33 (o superior)

### Error de compilación Gradle
Limpia y reconstruye:
```bash
cd android
./gradlew clean
./gradlew build
```

### La app no se conecta a Supabase
Verifica que el archivo `.env` tenga las credenciales correctas y que hayas ejecutado `npm run build` después de crearlo.

## 📱 Instalar APK en tu Dispositivo

1. Transfiere el APK a tu dispositivo Android
2. Habilita "Instalar apps de fuentes desconocidas" en Configuración
3. Abre el archivo APK en tu dispositivo
4. Sigue las instrucciones de instalación

## 🚀 Publicar en Google Play Store

Para publicar tu app en Google Play:

1. Crea una cuenta de desarrollador en Google Play Console ($25 único pago)
2. Genera un APK/Bundle firmado en modo release
3. Completa la información de la app en Play Console
4. Sube tu APK/Bundle
5. Completa el proceso de revisión

## 💡 Tips Importantes

- **Siempre** ejecuta `npm run build` y `npx cap sync` después de hacer cambios en el código
- Usa **APK debug** para pruebas rápidas
- Usa **APK release firmado** para distribución
- Mantén seguro tu archivo keystore (necesario para actualizaciones futuras)

## 📚 Recursos Adicionales

- [Documentación oficial de Capacitor](https://capacitorjs.com/docs)
- [Guía de Android Studio](https://developer.android.com/studio/intro)
- [Blog de Lovable sobre Capacitor](https://docs.lovable.dev)

---

¿Necesitas ayuda? Pregunta en el chat de Lovable! 🚀
