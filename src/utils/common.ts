import Cookies from 'js-cookie'

const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
      localStorage.setItem(TOKEN_KEY, token)
      
}
export const getToken = () => {
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

const COOKIES_KEY: string = 'user'

//设置cookie
export const setCookie = (name: string, pwd: string, exdays: number) => {
	Cookies.set(
		COOKIES_KEY, {
			name,
			pwd
		}, {
			expires: exdays
		}
	);
}
//读取cookie
export const getCookie = () => {
	if (Cookies.getJSON(COOKIES_KEY)) {
		let {
			name,
			pwd
		} = Cookies.getJSON(COOKIES_KEY)

		if(name || pwd){
			return {
				name,
				pwd
			}
		}else {
			return false
		}
	}
}
//清除cookie
export const clearCookie = () => {
	Cookies.remove(COOKIES_KEY)
}
 
export const loadDefault = () => {
	if (Cookies.getJSON(COOKIES_KEY)) {
		return true
	}else {
		return false
	}
}