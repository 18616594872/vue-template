import Vue from 'vue'

/**
 * 日志等级
 */
enum LogLevel {
    /** 严重错误 主要是程序的错误 */
    ERROR = 1,
        /** 一般警告，比如参数丢失 */
        WARN = 2,
        /** 一般要显示的信息，比如登录登出 */
        INFO = 3,
        /** 程序的调试信息 */
        DEBUG = 4
}

/**
 * 日志工具，单例使用
 */
class LogUtil {
    private static _instance: LogUtil = new LogUtil()
    public static getInstance() {
        return this._instance
    }

    /** 是否开启日志 */
    private _open: boolean = true
    /** 显示的等级 */
    private _level: LogLevel = LogLevel.DEBUG

    /** 设定参数 */
    public setParam(open: boolean, level: string): void {
        this._open = open

        switch (level.toLowerCase()) {
            case "error":
                this._level = LogLevel.ERROR
                break;

            case "warn":
                this._level = LogLevel.WARN
                break;

            case "info":
                this._level = LogLevel.INFO
                break;

            case "debug":
                this._level = LogLevel.DEBUG
                break;

            default:
                break;
        }
    }

    public error(message ?: any, ...parameters: any[]): void {
        if (this.canShow(LogLevel.ERROR)) {
            console.error(message, parameters)
        }
    }

    public warn(message ?: any, ...parameters: any[]): void {
        if (this.canShow(LogLevel.WARN)) {
            console.warn(message, parameters)
        }
    }

    public info(message ?: any, ...parameters: any[]): void {
        if (this.canShow(LogLevel.INFO)) {
            console.info(message, parameters)
        }
    }

    public debug(message ?: any, ...parameters: any[]): void {
        if (this.canShow(LogLevel.DEBUG)) {
            console.log(message, parameters)
        }
    }

    /**
     * 是否能够显示该日志
     * @param level 当前需判断的等级
     */
    private canShow(level: LogLevel): boolean {
        return this._open && this._level >= level
    }
}

// 定义一个全局的日志输出
Vue.prototype.Log = LogUtil.getInstance()