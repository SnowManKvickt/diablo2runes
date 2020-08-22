# diablo2runes

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Raw images in includes Modules
When referencing images in the imported module files such as CharacterBuilds.vue at the time i'm not sure how to parse images.
```
import * as chars from "@/assets/CharacterBuilds.js";
```

in the object array that will be parsed by the template as "raw html" with v-html so it is included from outside the build such as:
```
description: [{
  name: "Character class description etc",
  message: "<img src='http://mydomain.com/images/image.png'/> ",
}]
```
