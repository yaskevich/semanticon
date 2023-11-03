# Pragmaticon Frontend

#### Pragmaticon is a Platform for Presenting Discourse Formulae &amp; Conversational Routines

Code for data processing, as well as a backend server application is [here](https://github.com/yaskevich/pragmaticon-database). 

The latest version of the app can be built **statically**.

## The environment variables

| Variable| Function|
| ------------- |-------------|
|`VITE_DATA`| the path to the JSON file containing the dataset. It will be hard-coded into application. If not, the [backend](https://github.com/yaskevich/pragmaticon-database) providing API is required|
|`VITE_MEDIA`| the URL where [mediafiles](https://github.com/yaskevich/pragmaticon-media) are served. If not, the [backend](https://github.com/yaskevich/pragmaticon-database) serving files is required|
|`VITE_NAME`|application title|
|`VITE_TITLE`|application heading|
|`VITE_GTAG`|Google Analytics Tag ID|
|`VITE_LANG`|UI language locale (default one is _ru_)|
|`VITE_TRANSLIT`|Flag of the content transliteration status (if not set, no captions are transliterated)|
|`VITE_PORT`|Vite development server port (_not important for building_)|
|`VITE_PROXY`|backend server and port where API requests should be proxied via Vite development server (_not important for building_)|

## Framework

Project is written in [Vue 3](https://vitejs.dev/) (Composition API). The UI library is [PrimeVue](https://primefaces.org/primevue/). The build tool is [Vite](https://vitejs.dev/).

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
