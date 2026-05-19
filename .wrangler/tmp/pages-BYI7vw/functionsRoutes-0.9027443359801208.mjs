import { onRequestGet as __api_lifetime_spots_js_onRequestGet } from "C:\\dev\\donbrico-net\\functions\\api\\lifetime-spots.js"
import { onRequestGet as __api_resolve_license_js_onRequestGet } from "C:\\dev\\donbrico-net\\functions\\api\\resolve-license.js"

export const routes = [
    {
      routePath: "/api/lifetime-spots",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_lifetime_spots_js_onRequestGet],
    },
  {
      routePath: "/api/resolve-license",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_resolve_license_js_onRequestGet],
    },
  ]