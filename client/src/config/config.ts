declare global {
  interface Window {
    env: any
  }
}
  
  // change with your own variables
// type EnvType = {
//   REACT_APP_COLOR: string,
//   REACT_APP_MAIN_TEXT: string,
//   REACT_APP_LINK_URL: string,
//   REACT_APP_LOGO_URL: string,
//   REACT_APP_CATALOG_URL: string
// }

const config = {
  localStorage: {
    userKey: 'auth_user'
  },
  catalogURL: (window.env && window.env.REACT_APP_CATALOG_URL) || 'http://localhost:8080/v1/catalog'
}

const AADConfig = {
  appId: 'dc8f3d14-355c-4223-80cb-23e938c26027',
  redirectUri: 'http://localhost:8080',
  logoutRedirectUri: 'http://localhost:8080/login',
  scopes: [
      'user.read',
      'openid'
      // 'api://9911dd89-b9c5-4de4-b3bb-265d5c214e91/read-test'
  ],
  authority: 'https://login.microsoftonline.com/d400665f-0274-46fe-899b-38ed0885144a'
}

export { config, AADConfig }