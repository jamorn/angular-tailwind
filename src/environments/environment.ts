// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5112',  // หรือ https://localhost:7112 ถ้าใช้ HTTPS
  useMockData: true, // true เมื่อต้องการใช้ Mock Data และเมื่อต้องการใช้ เมื่อต้องการใช้ Real API ให้เปลี่ยนเป็น false
  auth: {
    testUsers: {
      admin: 'kittithuch.u - 557',
      user: 'weerachai.in - 1102',
      super: 'nirut.p - 2341'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
