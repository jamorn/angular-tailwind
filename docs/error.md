PS D:\dashboard2025\Frontend> ng s
Component HMR has been enabled.
If you encounter application reload issues, you can manually reload the page to bypass HMR 
and/or disable this feature with the `--no-hmr` command line option.
Please consider reporting any issues you encounter here: https://github.com/angular/angular-cli/issues

Application bundle generation failed. [8.502 seconds]

X [ERROR] TS2307: Cannot find module '../uikit/uikit.routes' or its corresponding type declarations. [plugin angular-compiler]                                                        Frontend\src\app\_

    src/app/modules/layout/layout.routes.ts:43:39:
      43 │             loadChildren: () => import('../uikit/uikit.routes')
         ╵                                        ~~~~~~~~~~~~~~~~~~~~~~~


X [ERROR] Could not resolve "../uikit/uikit.routes"

    src/app/modules/layout/layout.routes.ts:44:51:
      44 │ ...               loadChildren: () => import('../uikit/uikit.routes')
         ╵                                              ~~~~~~~~~~~~~~~~~~~~~~~


Watch mode enabled. Watching for file changes...
Application bundle generation failed. [2.148 seconds]

X [ERROR] TS2307: Cannot find module '../uikit/uikit.routes' or its corresponding type declarations. [plugin 
angular-compiler]

    src/app/modules/layout/layout.routes.ts:43:39:
      43 │             loadChildren: () => import('../uikit/uikit.routes')
         ╵                                        ~~~~~~~~~~~~~~~~~~~~~~~


X [ERROR] Could not resolve "../uikit/uikit.routes"

    src/app/modules/layout/layout.routes.ts:44:51:
      44 │ ...               loadChildren: () => import('../uikit/uikit.routes')
         ╵                                              ~~~~~~~~~~~~~~~~~~~~~~~


