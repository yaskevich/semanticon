# Semanticon &ndash; client application

Code for data processing, as well as a backend server application is in [server](../server) directory.

The latest version of the app can be built **statically**. However, a server setup is required for generating data JSON.

## Framework

Project is written in [Vue 3](https://vitejs.dev/) (Composition API). The UI library is [PrimeVue](https://primefaces.org/primevue/). The build tool is [Vite](https://vitejs.dev/).

Providing environment variables is required for successful build (via `.env` file in the client root or otherwise).

## The environment variables

| Variable| Function|
| ------------- |-------------|
|`VITE_DATA`| the path to the JSON file containing the dataset. It will be hard-coded into application. If not, the [server](../server) providing API is required|
|`VITE_MEDIA`| the URL where [mediafiles](https://github.com/yaskevich/pragmaticon-media) are served. If not, the [server](../server) serving files is required|
|`VITE_NAME`|application title|
|`VITE_TITLE`|application heading|
|`VITE_GTAG`|Google Analytics Tag ID|
|`VITE_LANG`|UI language locale (default one is _ru_)|
|`VITE_TRANSLIT`|Flag of the content transliteration status (if not set, no captions are transliterated)|
|`VITE_PORT`|Vite development server port (_not important for building_)|
|`VITE_PROXY`|backend server and port where API requests should be proxied via Vite development server (_not important for building_)|

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```
