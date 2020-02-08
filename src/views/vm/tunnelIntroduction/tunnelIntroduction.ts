import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    TunnelIntroductionData
} from '@/types/views/tunnelIntroduction.interface'
import {
    ExtendDate
} from '@/utils/common'
import {
    listTunnelIntroductionData,
    listEquipmentStatisticsData
} from '@/api/tunnelIntroduction'


@Component({})
export default class About extends Vue {

    tunnelIntroductIMG: string = require('@/assets/images/vm/operatManage-bg.png')
    guideIcon: string = require("@/assets/images/vm/guide-icon.png")
    tunnelIcon: string = require("@/assets/images/vm/tunnel-icon.png")
    equipmentIcon: string = require("@/assets/images/vm/equipment-icon.png")
    timeIcon: string = require("@/assets/images/vm/time-icon.png")

    // data
    TData: TunnelIntroductionData = {
        isTrue: false
    }
    equipmentStatisticsData: any = []

    totalEquipment: number = 0
    safeOperatDay: number = 10

    get date() {
        return new ExtendDate()
    }
    mounted() {
        this.listTunnelIntroductionData()
        this.listEquipmentStatisticsData()
    }

    listTunnelIntroductionData() {
        return listTunnelIntroductionData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.TData = {
                    isTrue: true,
                    value: '1',
                    tunnelInfo: data
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    listEquipmentStatisticsData() {
        return listEquipmentStatisticsData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.equipmentStatisticsData = data
                this.equipmentStatisticsData.forEach((item: any) => {
                    this.totalEquipment += item.eVal
                })

            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}