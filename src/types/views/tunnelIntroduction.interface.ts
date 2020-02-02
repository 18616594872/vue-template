
import { baseData } from './environmentMonitor.interface'

interface tunnelData {
    id: number,
    name: string,
    description: string
}

export interface TunnelIntroductionData extends baseData{
    tunnelInfo?: tunnelData[]
}

