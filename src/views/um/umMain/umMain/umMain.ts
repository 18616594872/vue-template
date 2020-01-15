import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    extendDate
} from '@/utils/common'
import {
    getRunMessage
} from '@/api/commonModule'

@Component({})
export default class UMMain extends Vue {

    topBg: string = require('@/assets/images/um/footLine.png')
    customer: string = require("@/assets/images/um/customer.png")
    documents: string = require("@/assets/images/um/documents.png")
    energy: string = require("@/assets/images/um/energy.png")
    contract: string = require("@/assets/images/um/contract.png")
    space: string = require("@/assets/images/um/space.png")
    faultyEquipment: string = require("@/assets/images/um/faultyEquipment.png")
    safe: string = require("@/assets/images/um/safe.png")
    environment: string = require("@/assets/images/um/environment.png")
    monitor: string = require("@/assets/images/um/monitor.png")
    dataAnalysis: string = require("@/assets/images/um/dataAnalysis.png")
    position: string = require("@/assets/images/um/position.png")
    virtualInspect: string = require("@/assets/images/um/virtualInspect.png")
    equipments: string = require("@/assets/images/um/equipments.png")
    patrolTask: string = require("@/assets/images/um/patrolTask.png")
    defect: string = require("@/assets/images/um/defect.png")
    fire: string = require("@/assets/images/um/fire.png")
    patrol: string = require("@/assets/images/um/patrol.png")
    overhaul: string = require("@/assets/images/um/overhaul.png")
    enterGallery: string = require("@/assets/images/um/enterGallery.png")

    timerChange: any
    nowTime: string = ''
    nowDate: string = ''
    safeDays: number = 0

    get routers(): any[] {
        return this.$store.state.permission.routers;
    }

    mounted() {
        this.updateTime()
        this.init()
        this.timerChange = setInterval(this.updateTime, 1000);
    }

    updateTime() {
        this.nowTime = new extendDate().format("hh:mm:ss");
        this.nowDate = extendDate.getSimpleDate();
    }

    init() {
        return new Promise((resolve, reject) => {
            getRunMessage().then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.safeDays = data.safe
                    resolve()
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    goToMoudle(path: any) {
        if (
            String((this.$router as any).history.current.fullPath).indexOf(
                String(path.path)
            ) < 0
        ) {
            this.$router.push(path);
        }
    }

    logout() {
        this.$Modal.confirm({
            title: "注销",
            width: "25vw",
            content: "<p>确认退出吗?</p>",
            onOk: () => {
                this.$store
                    .dispatch("logout")
                    .then(() => {
                        this.$router.push("/VMlogin");
                    })
                    .catch((msg: string) => {
                        this.$Message.error(msg);
                    });
            }
        });
    }

    findPath(url: string) {
        let tempUrl = url.split("/").filter(a => a !== "")
        let len = tempUrl.length
        let result = false
        //根据vux中的权限表盘的用户是否有菜单权限
        this.routers.forEach(b => {
            let index: number = 0
            let curItem: any
            if (
                b.path.replace("/", "").toLowerCase() ==
                tempUrl[index].toLowerCase()
            ) {
                curItem = b.children
                index++
                result = true
                while (index < len && curItem && result) {
                    let temp = curItem.filter(
                        (c: any) =>
                        c.path
                        .toLowerCase()
                        .indexOf(tempUrl[index].toLowerCase()) > -1
                    )
                    if (temp.length > 0) {
                        if (index < len - 1 && temp[0].children) {
                            curItem = temp[0].children
                        }
                        index++
                        result = true
                    } else {
                        result = false
                    }
                }
            }
        });
        return result
    }

    beforeDestroy() {
        clearInterval(this.timerChange);
    }
}