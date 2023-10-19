# RIT.ts
A TypeScript package for interacting with api.rit.edu.

![Build Status](https://img.shields.io/github/actions/workflow/status/PencilFoxStudios/RIT.ts/build.yml)
![Tests Status](https://img.shields.io/github/actions/workflow/status/PencilFoxStudios/RIT.ts/test.yml?label=tests)
![npm](https://img.shields.io/npm/v/rit.ts)
[![codecov](https://codecov.io/gh/PencilFoxStudios/RIT.ts/graph/badge.svg?token=TT32PR0E8E)](https://codecov.io/gh/PencilFoxStudios/RIT.ts)


# Getting Started
Run ``npm install rit.ts`` in your NodeJS project, then it's as easy as:

```ts
import { TigerClient } from "rit.ts";

const RITClient:TigerClient = new TigerClient("YOUR_API_KEY")
```

More documentation hopefully coming soon.

# Contributing
Don't forget to make a ``.env`` file defining an ``RIT_API_KEY`` if you're going to contribute to development!

``npm test`` -- Run tests
``npm run build`` -- Build the package

