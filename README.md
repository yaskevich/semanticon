# Pragmaticon Frontend
### Pragmaticon is a Database of Russian Discourse Formulae

Code for data processing, as well as a backend server app is [here](https://github.com/yaskevich/pragmaticon-database). However, the latest version of the app can be built statically.

Two environment variables could be set up:

`VITE_MEDIA` &ndash; the URL where [mediafiles](https://github.com/yaskevich/pragmaticon-media) are served. If not, the [backend](https://github.com/yaskevich/pragmaticon-database) serving files is required.

`VITE_DATA` &ndash; the path to the JSON file containing the dataset. It will be hard-coded into application. If not, the [backend](https://github.com/yaskevich/pragmaticon-database) providing API is required.

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
