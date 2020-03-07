import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import Title from '@/components/um/umtitle.vue'
import SelectTemp from '@/components/um/selectTemp.vue'
import {
    SelectData
} from '@/types/components/selectTemp.interface'
import DataBox from '@/components/um/dataBox.vue'
import {
    listTunnel
} from '@/api/commonModule.ts'
import { listMonitorData } from '@/api/dataDetails.ts'

@Component({
    components: {
        Title,
        SelectTemp,
        DataBox
    }
})
export default class About extends Vue {

    dataOverviewTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/data-overview-icon.png'),
        text: '数据总览'
    }

    guideData: any[] = [{
            name: '当前'
        },
        {
            name: '近一周'
        },
        {
            name: '近一月'
        }
    ]

    monitorData: any[] = []

    currentIndex: number = 0
    tunnelSelect: SelectData = {
        selectOption: [],
        type: 'border',
        defaultValue: 0
    }

    mounted() {
        this.listTunnelInfo()
        this.getListMonitorData()
    }

    choosedLi(index: number) {
        this.currentIndex = index
    }

    listTunnelInfo() {
        return listTunnel().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.tunnelSelect.selectOption = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
    getListMonitorData(){
        return listMonitorData().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.monitorData = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}