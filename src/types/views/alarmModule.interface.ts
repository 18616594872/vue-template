export interface Total {
    number: number,
    isRise: boolean
}

export interface CarouselInfo {
    intervalId: number,
    totalId?: number,
    listId?: number,
    totalPage: number,
    pageSize: number,
    curPage: number,
    isCarousel: boolean,
    time: number
}

export interface Refresh {
    total: boolean,
    list: boolean,
    time: number,
    intervalId: number
}

export interface YearAndMonthAlarm {
    key: string,
    value: number,
    isRise: boolean
}

export interface AlarmPart {
    alarmTime: number,
    alarmLevel: string,
    id: number,
    location: string,
    name: number,
    bgColor?: string,
    color?: string,
    buttonText?: string
}

export interface AlarmCount {
    key: string,
    val: number
}