import {
    Component,
    Vue
} from 'vue-property-decorator'
import AlarmModule from "./components/alarmModule/alarmModule.vue"
import CommonModule from "./components/commonModule/commonModule.vue"

@Component({
    components: {
        AlarmModule,
        CommonModule
    }
})
export default class About extends Vue {

    // data

    mounted() {
        //
    }

    // 初始化函数
    init() {
        //
    }

}