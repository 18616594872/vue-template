/**
 * @Author: asheng
 * @msg: 存取token
 * @param {string} token
 */
const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
      localStorage.setItem(TOKEN_KEY, token)
      
}
export const getToken = () => {
	// const token = Cookies.get(TOKEN_KEY)
	const token = localStorage.getItem(TOKEN_KEY)
	if (token) {
		return token
	} else {
		return false
	}
}
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}