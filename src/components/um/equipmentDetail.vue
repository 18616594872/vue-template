<template>
    <div class="equipDetail-wrap" @click="locationEquimpent">
            <ul class="quip-title-ul">
                <li class="quip-title-li">
                    <img :src="srcImg" class="img"> 
                    <img src="../../assets/images/um/fault.png" class="img" v-if="!inRange">
                </li>
                <li class="quip-title-li"> 
                    <h2 >{{equipDetailData.ObjName}}</h2>
                    <p >{{equipDetailData.location}}</p>
                </li>
            </ul>
            <p class="quip-center-span">
                <span class="value">{{ inRange ? equipDetailData.ObjVal : '故障' }}</span>
                <span style="font-size: 2vmin" v-if="inRange">{{ equipDetailData.unit }}</span>
            </p>

            <ul class="quip-bottom-ul">
                <li class="quip-bottom-li">
                    <p class="time" v-if="isTimeShow">{{ equipDetailData.time }}</p>
                    <p class="time" >{{ equipDetailData.objtypeName }}</p>
                </li>
                <li class="quip-bottom-li"> 
                    <div class="min" v-if="equipDetailData.minNormal != null">
                        <img :src="srcImg" class="img"> 
                    </div>
                    <div class="max" v-if="equipDetailData.maxNormal != null">
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
        Watch
    } from "vue-property-decorator"
    import {
        keyVal
    } from '@/types/views/operationManagement.interface'
    import {
        EquipDataInterface,
        ImgStatus
    } from '@/types/components/equipmentDetail.ts'

    @Component({})
    export default class About extends Vue {
        @Prop({
            default: () => {
                let equipDetail: EquipDataInterface = {
                    id: "",
                    objtypeName: "古城大街 21区 污水仓",
                    ObjName: "温度检测仪",
                    ObjVal: 30,
                    objtypeId: 6,
                    clickStatus: false,
                    datatypeId: "",
                    minValue: 0,
                    maxValue: 100,
                    time: "2017-12-5 13:41:00",
                    location: "K0+245",
                    unit: "%Rh",
                    minNormal: 10
                }
                return equipDetail
            }
        }) equipDetailData!: EquipDataInterface

        // data 
        normal: boolean = true
        isTimeShow: boolean = false
        inRange: boolean = true
        click: boolean = false
        clickTimer: any = null
        srcImg: string = ''
        imgStatusList: ImgStatus[] = [
            {
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

        @Watch('equipDetailData.ObjVal', {
            deep: true
        })
        onObjValChange() {
            this.checkValue()
        }

        mounted() {
            this.checkValue()
            console.log(this.srcImg)
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
                (equipDetailData.ObjVal < equipDetailData.minNormal ||
                    equipDetailData.ObjVal > equipDetailData.maxNormal) ?
                false :
                true;
            this.inRange =
                equipDetailData.minValue != null &&
                equipDetailData.maxValue != null &&
                (equipDetailData.ObjVal < equipDetailData.minValue ||
                    equipDetailData.ObjVal > equipDetailData.maxValue) ?
                false :
                true;

            this.imgStatusList.forEach((img: ImgStatus) => {
                if(img.objtypeId === this.equipDetailData.objtypeId){
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
        changeImg(Img: string){
            let _this = this
            return function(){
                    let img: string = _this.normal ? `${Img}-normal` : ( _this.inRange ? `${Img}-error` : '' )

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
        background: rgb(68, 76, 86);

        .quip-title-ul {
            overflow: hidden;
            padding-top: 4%;

            .quip-title-li {
                float: left;    

            }

            >:first-child {
                width: 30%;
                margin-left: 5%;

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

            .value {
                font-weight: bold;
                font-size: 3rem;
                margin-right: 1rem;
            }
        }

        .quip-bottom-ul {
            
            overflow: hidden;

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
                margin-left: -4%;

                .img {
                    width: 70%
                }
            }
        }

    }
    
</style>