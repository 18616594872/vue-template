import Cookies from 'js-cookie'

export const TOKEN_KEY: string = 'token'
export const USERNAME_KEY: string = 'userName'
export const PASSWORD_KEY: string = 'userName'
export const setToken = (KEY: string, token: string) => {
    localStorage.setItem(KEY, token)

}
export const getToken = (KEY: string) => {
    const token = localStorage.getItem(KEY)
    if (token) {
        return token
    } else {
        return false
    }
}
export const removeToken = (KEY: string) => {
    localStorage.removeItem(KEY)
}

const COOKIES_KEY: string = 'user'

// 设置cookie
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
// 读取cookie
export const getCookie = () => {
    if (Cookies.getJSON(COOKIES_KEY)) {
        let {
            name,
            pwd
        } = Cookies.getJSON(COOKIES_KEY)

        if (name || pwd) {
            return {
                name,
                pwd
            }
        } else {
            return false
        }
    }
}
// 清除cookie
export const clearCookie = () => {
    Cookies.remove(COOKIES_KEY)
}

export const loadDefault = () => {
    if (Cookies.getJSON(COOKIES_KEY)) {
        return true
    } else {
        return false
    }
}

export class extendDate extends Date {
    private static dataInstance: extendDate = new extendDate()
    format(format: string) {
        let date: any = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        }
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                    date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return this
    }
    static getSimpleDate() {
        let date: extendDate = this.dataInstance.format('yyyy年MM月dd日')
        let week: string = "星期" + "日一二三四五六".charAt(new Date().getDay())

        return date + " " + week
    }
    static getFormatTime() {
        let date: extendDate = this.dataInstance.format('yyyy年MM月dd日 hh:mm:ss')
        let week: string = "星期" + "日一二三四五六".charAt(new Date().getDay())

        return date + " " + week
    }

}