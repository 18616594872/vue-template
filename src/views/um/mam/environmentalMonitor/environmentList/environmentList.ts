import { Component, Vue } from 'vue-property-decorator'
import equipmentDetail from '@/components/um/equipmentDetail.vue'

@Component({
    components: {
        equipmentDetail
    }
})
export default class About extends Vue {

    // data
    equipmentDataList: any[] = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]

    mounted() {
        //
    }

    // 初始化函数
    init() {
        //
    }
    
}
