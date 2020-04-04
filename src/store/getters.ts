const getters = {
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  routelist: (state: any) => state.user.routelist,
  routers: (state: any) => state.permission.routers,
  leftTreeRouters: (state: any) => state.common.leftTreeRouters
}
export default getters