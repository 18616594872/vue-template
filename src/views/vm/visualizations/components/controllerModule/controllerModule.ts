import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    EquipmentType,
    Title
} from '@/types/views/controllerModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import {
    listComplexobjData
} from '@/api/controllerModule'

@Component({
    components: {
        ModuleTitle
    }
})
export default class About extends Vue {
    title: Title = {
        name: '控制类监测',
        showFlag: true,
        turnTo: '综合监控'
    }
    equipmentState: EquipmentType[] = [{
            typeId: 56,
            name: "智能井盖",
            url: require("@/assets/images/vm/jinGai.png"),
            open: 0,
            close: 0,
            fault: 0
        },
        {
            typeId: 58,
            name: "电动百叶",
            url: require("@/assets/images/vm/layer-open.png"),
            open: 0,
            close: 0,
            fault: 0
        },
        {
            typeId: 10,
            name: "风机",
            url: require("@/assets/images/vm/draught_fan.png"),
            open: 0,
            close: 0
        },
        {
            typeId: 12,
            name: "照明",
            url: require("@/assets/images/vm/light-open.png"),
            open: 0,
            close: 0
        },
        {
            typeId: 59,
            name: "水泵",
            url: require("@/assets/images/vm/water_pump.png"),
            open: 0,
            close: 0
        }
    ]

    mounted() {
        this.getComplexobjDatas()
    }
    // methods
    getComplexobjDatas() {
        this.getListComplexobjData().then(
                (result: any) => {
                    for (let complex of result) {
                        this.equipmentState.forEach((item: EquipmentType) => {
                            if (item.typeId === complex.typeId) {
                                item.open = complex.open
                                item.close = complex.close

                                if (complex.typeId === 56 || complex.typeId === 58){
                                    item.fault = complex.fault
                                } 
                            }
                        })

                    }
                }
            )
            .catch((err: any) => {
                (this as any).Log.info(err)
            })
    }
    getListComplexobjData() {
        return listComplexobjData()
            .then((rel: any) => {
                let {
                    code,
                    data
                } = rel.data
                if (code === 200) {
                    return data
                }
            })
    }

}