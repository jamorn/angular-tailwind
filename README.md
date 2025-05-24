
```
Frontend
├─ .angular
├─ .editorconfig
├─ .eslintrc.json
├─ .postcssrc.json
├─ .prettierignore
├─ .prettierrc
├─ angular.json
├─ CHANGELOG.md
├─ CONTRIBUTING.md
├─ docs
│  ├─ 20250508T1715.md
│  ├─ 20250523Summary.md
│  ├─ Admin-Panel.md
│  ├─ AngularStandaloneProject.md
│  ├─ ark.md
│  ├─ arkAIeveryTimes.md
│  ├─ authbeforedit.md
│  ├─ Authentication-AngularDevelopment-Mode.md
│  ├─ BarrelFile.md
│  ├─ Cache-Restart-Angular-Server.md
│  ├─ canceled-changes.md
│  ├─ CommonModule-Angular.md
│  ├─ datepicker.md
│  ├─ delete the Angular cache.md
│  ├─ Environment-Angular-Frontend.md
│  ├─ error.md
│  ├─ ESM.md
│  ├─ fakegetapi.md
│  ├─ findComponentNotStandAlone.md
│  ├─ findComponentStillStandAlone.md
│  ├─ Get-ChildItem.md
│  ├─ git-history.md
│  ├─ git.md
│  ├─ HMR.md
│  ├─ improve.md
│  ├─ menu.md
│  ├─ menuflow.md
│  ├─ ng-serve.md
│  ├─ non-standalone-components.md
│  ├─ Path.md
│  ├─ remain.md
│  ├─ Remove-Item.md
│  ├─ rolemenu.md
│  ├─ search.md
│  ├─ ServiceData.md
│  ├─ stanalone.md
│  ├─ Standalone-vs-NgModule.md
│  ├─ svg.md
│  ├─ tailwindconfig.md
│  ├─ temp.md
│  ├─ Template.md
│  ├─ tsconfigmod.md
│  ├─ UIKit Module.md
│  └─ ่Json-sortorder.md
├─ karma.conf.js
├─ LICENSE
├─ on package.json
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ postcss.config.js
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.routes.ts
│  │  ├─ core
│  │  │  ├─ constants
│  │  │  │  ├─ api.endpoints.ts
│  │  │  │  └─ menu.ts
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ interceptor
│  │  │  ├─ interceptors
│  │  │  │  └─ auth
│  │  │  │     ├─ auth.interceptor.spec.ts
│  │  │  │     └─ auth.interceptor.ts
│  │  │  ├─ mocks
│  │  │  │  ├─ data
│  │  │  │  │  ├─ currentUser.json
│  │  │  │  │  └─ response_1748006778314.json
│  │  │  │  ├─ interceptors
│  │  │  │  │  └─ fake-api.interceptor.ts
│  │  │  │  └─ services
│  │  │  │     └─ auth-mock.service.ts
│  │  │  ├─ models
│  │  │  │  ├─ auth
│  │  │  │  │  └─ auth.model.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ menu.model.ts
│  │  │  │  ├─ oee
│  │  │  │  │  └─ oee.model.ts
│  │  │  │  └─ theme.model.ts
│  │  │  ├─ services
│  │  │  │  ├─ auth
│  │  │  │  │  └─ auth.service.ts
│  │  │  │  ├─ theme.service.spec.ts
│  │  │  │  ├─ theme.service.ts
│  │  │  │  └─ windows-auth.service.ts
│  │  │  └─ utils
│  │  ├─ modules
│  │  │  ├─ admin
│  │  │  │  ├─ admin.component.ts
│  │  │  │  ├─ admin.routes.ts
│  │  │  │  └─ entry
│  │  │  │     └─ oee
│  │  │  │        ├─ oee-entry.component.css
│  │  │  │        ├─ oee-entry.component.html
│  │  │  │        ├─ oee-entry.component.spec.ts
│  │  │  │        └─ oee-entry.component.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.component.css
│  │  │  │  ├─ auth.component.html
│  │  │  │  ├─ auth.component.spec.ts
│  │  │  │  ├─ auth.component.ts
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  └─ pages
│  │  │  │     ├─ forgot-password
│  │  │  │     │  ├─ forgot-password.component.css
│  │  │  │     │  ├─ forgot-password.component.html
│  │  │  │     │  ├─ forgot-password.component.spec.ts
│  │  │  │     │  └─ forgot-password.component.ts
│  │  │  │     ├─ login
│  │  │  │     │  ├─ login.component.css
│  │  │  │     │  ├─ login.component.html
│  │  │  │     │  ├─ login.component.spec.ts
│  │  │  │     │  └─ login.component.ts
│  │  │  │     ├─ new-password
│  │  │  │     │  ├─ new-password.component.css
│  │  │  │     │  ├─ new-password.component.html
│  │  │  │     │  ├─ new-password.component.spec.ts
│  │  │  │     │  └─ new-password.component.ts
│  │  │  │     ├─ sign-in
│  │  │  │     │  ├─ sign-in.component.css
│  │  │  │     │  ├─ sign-in.component.html
│  │  │  │     │  ├─ sign-in.component.spec.ts
│  │  │  │     │  └─ sign-in.component.ts
│  │  │  │     ├─ sign-up
│  │  │  │     │  ├─ sign-up.component.css
│  │  │  │     │  ├─ sign-up.component.html
│  │  │  │     │  ├─ sign-up.component.spec.ts
│  │  │  │     │  └─ sign-up.component.ts
│  │  │  │     └─ two-steps
│  │  │  │        ├─ two-steps.component.css
│  │  │  │        ├─ two-steps.component.html
│  │  │  │        ├─ two-steps.component.spec.ts
│  │  │  │        └─ two-steps.component.ts
│  │  │  ├─ dashboard
│  │  │  │  ├─ components
│  │  │  │  │  └─ nft
│  │  │  │  │     ├─ nft-auctions-table
│  │  │  │  │     │  ├─ nft-auctions-table.component.html
│  │  │  │  │     │  ├─ nft-auctions-table.component.spec.ts
│  │  │  │  │     │  └─ nft-auctions-table.component.ts
│  │  │  │  │     ├─ nft-auctions-table-item
│  │  │  │  │     │  ├─ nft-auctions-table-item.component.html
│  │  │  │  │     │  ├─ nft-auctions-table-item.component.spec.ts
│  │  │  │  │     │  └─ nft-auctions-table-item.component.ts
│  │  │  │  │     ├─ nft-chart-card
│  │  │  │  │     │  ├─ nft-chart-card.component.html
│  │  │  │  │     │  ├─ nft-chart-card.component.spec.ts
│  │  │  │  │     │  └─ nft-chart-card.component.ts
│  │  │  │  │     ├─ nft-dual-card
│  │  │  │  │     │  ├─ nft-dual-card.component.html
│  │  │  │  │     │  ├─ nft-dual-card.component.spec.ts
│  │  │  │  │     │  └─ nft-dual-card.component.ts
│  │  │  │  │     ├─ nft-header
│  │  │  │  │     │  ├─ nft-header.component.html
│  │  │  │  │     │  ├─ nft-header.component.spec.ts
│  │  │  │  │     │  └─ nft-header.component.ts
│  │  │  │  │     └─ nft-single-card
│  │  │  │  │        ├─ nft-single-card.component.html
│  │  │  │  │        ├─ nft-single-card.component.spec.ts
│  │  │  │  │        └─ nft-single-card.component.ts
│  │  │  │  ├─ dashboard.component.html
│  │  │  │  ├─ dashboard.component.spec.ts
│  │  │  │  ├─ dashboard.component.ts
│  │  │  │  ├─ dashboard.routes.ts
│  │  │  │  ├─ models
│  │  │  │  │  └─ nft.ts
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ giveaway
│  │  │  │  │  │  ├─ giveaway.component.css
│  │  │  │  │  │  ├─ giveaway.component.html
│  │  │  │  │  │  ├─ giveaway.component.spec.ts
│  │  │  │  │  │  └─ giveaway.component.ts
│  │  │  │  │  ├─ monthlyeii
│  │  │  │  │  │  ├─ monthly-eii.component.css
│  │  │  │  │  │  ├─ monthly-eii.component.html
│  │  │  │  │  │  ├─ monthly-eii.component.spec.ts
│  │  │  │  │  │  └─ monthly-eii.component.ts
│  │  │  │  │  ├─ oee
│  │  │  │  │  │  ├─ oee.component.css
│  │  │  │  │  │  ├─ oee.component.html
│  │  │  │  │  │  ├─ oee.component.spec.ts
│  │  │  │  │  │  └─ oee.component.ts
│  │  │  │  │  └─ safety
│  │  │  │  │     ├─ safety.component.css
│  │  │  │  │     ├─ safety.component.html
│  │  │  │  │     ├─ safety.component.spec.ts
│  │  │  │  │     └─ safety.component.ts
│  │  │  │  └─ services
│  │  │  │     ├─ chart.service.spec.ts
│  │  │  │     ├─ chart.service.ts
│  │  │  │     ├─ dashboard.service.spec.ts
│  │  │  │     └─ dashboard.service.ts
│  │  │  ├─ error
│  │  │  │  ├─ error.component.css
│  │  │  │  ├─ error.component.html
│  │  │  │  ├─ error.component.spec.ts
│  │  │  │  ├─ error.component.ts
│  │  │  │  ├─ error.routes.ts
│  │  │  │  └─ pages
│  │  │  │     ├─ error404
│  │  │  │     │  ├─ error404.component.css
│  │  │  │     │  ├─ error404.component.html
│  │  │  │     │  ├─ error404.component.spec.ts
│  │  │  │     │  └─ error404.component.ts
│  │  │  │     └─ error500
│  │  │  │        ├─ error500.component.css
│  │  │  │        ├─ error500.component.html
│  │  │  │        ├─ error500.component.spec.ts
│  │  │  │        └─ error500.component.ts
│  │  │  ├─ layout
│  │  │  │  ├─ components
│  │  │  │  │  ├─ bottom-navbar
│  │  │  │  │  │  ├─ bottom-navbar.component.css
│  │  │  │  │  │  ├─ bottom-navbar.component.html
│  │  │  │  │  │  ├─ bottom-navbar.component.spec.ts
│  │  │  │  │  │  └─ bottom-navbar.component.ts
│  │  │  │  │  ├─ footer
│  │  │  │  │  │  ├─ footer.component.css
│  │  │  │  │  │  ├─ footer.component.html
│  │  │  │  │  │  ├─ footer.component.spec.ts
│  │  │  │  │  │  └─ footer.component.ts
│  │  │  │  │  ├─ navbar
│  │  │  │  │  │  ├─ navbar-menu
│  │  │  │  │  │  │  ├─ navbar-menu.component.css
│  │  │  │  │  │  │  ├─ navbar-menu.component.html
│  │  │  │  │  │  │  ├─ navbar-menu.component.spec.ts
│  │  │  │  │  │  │  └─ navbar-menu.component.ts
│  │  │  │  │  │  ├─ navbar-mobile
│  │  │  │  │  │  │  ├─ navbar-mobile-menu
│  │  │  │  │  │  │  │  ├─ navbar-mobile-menu.component.css
│  │  │  │  │  │  │  │  ├─ navbar-mobile-menu.component.html
│  │  │  │  │  │  │  │  ├─ navbar-mobile-menu.component.spec.ts
│  │  │  │  │  │  │  │  └─ navbar-mobile-menu.component.ts
│  │  │  │  │  │  │  ├─ navbar-mobile-submenu
│  │  │  │  │  │  │  │  ├─ navbar-mobile-submenu.component.css
│  │  │  │  │  │  │  │  ├─ navbar-mobile-submenu.component.html
│  │  │  │  │  │  │  │  ├─ navbar-mobile-submenu.component.spec.ts
│  │  │  │  │  │  │  │  └─ navbar-mobile-submenu.component.ts
│  │  │  │  │  │  │  ├─ navbar-mobile.component.css
│  │  │  │  │  │  │  ├─ navbar-mobile.component.html
│  │  │  │  │  │  │  ├─ navbar-mobile.component.spec.ts
│  │  │  │  │  │  │  └─ navbar-mobilecomponent.ts
│  │  │  │  │  │  ├─ navbar-submenu
│  │  │  │  │  │  │  ├─ navbar-submenu.component.css
│  │  │  │  │  │  │  ├─ navbar-submenu.component.html
│  │  │  │  │  │  │  ├─ navbar-submenu.component.spec.ts
│  │  │  │  │  │  │  └─ navbar-submenu.component.ts
│  │  │  │  │  │  ├─ navbar.component.css
│  │  │  │  │  │  ├─ navbar.component.html
│  │  │  │  │  │  ├─ navbar.component.spec.ts
│  │  │  │  │  │  ├─ navbar.component.ts
│  │  │  │  │  │  └─ profile-menu
│  │  │  │  │  │     ├─ profile-menu.component.css
│  │  │  │  │  │     ├─ profile-menu.component.html
│  │  │  │  │  │     ├─ profile-menu.component.spec.ts
│  │  │  │  │  │     └─ profile-menu.component.ts
│  │  │  │  │  └─ sidebar
│  │  │  │  │     ├─ sidebar-menu
│  │  │  │  │     │  ├─ sidebar-menu.component.css
│  │  │  │  │     │  ├─ sidebar-menu.component.html
│  │  │  │  │     │  ├─ sidebar-menu.component.spec.ts
│  │  │  │  │     │  └─ sidebar-menu.component.ts
│  │  │  │  │     ├─ sidebar-submenu
│  │  │  │  │     │  ├─ sidebar-submenu.component.css
│  │  │  │  │     │  ├─ sidebar-submenu.component.html
│  │  │  │  │     │  ├─ sidebar-submenu.component.spec.ts
│  │  │  │  │     │  └─ sidebar-submenu.component.ts
│  │  │  │  │     ├─ sidebar.component.css
│  │  │  │  │     ├─ sidebar.component.html
│  │  │  │  │     ├─ sidebar.component.spec.ts
│  │  │  │  │     └─ sidebar.component.ts
│  │  │  │  ├─ layout.component.css
│  │  │  │  ├─ layout.component.html
│  │  │  │  ├─ layout.component.spec.ts
│  │  │  │  ├─ layout.component.ts
│  │  │  │  ├─ layout.routes.ts
│  │  │  │  └─ services
│  │  │  │     ├─ menu.service.spec.ts
│  │  │  │     └─ menu.service.ts
│  │  │  └─ uikit
│  │  │     ├─ pages
│  │  │     │  └─ table
│  │  │     │     ├─ components
│  │  │     │     │  ├─ table-action
│  │  │     │     │  │  ├─ table-action.component.css
│  │  │     │     │  │  ├─ table-action.component.html
│  │  │     │     │  │  ├─ table-action.component.spec.ts
│  │  │     │     │  │  └─ table-action.component.ts
│  │  │     │     │  ├─ table-footer
│  │  │     │     │  │  ├─ table-footer.component.css
│  │  │     │     │  │  ├─ table-footer.component.html
│  │  │     │     │  │  ├─ table-footer.component.spec.ts
│  │  │     │     │  │  └─ table-footer.component.ts
│  │  │     │     │  ├─ table-header
│  │  │     │     │  │  ├─ table-header.component.css
│  │  │     │     │  │  ├─ table-header.component.html
│  │  │     │     │  │  ├─ table-header.component.spec.ts
│  │  │     │     │  │  └─ table-header.component.ts
│  │  │     │     │  └─ table-row
│  │  │     │     │     ├─ table-row.component.css
│  │  │     │     │     ├─ table-row.component.html
│  │  │     │     │     ├─ table-row.component.spec.ts
│  │  │     │     │     └─ table-row.component.ts
│  │  │     │     ├─ model
│  │  │     │     │  └─ user.model.ts
│  │  │     │     ├─ services
│  │  │     │     │  └─ table-filter.service.ts
│  │  │     │     ├─ table.component.css
│  │  │     │     ├─ table.component.html
│  │  │     │     ├─ table.component.spec.ts
│  │  │     │     └─ table.component.ts
│  │  │     ├─ uikit.component.css
│  │  │     ├─ uikit.component.html
│  │  │     ├─ uikit.component.spec.ts
│  │  │     ├─ uikit.component.ts
│  │  │     └─ uikit.routes.ts
│  │  ├─ services
│  │  │  └─ auth.service.spec.ts
│  │  └─ shared
│  │     ├─ components
│  │     │  ├─ button
│  │     │  │  ├─ button.component.css
│  │     │  │  ├─ button.component.html
│  │     │  │  ├─ button.component.spec.ts
│  │     │  │  └─ button.component.ts
│  │     │  ├─ datepicker
│  │     │  │  └─ datepicker.component.ts
│  │     │  ├─ responsive-helper
│  │     │  │  ├─ responsive-helper.component.css
│  │     │  │  ├─ responsive-helper.component.html
│  │     │  │  ├─ responsive-helper.component.spec.ts
│  │     │  │  └─ responsive-helper.component.ts
│  │     │  └─ user-profile
│  │     │     ├─ user-profile.component.css
│  │     │     ├─ user-profile.component.html
│  │     │     ├─ user-profile.component.spec.ts
│  │     │     └─ user-profile.component.ts
│  │     ├─ directives
│  │     │  ├─ click-outside.directive.ts
│  │     │  └─ flatpickr.directive.ts
│  │     ├─ dummy
│  │     │  └─ user.dummy.ts
│  │     ├─ models
│  │     │  └─ chart-options.ts
│  │     ├─ pipes
│  │     ├─ utils
│  │     │  └─ ckassnames.ts
│  │     └─ validators
│  ├─ assets
│  │  ├─ avatars
│  │  │  └─ avt-01.jpg
│  │  ├─ bg
│  │  │  └─ auth.png
│  │  ├─ icons
│  │  │  ├─ google-logo.svg
│  │  │  ├─ heroicons
│  │  │  │  ├─ outline
│  │  │  │  │  ├─ arrow-long-left.svg
│  │  │  │  │  ├─ arrow-long-right.svg
│  │  │  │  │  ├─ arrow-sm-right.svg
│  │  │  │  │  ├─ arrow-sm-up.svg
│  │  │  │  │  ├─ bell.svg
│  │  │  │  │  ├─ bookmark.svg
│  │  │  │  │  ├─ chart-bar.svg
│  │  │  │  │  ├─ chart-pie.svg
│  │  │  │  │  ├─ cog-6-tooth.svg
│  │  │  │  │  ├─ cog.svg
│  │  │  │  │  ├─ cube.svg
│  │  │  │  │  ├─ cursor-click.svg
│  │  │  │  │  ├─ dots-horizontal.svg
│  │  │  │  │  ├─ download.svg
│  │  │  │  │  ├─ ellipsis-vertical.svg
│  │  │  │  │  ├─ exclamation-triangle.svg
│  │  │  │  │  ├─ eye-off.svg
│  │  │  │  │  ├─ eye.svg
│  │  │  │  │  ├─ folder.svg
│  │  │  │  │  ├─ gift.svg
│  │  │  │  │  ├─ information-circle.svg
│  │  │  │  │  ├─ lock-closed.svg
│  │  │  │  │  ├─ logout.svg
│  │  │  │  │  ├─ magnifying-glass.svg
│  │  │  │  │  ├─ menu.svg
│  │  │  │  │  ├─ minus.svg
│  │  │  │  │  ├─ moon.svg
│  │  │  │  │  ├─ pencil-square.svg
│  │  │  │  │  ├─ pencil.svg
│  │  │  │  │  ├─ plus.svg
│  │  │  │  │  ├─ refresh.svg
│  │  │  │  │  ├─ shield-check.svg
│  │  │  │  │  ├─ shield-exclamation.svg
│  │  │  │  │  ├─ sun.svg
│  │  │  │  │  ├─ user-circle.svg
│  │  │  │  │  ├─ users.svg
│  │  │  │  │  ├─ view-grid.svg
│  │  │  │  │  └─ x.svg
│  │  │  │  └─ solid
│  │  │  │     ├─ chevron-double-left.svg
│  │  │  │     ├─ chevron-right.svg
│  │  │  │     └─ play.svg
│  │  │  ├─ logo.svg
│  │  │  ├─ logonew.svg
│  │  │  ├─ logo_master.svg
│  │  │  └─ tablericons
│  │  │     ├─ arrows-shuffle-2.svg
│  │  │     ├─ headphones.svg
│  │  │     ├─ player-skip-back-filled.svg
│  │  │     ├─ player-skip-forward-filled.svg
│  │  │     ├─ repeat.svg
│  │  │     ├─ text-direction-ltr.svg
│  │  │     └─ text-direction-rtl.svg
│  │  ├─ illustrations
│  │  │  ├─ 404.svg
│  │  │  └─ 500.svg
│  │  ├─ images
│  │  │  ├─ auth-screens.png
│  │  │  ├─ img-01.jpg
│  │  │  ├─ img-02.jpg
│  │  │  ├─ img-03.jpg
│  │  │  └─ podcast-episode.png
│  │  ├─ preview
│  │  │  ├─ logo.png
│  │  │  └─ preview.gif
│  │  └─ styles
│  │     └─ apexchart.css
│  ├─ custom-theme.scss.bak
│  ├─ environments
│  │  ├─ environment.prod.ts
│  │  └─ environment.ts
│  ├─ favicon.ico
│  ├─ hmr.ts
│  ├─ index.html
│  ├─ main.ts
│  ├─ polyfills.ts
│  ├─ styles
│  │  ├─ animations.css
│  │  └─ variables.css
│  ├─ styles.css
│  ├─ test.ts
│  └─ types
│     └─ json.d.ts
├─ tailwind.config.full.js
├─ tailwind.config.js
├─ Testpages
│  ├─ highcharts-example.html
│  ├─ highcharts-example2.html
│  └─ response.json
├─ tests-e2e
│  ├─ navbar.e2e.spec.ts
│  ├─ sidebar.e2e.spec.ts
│  └─ table.e2e.spec.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.spec.json
└─ webpack.config.js

```