<template>
    <div class="equipDetail-wrap" @click="locationEquimpent">
        <ul class="quip-title-ul">
            <li class="quip-title-li">
                <img :src="srcImg" class="img">
            </li>
            <li class="quip-title-li">
                <h2>{{equipDetailData.name}}</h2>
                <p>{{equipDetailData.location}}</p>
            </li>
        </ul>
        <slot>
            <p class="quip-center-span">
                <span class="value">{{ inRange ? equipDetailData.curValue : '故障' }}</span>
                <span style="font-size: 2vmin;font-weight: bold;" v-if="inRange">{{ equipDetailData.unit }}</span>
            </p>
        </slot>
        <ul class="quip-bottom-ul">
            <li class="quip-bottom-li">
                <p class="time" v-if="isTimeShow">{{ equipDetailData.time }}</p>
                <p class="time">{{ equipDetailData.objtypeName }}</p>
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
        Watch,
    } from "vue-property-decorator"
    import {
        EquipDataInterface,
        ImgStatus
    } from '@/types/components/simulateData.ts'
    import {
        EquipmentProp
    } from '@/types/views/environmentalMonitor.interface'

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true
        }) equipDetailData!: EquipmentProp

        // data 
        normal: boolean = true
        isTimeShow: boolean = false
        inRange: boolean = true
        click: boolean = false
        clickTimer: any = null
        srcImg: string = ''
        imgStatusList: ImgStatus[] = [{
                "objtypeId": 1,
                "fun": this.changeImg('temp')
            },
            {
                "objtypeId": 2,
                "fun": this.changeImg('humidity')
            },
            {
                "objtypeId": 3,
                "fun": this.changeImg('O2')
            },
            {
                "objtypeId": 4,
                "fun": this.changeImg('H2S')
            },
            {
                "objtypeId": 5,
                "fun": this.changeImg('CH4')
            },
            {
                "objtypeId": 6,
                "fun": this.changeImg('CO')
            },
            {
                "objtypeId": 8,
                "fun": this.changeImg('temp')
            },
            {
                "objtypeId": 21,
                "fun": this.changeImg('liquidLevel')
            },
            {
                "objtypeId": 65,
                "fun": this.changeImg('LEL')
            }
        ]

        @Watch('equipDetailData.curValue', {
            deep: true
        })
        onObjValChange() {
            this.checkValue()
        }

        mounted() {
            this.checkValue()
            if (this.equipDetailData.time != "") {
                this.isTimeShow = true;
            }
        }

        checkValue() {
            let {
                equipDetailData
            } = this
            this.normal =
                equipDetailData.minNormal != null &&
                equipDetailData.maxNormal != null &&
                (equipDetailData.curValue < equipDetailData.minNormal ||
                    equipDetailData.curValue > equipDetailData.maxNormal) ?
                false :
                true;
            this.inRange =
                equipDetailData.minValue != null &&
                equipDetailData.maxValue != null &&
                (equipDetailData.curValue < equipDetailData.minValue ||
                    equipDetailData.curValue > equipDetailData.maxValue) ?
                false :
                true;

            this.imgStatusList.forEach((img: ImgStatus) => {
                if (img.objtypeId === this.equipDetailData.objtypeId) {
                    img.fun() // 调用函数
                }
            })

        }
        locationEquimpent() {
            this.click = !this.click;
            if (this.click) {
                this.clickTimer = setTimeout(() => this.click = false, 2000)
            }
        }
        changeImg(Img: string) {
            let _this = this
            return function () {
                let img: string = _this.normal ? `${Img}-normal` : (_this.inRange ? `${Img}-error` : '')

                _this.srcImg = require(`@/assets/images/um/${img}.png`)
            }
        }

        beforeDestroy() {
            clearTimeout(this.clickTimer);
        }
    }
</script>

<style lang="less">
    .equipDetail-wrap {
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
                font-size: 3rem;
                margin-right: 1rem;
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
                text-align: center;
                line-height: 2rem;
                border-radius: 50%;
                width: 2rem;
                margin-top: .7rem;
                background-color: #6c7c9d;
                height: 2rem;
                font-size: 1.3rem;
            }
        }

    }
</style>