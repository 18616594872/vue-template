
export interface CorssBarChartData {
    id: string,
    title: string,
    titleColor: string,
    legendData: any[],
    legendColor: string,
    barColor: any[],
    xData: any[],
    series: any[],
    splitLineColor?: any[],
    option?: any
}

export interface TaskCount {
    nowYearTaskCount: number,
    isRise: boolean
}

export interface DefectCount {
    nowYearDefectCount: number,
    isRise: boolean
}

export interface MaintenanceCount {
    nowYearOrderCount: number,
    isRise: boolean
}

export interface MaintenanceRateCount {
    nowYearOrderPercentage: number,
    isRise: boolean
}

export interface Title {
    name: string,
    showFlag: boolean,
    turnTo: string
}