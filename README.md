
![Logo](https://res.cloudinary.com/dio0rdpui/image/upload/v1654209954/readme-image_wuwnmx.png)


## MERN Stack

**Client:** React, Redux
**Server:** Node, Express

## Instalación

- Instalar Expo globalmente: `npm install expo-cli --global`
- Instalar Node `https://yarnpkg.com/lang/en/docs/install/`
- Instalar dependencias en el proyecto: `npm i`

## Entorno de desarrollo

- Ejecutar `expo start`
- Una vez que se ejecuta Expo, ejecutar los simuladores desde la interfaz Web de expo

## Generar build

- Ejecutar `expo start`
- Ejecutar los comandos:
  - Para generar un APK: `expo build:android`
  - Para generar un IPA: `expo build:ios`

> Antes de cada build pensado para subir a un store es necesario modificar en `app.json` :
- `ios/buildNumber`
- `android/versionCode`

## Subir un update a Expo (OTA)

Para subir una nueva versión para que se pueda ver en el Expo Client en el dispositivo móvil ejecutar:

- `expo publish`
> Antes de publicar se debe estar logeado con una cuenta de expo.io


## Respaldar certificados desde Expo Server

- Inspeccionar y administrar todas sus credenciales con Expo CLI mediante la ejecución
`expo credentials:manager`

- Descargar certificado para IOS
`expo fetch:ios:certs`

- Descargar certificado para ANDROID
`expo fetch:android:upload-cert`

- Elimina el almacen de claves y firmas de Android 
`expo build:android --clear-credentials`

- Extrae el certificado público del almacén de claves en un .pem archivo
`expo fetch:android:upload-certque`



## Estructura del proyecto

- `assets` Imágenes, tipografías y archivos estáticos que utiliza la aplicación.
- `app.js` Archivo de configuración para Expo
- `.env` Archivo de variables de entorno
- `App.tsx` Componente de entrada a la APP
- `src` Archivos de React
  - `components` Componentes principales y genéricos de la aplicación.
  - `helpers y utils` Utilidades adicionales para dar formato o validar información.
  - `screens` Pantallas utilizadas a lo largo de la aplicación.
  - `schemas` Esquemas de validación de los formularios con la librería <a href="">Yup</a>.
  - `interfaces` Interfaces de `Typescript`
  - `hooks` React Hooks para mejor código en componenetes
  - `constants` Archivos de constantes.
  - `navigation` Ficheros con la navegación de la app
  - `store` Estructura de archivos en `Redux`
  - `services` Archivos que comunican la información del backend junto al estado de Redux
  - `theme` Archivo con la configuración del tema, en modo oscuro y claro
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adri%C3%A1n-coll-su%C3%A1rez-703960227/)


