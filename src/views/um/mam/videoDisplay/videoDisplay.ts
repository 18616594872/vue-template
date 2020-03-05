import { Component, Vue } from 'vue-property-decorator'
// import {  } from '@/types/views/videoDisplay.interface'
import Title from '@/components/um/umtitle.vue'
import { TitleBlock } from '@/types/components/umtitle.interface'
import SelectTemp from '@/components/um/selectTemp.vue'
import { SelectData } from '@/types/components/selectTemp.interface'
import { listTunnelInfo } from '@/api/tunnelManage'
import VideoLoop from '@/components/videoLoop/videoLoop.vue'

@Component({
    components: { Title, SelectTemp, VideoLoop }
})
export default class About extends Vue {

    videoDisplayTitle: TitleBlock = {
        titleIcon: require('@/assets/images/um/video-icon.png'),
        title: '视频展示'
    }

    tunnels: any[] = []

    tunnelSelect: SelectData = {
        selectOption: [],
        type: 'border',
        defaultValue: 0
    }

    videos: any[] = []

    mounted() {
        this.listTunnelInfo()
    }

    listTunnelInfo() {
        let params = {
            tunnel: true
        }
        return new Promise((resolve, reject) => {
            listTunnelInfo(params).then(res => {
                let { code, data, msg } = res.data
                if (code === 200) {
                    this.tunnels = data
                    this.tunnelSelect.selectOption = this.tunnels
                    resolve()
                } else {
                    this.$Message.error('查询管廊信息失败！')
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
    
}
