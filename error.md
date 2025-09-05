PS E:\playground\angular-tailwind> ng serve --port 4300
Component HMR has been enabled.
If you encounter application reload issues, you can manually reload the page to bypass HMR and/or disable this feature with the `--no-hmr` command line option.
Please consider reporting any issues you encounter here: https://github.com/angular/angular-cli/issues

Application bundle generation failed. [12.472 seconds]

X [ERROR] TS2307: Cannot find module 'flatpickr' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts:8:22:
      8 │ import flatpickr from 'flatpickr';
        ╵                       ~~~~~~~~~~~


X [ERROR] TS7006: Parameter 'selectedDates' implicitly has an 'any' type. [plugin angular-compiler]

    src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts:184:19:
      184 │         onChange: (selectedDates) => {
          ╵                    ~~~~~~~~~~~~~


X [ERROR] TS2307: Cannot find module 'highcharts' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/giveaway/giveaway.component.ts:3:28:
      3 │ import * as Highcharts from 'highcharts';
        ╵                             ~~~~~~~~~~~~


X [ERROR] TS2307: Cannot find module 'highcharts-angular' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/giveaway/giveaway.component.ts:4:38:
      4 │ import { HighchartsChartModule } from 'highcharts-angular';
        ╵                                       ~~~~~~~~~~~~~~~~~~~~


X [ERROR] TS-991010: 'imports' must be an array of components, directives, pipes, or NgModules.
  Value is of type '[CommonModule, (not statically analyzable), ButtonComponent]'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/giveaway/giveaway.component.ts:20:11:
      20 │   imports: [
         ╵            ^


X [ERROR] TS2307: Cannot find module 'highcharts' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:3:28:
      3 │ import * as Highcharts from 'highcharts';
        ╵                             ~~~~~~~~~~~~


X [ERROR] TS2307: Cannot find module 'highcharts-angular' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:4:38:
      4 │ import { HighchartsChartModule } from 'highcharts-angular';
        ╵                                       ~~~~~~~~~~~~~~~~~~~~


X [ERROR] TS-991010: 'imports' must be an array of components, directives, pipes, or NgModules.
  Value is of type '[CommonModule, (not statically analyzable)]'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:9:11:
      9 │   imports: [
        ╵            ^


X [ERROR] TS7023: 'formatter' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:236:6:
      236 │       formatter: function() {
          ╵       ~~~~~~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:237:18:
      237 │         if (!this.points) return '';
          ╵                   ~~~~~~


X [ERROR] TS7022: 'category' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:240:14:
      240 │         const category = this.points[0].key || '';  // ใช้ ...
          ╵               ~~~~~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:240:30:
      240 │         const category = this.points[0].key || '';  // ใช้ ...
          ╵                               ~~~~~~


X [ERROR] TS7022: 'html' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:242:12:
      242 │         let html = `
          ╵             ~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:257:13:
      257 │         this.points.forEach(point => {
          ╵              ~~~~~~


X [ERROR] TS7006: Parameter 'point' implicitly has an 'any' type. [plugin angular-compiler]

    src/app/modules/dashboard/pages/monthlyeii/monthly-eii.component.ts:257:28:
      257 │         this.points.forEach(point => {
          ╵                             ~~~~~


X [ERROR] TS2307: Cannot find module 'highcharts' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/oee/oee.component.ts:4:28:
      4 │ import * as Highcharts from 'highcharts';
        ╵                             ~~~~~~~~~~~~


X [ERROR] TS2307: Cannot find module 'highcharts-angular' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/pages/oee/oee.component.ts:5:38:
      5 │ import { HighchartsChartModule } from 'highcharts-angular';
        ╵                                       ~~~~~~~~~~~~~~~~~~~~


X [ERROR] TS-991010: 'imports' must be an array of components, directives, pipes, or NgModules.
  Value is of type '[CommonModule, (not statically analyzable), ButtonComponent]'. [plugin angular-compiler]

    src/app/modules/dashboard/pages/oee/oee.component.ts:20:11:
      20 │   imports: [
         ╵            ^


X [ERROR] TS2307: Cannot find module 'highcharts' or its corresponding type declarations. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:2:28:
      2 │ import * as Highcharts from 'highcharts';
        ╵                             ~~~~~~~~~~~~


X [ERROR] TS7023: 'formatter' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:122:8:
      122 │         formatter: function() {
          ╵         ~~~~~~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:123:20:
      123 │           if (!this.points) return '';
          ╵                     ~~~~~~


X [ERROR] TS7022: 'dateString' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:125:16:
      125 │           const dateString = (this.points[0] as any).point.option...
          ╵                 ~~~~~~~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:125:35:
      125 │ ...   const dateString = (this.points[0] as any).point.options.da...
          ╵                                ~~~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:126:32:
      126 │ ...      const remarks = (this.points[0] as any).point.options.re...
          ╵                                ~~~~~~


X [ERROR] TS7022: 'html' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:129:14:
      129 │           let html = `
          ╵               ~~~~


X [ERROR] TS2339: Property 'points' does not exist on type '{ backgroundColor: string; style: { color: string; }; borderWidth: number; borderRadius: number; shadow: boolean; animation: boolean; useHTML: boolean; shared: boolean; formatter: () => any; }'. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:149:15:
      149 │           this.points.forEach(point => {
          ╵                ~~~~~~


X [ERROR] TS7006: Parameter 'point' implicitly has an 'any' type. [plugin angular-compiler]

    src/app/modules/dashboard/services/chart.service.ts:149:30:
      149 │           this.points.forEach(point => {
          ╵                               ~~~~~


X [ERROR] TS2305: Module '"angular-svg-icon"' has no exported member 'provideAngularSvgIcon'. [plugin angular-compiler]

    src/main.ts:9:9:
      9 │ import { provideAngularSvgIcon } from 'angular-svg-icon';
        ╵          ~~~~~~~~~~~~~~~~~~~~~


X [ERROR] Could not resolve "node_modules/flatpickr/dist/flatpickr.min.css"

    angular:styles/global:styles:1:8:
      1 │ @import 'node_modules/flatpickr/dist/flatpickr.min.css';
        ╵         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  You can mark the path "node_modules/flatpickr/dist/flatpickr.min.css" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.


X [ERROR] Could not resolve "node_modules/flatpickr/dist/themes/dark.css"

    angular:styles/global:styles:2:8:
      2 │ @import 'node_modules/flatpickr/dist/themes/dark.css';
        ╵         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  You can mark the path "node_modules/flatpickr/dist/themes/dark.css" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.


Watch mode enabled. Watching for file changes...