PS E:\Dashboard2025\angular-tailwind> ng s
Component HMR has been enabled.
If you encounter application reload issues, you can manually reload the page to bypass HMR and/or disable this feature with the `--no-hmr` command line option.
Please consider reporting any issues you encounter here: https://github.com/angular/angular-cli/issues

Application bundle generation failed. [14.804 seconds]

X [ERROR] Missing opening { [plugin angular-css]

    node_modules/@tailwindcss/node/node_modules/tailwindcss/dist/lib.js:3:2047:
      3 │ ...ength-1]!==")"){if(f==="")throw new Error("Missing opening {");i...
        ╵                                    ^

    at ne (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:3:2048)
    at E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:17:1158
    at async Promise.all (index 0)
    at async mt (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:17:1264)
    at async Ur (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:29:758)
    at async Fr (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:33:1064)
    at async nt (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\dist\index.js:10:3272)
    at async p (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\postcss\dist\index.js:8:3242)
    at async Object.Once (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\postcss\dist\index.js:8:3422)
    at async LazyResult.runAsync (E:\Dashboard2025\angular-tailwind\node_modules\postcss\lib\lazy-result.js:261:11)

  This error came from the "onLoad" callback registered here:

    node_modules/@angular/build/src/tools/esbuild/stylesheets/stylesheet-plugin-factory.js:125:22:
      125 │                 build.onLoad({ filter: language.fileFilter, names...
          ╵                       ~~~~~~

    at setup (E:\Dashboard2025\angular-tailwind\node_modules\@angular\build\src\tools\esbuild\stylesheets\stylesheet-plugin-factory.js:125:23)
    at handlePlugins (E:\Dashboard2025\angular-tailwind\node_modules\esbuild\lib\main.js:1150:21)


X [ERROR] Missing opening { [plugin angular-css]

    node_modules/@tailwindcss/node/node_modules/tailwindcss/dist/lib.js:3:2047:
      3 │ ...ength-1]!==")"){if(f==="")throw new Error("Missing opening {");i...

    at ne (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:3:2048)
    at E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:17:1158
    at async Promise.all (index 0)
    at async mt (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:17:1264)
    at async Ur (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:29:758)
    at async Fr (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\node_modules\tailwindcss\dist\lib.js:33:1064)
    at async nt (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\node\dist\index.js:10:3272)
    at async p (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\postcss\dist\index.js:8:3242)
    at async Object.Once (E:\Dashboard2025\angular-tailwind\node_modules\@tailwindcss\postcss\dist\index.js:8:3422)
    at async LazyResult.runAsync (E:\Dashboard2025\angular-tailwind\node_modules\postcss\lib\lazy-result.js:261:11)

  This error came from the "onLoad" callback registered here:

    node_modules/@angular/build/src/tools/esbuild/stylesheets/stylesheet-plugin-factory.js:125:22:
      125 │                 build.onLoad({ filter: language.fileFilter, names...
          ╵                       ~~~~~~

    at setup (E:\Dashboard2025\angular-tailwind\node_modules\@angular\build\src\tools\esbuild\stylesheets\stylesheet-plugin-factory.js:125:23)
    at handlePlugins (E:\Dashboard2025\angular-tailwind\node_modules\esbuild\lib\main.js:1150:21)


X [ERROR] Unexpected } [plugin angular-css]

    src/styles.css:302:0:
      302 │ }  }    padding-right: 0.5rem;  .supports-scrollbars\: pr-2 {@sup...
          ╵ ^

  The plugin "angular-css" was triggered by this import

    angular:styles/global:styles:3:8:
      3 │ @import 'src/styles.css';
        ╵         ~~~~~~~~~~~~~~~~


Watch mode enabled. Watching for file changes...