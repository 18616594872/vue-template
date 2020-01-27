import {
    Component,
    Vue
} from 'vue-property-decorator'
import AlarmModule from "./components/alarmModule/alarmModule.vue"
import CommonModule from "./components/commonModule/commonModule.vue"
import EquipmentModule from "./components/equipmentModule/equipmentModule.vue"
import ControllerModule from './components/controllerModule/controllerModule.vue'
import InspectModule from "./components/inspectModule/inspectModule.vue"
import MotionModule from "./components/motionModule/motionModule.vue"
import MeasureModule from "./components/measureModule/measureModule.vue"

@Component({
    components: {
        AlarmModule,
        CommonModule,
        EquipmentModule,
        ControllerModule,
        InspectModule,
        MotionModule,
        MeasureModule
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