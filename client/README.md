# Semanticon &ndash; client application

Code for data processing, as well as a backend server application is in [server](../server) directory.

The latest version of the app can be built **statically**. However, a server setup is required for generating data JSON.

## Framework

Project is written in [Vue 3](https://vitejs.dev/) (Composition API). The UI library is [PrimeVue](https://primefaces.org/primevue/). The build tool is [Vite](https://vitejs.dev/).

Providing environment variables is required for successful build (via `.env` file in the client root or otherwise).

## The environment variables

| Variable| Function|
| ------------- |-------------|
|`VITE_CONTENT`| the path to the JSON file containing the dataset. It will be hard-coded into application. If not, the [server](../server) providing API is required|
|`VITE_META`| the path to the metadata JSON config file
|`VITE_PORT`|Vite development server port (_not important for building_)|
|`VITE_PROXY`|backend server and port where API requests should be proxied via Vite development server (_not important for building_)|

## Setting up the UI content via the metadata JSON config

```javascript
 "project": {
        "lang": "", // UI language locale (default one is _ru_)
        "name": "Semanticon", // application title
        "title": "Semanticon", // application heading
        "sub": "Semantic words", // aplication subheading
        "credits": "", // info about the authors
        "translit": false, //  whether to transliterate non-English characters
        "gtag": "", // Google Analytics Tag ID
        "media": "" // URL where [mediafiles](https://github.com/yaskevich/pragmaticon-media) are served. If not, the [server](../server) serving files is required
    },
"intro":   [
     {
            "header": "What is that project about?",
            "body": "It is about semantic words. Completely new previsously not studied kind of words.",
            "class": "back-1" // back-1, back-2 and back-3 classes are available
    },
    {
            "image": "src/assets/image.png"
    }
    ] // those two kinds of blocks can be repeated in any order in this section. They will be rendered as a home page content (component Intro)
```

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
