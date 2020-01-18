import { Component, Vue } from 'vue-property-decorator'
import { EquipmentType, Title } from '@/types/views/controllerModule.interface'
import ModuleTitle from '../moduleTitle/moduleTitle.vue'
import { listComplexobjData } from '@/api/controllerModule.ts'

@Component({
    components: {
        ModuleTitle
    }
})
export default class About extends Vue {
    // title: string = "控制类监测"
    title: Title = {
        name: '控制类监测',
        showFlag: true,
        turnTo: '综合监控'
    }
    iconSize: number = window.innerWidth * 0.012
    freshTime: number = 60000
    isFresh: boolean = true
    jinggai: EquipmentType = {
        name: "智能井盖",
        url: require("@/assets/images/vm/jinGai.png"),
        open: 0,
        close: 0,
        fault: 0,
        other: 0
    }
    baiye: EquipmentType = {
        name: "电动百叶",
        url: require("@/assets/images/vm/百叶-开.png"),
        open: 0,
        close: 0,
        fault: 0,
        other: 0
    }
    fengji: EquipmentType = {
        name: "风机",
        url: require("@/assets/images/vm/风机.png"),
        open: 0,
        close: 0
    }
    zhaoming: EquipmentType = {
        name: "照明",
        url: require("@/assets/images/vm/照明-开.png"),
        open: 0,
        close: 0
    }
    shuibeng: EquipmentType = {
        name: "水泵",
        url: require("@/assets/images/vm/水泵.png"),
        open: 0,
        close: 0
    }

    mounted() {
        this.getComplexobjDatas();
    }
    //methods
    getComplexobjDatas() {
        this.getListComplexobjData().then(
                (result: any) => {
                    for (let index in result) {
                        switch (result[index].typeId) {
                            case 56:
                                this.jinggai.open = result[index].open
                                this.jinggai.close = result[index].close + result[index].other
                                this.jinggai.fault = result[index].fault
                                // this.jinggai.other = result[index].other
                                break;
                            case 58:
                                this.baiye.open = result[index].open
                                this.baiye.close = result[index].close + result[index].other
                                this.baiye.fault = result[index].fault
                                // this.baiye.other = result[index].other
                                break;
                            case 10:
                                this.fengji.open = result[index].open
                                this.fengji.close = result[index].close
                                break;
                            case 12:
                                this.zhaoming.open = result[index].open
                                this.zhaoming.close = result[index].close
                                break;
                            case 59:
                                this.shuibeng.open = result[index].open
                                this.shuibeng.close = result[index].close
                                break;

                            default:
                                break;
                        }
                    }
                },
                (error: any) => {
                    this.Log.info(error);
                }
            )
            .finally(() => {
                if (this.isFresh) {
                    let _this = this
                    setTimeout(() => {
                        _this.getComplexobjDatas()
                    }, _this.freshTime)
                }
            });
    }
    getListComplexobjData() {
        return new Promise((resolve: any, reject: any) => {
            listComplexobjData()
                .then((rel: any) => {
                    let { code, data } = rel.data
                    if (code === 200) {
                        resolve(data)
                    }
                })
        })
    }
    beforeDestroy() {
        this.isFresh = false
    }
    
}
