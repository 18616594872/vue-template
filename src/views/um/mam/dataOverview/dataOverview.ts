import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    ElementBoxTitle
} from '@/types/common.interface'
import Title from '@/components/um/umtitle.vue'
import DataBox from '@/components/um/dataBox.vue'
import {
    listMonitorData
} from '@/api/dataDetails'

@Component({
    components: {
        Title,
        DataBox
    }
})
export default class About extends Vue {

    dataOverviewTitle: ElementBoxTitle = {
        titleIcon: require('@/assets/images/um/data-overview-icon.png'),
        text: '数据总览'
    }
    monitorData: any[] = []
    currentIndex: number = 0

    mounted() {
        this.getListMonitorData()
    }
    getListMonitorData() {
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