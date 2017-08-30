// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: true,
  hostUrl: "http://localhost:8090",
  casePath: "/api/case",
  doctorAnswerHoursDecrementInterval: 1000 * 3600,
  doctorAvatar: "https://maxcdn.icons8.com/Share/icon/Healthcare//medical_doctor1600.png",
  userAvatar: "https://www.shareicon.net/data/512x512/2015/12/06/683349_users_512x512.png",
  loginErrorMessage: "Numele utilizator sau parola incorecte",
  duplicateRegistration: "Utilizator cu acest mail exista deja!",
  useFakeBackend: true
};
