<template>
    <div class="statusDate-wrap" @click="locationEquimpent">
        <ul class="quip-title-ul">
            <li class="quip-title-li">
                <img :src="srcImg" class="img">
            </li>
            <li class="quip-title-li">
                <h2>{{equipStatusData.name}}</h2>
                <p>{{equipStatusData.description}}</p>
            </li>
        </ul>
        <div class="statusDataContent">
            <ul class="status-ul">
                <li class="status-lis">
                    <img :src="equipmentState.closeImage" class="img" :title="equipmentState.closeTitle">
                    <span class="span">{{equipmentState.closeTitle}}</span>
                </li>
                <li class="status-lis">
                    <img :src="equipmentState.openImage" class="img" :title="equipmentState.openTitle">
                    <span class="span">{{equipmentState.openTitle}}</span>
                </li>
            </ul>
        </div>
        <ul class="quip-bottom-ul">
            <li class="quip-bottom-li">
                <p class="time" v-if="isTimeShow">{{ equipStatusData.time }}</p>
                <p class="time">{{ equipStatusData.objtypeName }}</p>
            </li>
            <li class="quip-bottom-li">
                <Icon type="md-trending-up" />
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch
    } from "vue-property-decorator"
    import {
        EquipDataInterface,
        ImgStatus,
        keyVal
    } from '@/types/components/simulateData.ts'
    import { EquipmentProp } from '@/types/views/environmentalMonitor.interface'

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true
        }) equipStatusData!: EquipmentProp

        // data 
        isTimeShow: boolean = false
        click: boolean = false
        clickTimer: any = null
        srcImg: string = ''
        imgStatusList: ImgStatus[] = [{
                "objtypeId": 41,
                "fun": this.changeImg('lamp-alarm')
            },
            {
                "objtypeId": 11,
                "fun": this.changeImg('lamp')
            },
            {
                "objtypeId": 57,
                "fun": this.changeImg('infrared', true)
            }
        ]
        equipStateImg: {
            key: string,
            val: any[]
        } [] = [{
                key: "closeState",
                val: [{
                        key: "closeImage",
                        val: "close-open-state"
                    },
                    {
                        key: "openImage",
                        val: "open-close-state"
                    }
                ]
            },
            {
                key: "openState",
                val: [{
                        key: "closeImage",
                        val: "close-close-state"
                    },
                    {
                        key: "openImage",
                        val: "open-open-state"
                    }
                ]
            }
        ]
        equipmentState: any = {
            closeImage: "",
            openImage: "",
            openTitle: "开",
            closeTitle: "关"
        }

        @Watch('equipStatusData', {
            deep: true
        })
        onObjValChange() {
            this.init()
        }

        mounted() {
            this.init()
        }

        init() {

            if (this.equipStatusData.time != "") {
                this.isTimeShow = true
            }
            // 加载 左上角图片
            this.imgStatusList.forEach((img: ImgStatus) => {
                if (img.objtypeId === this.equipStatusData.objtypeId) {
                    img.fun() // 调用函数
                }
            })
            // 加载设备状态图片
            this.loadImage()
            this.changeSwitchState()

        }
        locationEquimpent() {
            this.click = !this.click;
            if (this.click) {
                this.clickTimer = setTimeout(() => this.click = false, 2000)
            }
        }
        changeImg(Img: string, gif: boolean = false) {
            let _this = this

            return function() {
                let {
                    curValue
                } = _this.equipStatusData

                // 筛选图片
                let imgType: string = ''
                let imgName: string = curValue ? `${Img}-normal` : `${Img}-error`
                // 判断图片类型
                imgType = gif ? `${imgName}.gif` : `${imgName}.png`
                // 加载图片
                _this.srcImg = require(`@/assets/images/um/${imgType}`)
            }
        }
        loadImage() {
            console.log('ssss')
            this.equipStateImg[this.equipStatusData.curValue].val.forEach((state: {
                    key: string,
                    val: string
                }) => {
                    this.equipmentState[state.key] = require(`@/assets/images/um/${state.val}.png`)
                }

            )
        }
        changeSwitchState() {
            let {
                equipStatusData: {
                    curValue
                }
            } = this;

            if (!curValue.run && !curValue.open) return;

            // 给出设备现在的状态，0：关；1：开；2：打开中或者关闭中；3：故障；-1：出错
            let runState: number = -1;
            if (curValue.run) {
                runState = curValue.run.value ? 1 : 0;
            } else {
                if (!curValue.open.value && curValue.close.value) {
                    runState = 0;
                } else if (curValue.open.value && !curValue.close.value) {
                    runState = 1;
                } else if (!curValue.open.value && !curValue.close.value) {
                    runState = 2;
                } else {
                    runState = 3;
                }
            }

            this.swicthState = runState == 1
        }

        beforeDestroy() {
            clearTimeout(this.clickTimer)
        }
    }
</script>

<style lang="less">
    .statusDate-wrap {
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
                text-align: center;
                line-height: .18rem;
                border-radius: 50%;
                width: 0.18rem;
                margin-top: 0.04rem;
                background-color: rgb(108, 124, 157);
                height: .18rem;
                font-size: 0.13rem;
            }
        }

        .statusDataContent {
            .status-ul {
                overflow: hidden;
                width: 80%;
                margin-left: 10%;

                .status-lis {
                    float: left;
                    text-align: center;
                    width: 40%;

                    .img {
                        width: 35%;
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

    }
</style>