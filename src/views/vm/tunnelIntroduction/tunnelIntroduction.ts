import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    TunnelIntroductionData,
    Day
} from '@/types/views/tunnelIntroduction.interface'
import {
    ExtendDate
} from '@/utils/common.ts'
import {
    listTunnelIntroductionData,
    listEquipmentStatisticsData
} from '@/api/tunnelIntroduction'


@Component({})
export default class About extends Vue {

    tunnelIntroductIMG: string = require('@/assets/images/vm/operatManage-bg.png')
    // pageTitleIMG: string = require("@/assets/images/vm/page-title-bg.png")
    // tunnelCollapseIMG: string = require("@/assets/images/vm/energy-bg.png")
    guideIcon: string = require("@/assets/images/vm/guide-icon.png")
    tunnelIcon: string = require("@/assets/images/vm/tunnel-icon.png")
    equipmentIcon: string = require("@/assets/images/vm/equipment-icon.png")
    // timeIMG: string = require("@/assets/images/vm/time-bg.png")
    timeIcon: string = require("@/assets/images/vm/time-icon.png")

    // data
    TData: TunnelIntroductionData = {
        value: "1",
        tunnelInfo: []
    }
    equipmentStatisticsData: any = []

    totalEquipment: number = 0
    time: string = ''
    data: string = ''
    safeOperatNum: number = 0
    Day: Day = {
        nowDate: '',
        nowTime: '',
        nowWeek: '',
        safeOperatDay: 66
    }
    openFlight: boolean = true

    get date() {
        return new ExtendDate()
    }
    mounted() {
        this.listTunnelIntroductionData()
        this.listEquipmentStatisticsData()
        this.getTime()
    }

    listTunnelIntroductionData() {
        let params = {
            tunnel: true
        }
        return listTunnelIntroductionData(params).then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.TData.tunnelInfo = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    listEquipmentStatisticsData() {
        return listEquipmentStatisticsData().then(res => {
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

    getTime() {
        setInterval(() => {
            this.Day.nowDate = this.date.format('yyyy年MM月dd日')
            this.Day.nowTime = this.date.format('HH:mm:ss')
            this.Day.nowWeek = ExtendDate.getFormatTime()
        }, 1000);
    }

    changFlyRoute(tunnelId: any) {
        (this.$refs.tunnelIntroBim as any).fly(tunnelId)
    }

}