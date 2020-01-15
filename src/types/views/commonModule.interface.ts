export interface BarChart {
    id: string,
    title: string,
    unit: string,
    yAxis: any,
    series: any,
    titleColor: string
}

export interface RunMessage {
    startTime: any,
    safe: number
}

export interface Title {
    name: string,
    showFlag: boolean,
    turnTo: string
}