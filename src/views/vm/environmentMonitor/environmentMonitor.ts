import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    EnvironmentMonitorData,
    SecurityMonitorData
} from '@/types/views/environmentMonitor.interface'
import {
    listEnvironmentMonitorData,
    listSecurityData
} from '@/api/environmentMonitor'

@Component({})
export default class About extends Vue {

    environmentMonitorIMG: string = require("@/assets/images/vm/tunnel-bg.png")
    tunnelIcon: string = require("@/assets/images/vm/tunnel-icon.png")

    // data
    EMData: EnvironmentMonitorData = {
        isTrue: false
    }
    SEData: SecurityMonitorData = {
        isTrue: false
    }

    mounted() {
        this.listEnvironmentMonitorData()
        this.listSecurityData()
    }

    listEnvironmentMonitorData() {
        let {
            EMData
        } = this
        return listEnvironmentMonitorData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.EMData = {
                    isTrue: true,
                    value: '1',
                    environmentMonitorInfo: data
                }
            }
        }).catch(error => {
            (this as any).Log.warn(error)
        })
    }

    listSecurityData() {
        let {
            SEData
        } = this
        return listSecurityData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.SEData = {
                    isTrue: true,
                    value: '1',
                    securityMonitorInfo: data
                }
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }
}