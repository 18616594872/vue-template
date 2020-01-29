import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    TunnelIntroductionData,
    Day
} from '@/types/views/tunnelIntroduction.interface'
import {
    extendDate
} from '@/utils/common.ts'
import {
    listTunnelIntroductionData,
    listEquipmentStatisticsData
} from '@/api/tunnelIntroduction'
import Bim from '@/components/bim/bim.vue'


@Component({
    components: {
        Bim
    }
})
export default class About extends Vue {

    tunnelIntroductIMG: string = require('@/assets/images/bv/operatManage-bg.png')
    pageTitleIMG: string = require("@/assets/images/bv/page-title-bg.png")
    tunnelCollapseIMG: string = require("@/assets/images/bv/energy-bg.png")
    guideIcon: string = require("@/assets/images/bv/guide-icon.png")
    tunnelIcon: string = require("@/assets/images/bv/tunnel-icon.png")
    equipmentIcon: string = require("@/assets/images/bv/equipment-icon.png")
    timeIMG: string = require("@/assets/images/bv/time-bg.png")
    timeIcon: string = require("@/assets/images/bv/time-icon.png")

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
    cameraAngle: any = {
        longitude: 112.488275,
        latitude: 37.713998,
        height: -3.13,
        roll: 6.283185,
        pitch: -0.174532,
        heading: 1.780236
    }
    openFlight: boolean = true

    get date(){
        return new extendDate()
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
            this.Day.nowWeek = extendDate.getFormatTime()
        }, 1000);
    }

    changFlyRoute(tunnelId: any) {
        (this.$refs.tunnelIntroBim as any).fly(tunnelId)
    }

}