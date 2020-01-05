const getters = {
    token: (state: any) => state.user.token,
    name: (state: any) => state.user.name,
    routelist: (state: any) => state.user.routelist,
    queueName: (state: any) => state.user.queueName
  }
  export default getters