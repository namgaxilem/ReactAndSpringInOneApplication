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
  catalogURL: 'http://localhost:8080/'
}


export { config }