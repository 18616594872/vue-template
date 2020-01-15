import { Component, Vue, Prop } from 'vue-property-decorator'
import { ModuleTitleData } from '@/types/views/moduleTitle.interface'
// import from "@/components" // 组件
// import {  } from '@/api/ModuleTitle.ts'

@Component({})
export default class About extends Vue {

    //prop
    @Prop()name!: string
    @Prop({
        default: true
    })showFlag!: boolean
    @Prop({
        default: ''
    })turnTo!: string
    // data
    data: ModuleTitleData = {
        pageName: 'ModuleTitle'
    }

    mounted() {
        //
    }

    // 初始化函数
    init() {
        //
    }
    
}
