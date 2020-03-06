<template>
    <div class="controlSimulateData-wrap" @click="locationEquimpent" :style="{background: this.click ? '#191E21' : '#444c56'}">
        <ul class="quip-title-ul">
            <li class="quip-title-li">
                <img :src="srcImg" class="img">
            </li>
            <li class="quip-title-li">
                <h2>{{controlEquipData.ObjName}}</h2>
                <p>{{controlEquipData.location}}</p>
            </li>
        </ul>
        <img class="heardImg" :src="resetBut.Img" v-if="controlEquipData.reset" title="复位" @click="reset">
        <div class="statusContent">
            <ul class="status-ul">
                <li class="status-lis" v-for="item in curImgState" :key="item.id" :style="{width: curImgState.length === 2 ? '50%' : '33.3%'}">
                    <img class="img" :src="item.img" :title="item.val">
                    <span class="span">{{item.val}}</span>
                </li>
            </ul>
            <div class="switch-btn">
                <i-switch v-model="swicthState" @on-change="confirm" size="large" v-if="controlEquipData.control" true-color="#13ce66" false-color="#ff4949">
                    <span slot="open">打开</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </div>
        </div>
        <ul class="quip-bottom-ul">
            <li class="quip-bottom-li">
                <p class="time" v-if="isTimeShow">{{ controlEquipData.time }}</p>
                <p class="time">{{ controlEquipData.objtypeName }}</p>
            </li>
            <li class="quip-bottom-li">
                <div class="min" v-if="controlEquipData.minNormal != null">
                    <img :src="srcImg" class="img">
                </div>
                <div class="max" v-if="controlEquipData.maxNormal != null">
                </div>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch,
        Emit
    } from "vue-property-decorator"
    import {
        EquipDataInterface,
        ImgStatus
    } from '@/types/components/simulateData.ts'
    import {
        keyVal
    } from '@/types/common.interface'

    @Component({})
    export default class About extends Vue {
        @Prop({
            default: Object,
            require: true
        }) controlEquipData!: EquipDataInterface

        // data 
        swicthState: boolean = false
        isTimeShow: boolean = false
        click: boolean = false
        clickTimer: any = null
        srcImg: string = ''
        imgStatusList: ImgStatus[] = [{
                "objtypeId": 63,
                "fun": this.changeImg('place-troop')
            },
            {
                "objtypeId": 12,
                "fun": this.changeImg('lamp')
            },
            {
                "objtypeId": 64,
                "fun": this.changeImg('linkage-status')
            },
            {
                "objtypeId": 10,
                "fun": this.changeImg('draught-fan', true)
            },
            {
                "objtypeId": 58,
                "fun": this.changeImg('shutter', true)
            },
            {
                "objtypeId": 59,
                "fun": this.changeImg('water-pump', true)
            }
        ]
        curImgState: any = []
        resetBut: any = {
            click: false,
            Img: null
        }
        equipStateImg: {
            key: string,
            val: any
        } [] = [{
                key: "close",
                val: {
                    0: "close-close-state",
                    1: "close-open-state"
                }
            },
            {
                key: "open",
                val: {
                    0: "close-close-state",
                    1: "open-open-state"
                }
            },
            {
                key: "run",
                val: {
                    0: "close-close-state",
                    1: "open-open-state"
                }
            },
            {
                key: "fault",
                val: {
                    0: "close-close-state",
                    1: "fault-open-state"
                }
            },
            {
                key: "fault1",
                val: {
                    0: "close-close-state",
                    1: "fault-open-state"
                }
            },
            {
                key: "fault2",
                val: {
                    0: "close-close-state",
                    1: "fault-open-state"
                }
            },
            {
                key: "remote",
                val: {
                    0: "close-close-state",
                    1: "far-open-state"
                }
            }
        ]

        @Watch('controlEquipData', {
            deep: true
        })
        onObjValChange() {
            this.init()
        }
        @Watch('resetBut.click', {
            deep: true
        })
        onButClick() {
            this.loadRestStatusImg()
        }
        // emit 
        @Emit('reset')
        send(id: number){}

        mounted() {
            this.init()

        }

        init() {
            if (this.controlEquipData.time != "") {
                this.isTimeShow = true;
            }

            this.imgStatusList.forEach((img: ImgStatus) => {
                if (img.objtypeId === this.controlEquipData.objtypeId) {
                    img.fun() // 调用函数
                }
            })
            this.loadStatusImg()
            this.loadRestStatusImg()
            this.changeSwitchState()


        }
        locationEquimpent() {
            this.click = !this.click;
            if (this.click) {
                this.clickTimer = setTimeout(() => this.click = false, 2000)
            }
        }
        confirm(data: boolean) {
            let {
                controlEquipData: {
                    objtypeName,
                    ObjName
                }
            } = this
            let text = data ?
                "确定打开" +
                objtypeName +
                ObjName +
                "吗?" :
                "确定关闭 " +
                objtypeName +
                ObjName +
                " 吗?";
            this.$Modal.confirm({
                render: (h: any) => {
                    return h("span", text);
                },
                onOk: () => {
                    console.log('ss')
                }
            });
        }
        reset() {
            this.resetBut.click = !this.resetBut.click
            this.send(this.controlEquipData.id)
            
        }
        loadStatusImg() {
            this.curImgState = []
            let EquipStatus: any = this.controlEquipData.ObjVal
            let EquipStatusKey: string[] = Object.keys(EquipStatus)

            for (let i = 0; i < EquipStatusKey.length; i++) {
                for (let j = this.equipStateImg.length - 1; j > -1; j--) {
                    if (EquipStatusKey[i] === this.equipStateImg[j].key) {
                        this.replaceImage(
                            EquipStatus[EquipStatusKey[i]].value ? 1 : 0,
                            this.equipStateImg[j].val,
                            EquipStatus[EquipStatusKey[i]].descript,
                            EquipStatus[EquipStatusKey[i]].index
                        );
                    }
                }
            }
            this.stateSort()
        }
        replaceImage(curStateVal: number, val: any[], descript: string, item: number) {
            // 加载对应状态图片
            this.curImgState.push({
                img: require(`@/assets/images/um/${val[curStateVal]}.png`),
                val: descript,
                index: item
            });
        }
        stateSort() {
            for (var j = 0; j < this.curImgState.length - 1; j++) {
                for (var i = 0; i < this.curImgState.length - j - 1; i++) {
                    if (
                        this.curImgState[i].index >
                        this.curImgState[i + 1].index
                    ) {
                        var temp = this.curImgState[i];
                        this.curImgState[i] = this.curImgState[i + 1];
                        this.curImgState[i + 1] = temp;
                    }
                }
            }
        }
        loadRestStatusImg() {
            let {
                resetBut
            } = this
            let resetState: string = resetBut.click ? 'reset-open' : 'reset'

            resetBut.Img = require(`@/assets/images/um/${resetState}.png`)

        }
        changeImg(Img: string, gif: boolean = false) {
            let _this = this

            return function() {
                let {
                    ObjVal: {
                        run,
                        close,
                        open
                    }
                } = _this.controlEquipData
                // 筛选图片
                let imgType: string = ''
                let imgName: string = run ?
                    (run.value ? `${Img}-normal` : `${Img}-error`) :
                    (open ? (open.value ? `${Img}-normal` :
                            (close.value ? `${Img}-error` : `${Img}-process`)) :
                        '')
                // 判断图片类型
                if (gif) {
                    imgType = run ?
                        (run.value ? `${imgName}.gif` : `${imgName}.png`) :
                        (open ? (!open.value && !close.value ? `${imgName}.gif` : `${imgName}.png`) : '')
                } else {
                    imgType = imgName + '.png'
                }
                // 加载图片
                _this.srcImg = require(`@/assets/images/um/${imgType}`)
            }
        }
        changeSwitchState() {
            let {
                controlEquipData: {
                    ObjVal
                }
            } = this;

            if (!ObjVal.run && !ObjVal.open) return;

            // 给出设备现在的状态，0：关；1：开；2：打开中或者关闭中；3：故障；-1：出错
            let runState: number = -1;
            if (ObjVal.run) {
                runState = ObjVal.run.value ? 1 : 0;
            } else {
                if (!ObjVal.open.value && ObjVal.close.value) {
                    runState = 0;
                } else if (ObjVal.open.value && !ObjVal.close.value) {
                    runState = 1;
                } else if (!ObjVal.open.value && !ObjVal.close.value) {
                    runState = 2;
                } else {
                    runState = 3;
                }
            }

            this.swicthState = runState == 1
        }
        beforeDestroy() {
            clearTimeout(this.clickTimer);
        }
    }
</script>

<style lang="less">
    .controlSimulateData-wrap {
        width: 100%;
        height: 100%;
        padding: .05rem;
        background: rgb(68, 76, 86);

        .quip-title-ul {
            overflow: hidden;
            padding-top: 3%;

            .quip-title-li {
                float: left;
            }

            >:first-child {
                width: 27%;
                margin-left: 8%;
                text-align: center;

                .img {
                    width: 70%
                }
            }

            >:last-child {
                width: 55%;
                text-align: center;
            }
        }

        .heardImg {
            position: absolute;
            top: .7vmin;
            right: .7vmin;
            width: 1.7vmin;
            height: 1.7vmin;
        }

        .statusContent {
            .status-ul {
                overflow: hidden;

                .status-lis {
                    float: left;
                    text-align: center;

                    .img {
                        width: 30%;
                    }

                    .span {
                        font-size: 1.32vmin;
                        display: block;
                    }
                }
            }

            .switch-btn {
                text-align: center;
                margin: .2vmin 0;
            }
        }

        .quip-center-span {
            text-align: center;
            margin-top: -0.05rem;

            .value {
                font-weight: bold;
                font-size: .3rem;
                margin-right: .1rem;
            }
        }

        .quip-bottom-ul {

            overflow: hidden;
            font-weight: bold;

            .quip-bottom-li {
                float: left;
            }

            >:first-child {
                width: 70%;
                text-align: center;
                font-size: 1.6vmin;

            }

            >:last-child {
                width: 22%;

                .img {
                    width: 70%
                }
            }
        }

    }
</style>