<template>
    <div class="equipDetail-wrap" @click="locationEquimpent">
        <Card class="clickStatic" :style="{backgroundColor:click?'#a1cacb':'transparent'}">
            <p slot="title" style="font-size: 1.66vmin;height: 1.7vmin;line-height: 1.66vmin">{{Obj.objtypeName}}</p>
            <div class="monitorType">{{Obj.ObjName}}</div>
            <!-- 数值正常时 -->

            <img src="" class="img"> 
            <img src="../../../../assets/UM/fault.png" class="img" v-if="!inRange">

            <p class="value">
                {{ inRange ? Obj.ObjVal : '故障' }}
                <span style="font-size: 2vmin" v-if="inRange">{{ Obj.unit }}</span>
            </p>
            <p class="time" v-if="isTimeShow">采集时间：{{ Obj.time }}</p>
            <div class="extre">
                <div class="min" v-if="Obj.minNormal != null">
                    <Icon type="arrow-up-c"></Icon>
                    <span>{{Obj.minNormal}}</span>
                </div>
                <div class="max" v-if="Obj.maxNormal != null">
                    <Icon type="arrow-down-c"></Icon>
                    <span>{{Obj.maxNormal}}</span>
                </div>
                <div class="historyData">
                    <button class="historyDataBtn" @click="queryHistoryData(Obj)">历史数据</button>
                </div>
            </div>
        </Card>
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
                    objtypeName: "",
                    ObjName: "",
                    ObjVal: 0,
                    objtypeId: 6,
                    clickStatus: false,
                    datatypeId: "",
                    minValue: 0,
                    maxValue: 100,
                    time: ""
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
                    _this.srcImg = _this.normal ? `${Img}-normal` : ( _this.inRange ? `${Img}-error` : '' )
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

       .valueclass {
    float: left;
    z-index: 1001;
    line-height: 100px;
    height: 100px;
    background-color: #49cecc;
    color: #0f4f5a;
    font-size: 70px;
    font-family: "7LED";
}

.clickStatic:focus,
.clickStatic:hover {
    /* color: #fff;*/
    background-color: #49cecc;
}

.clickStatic {
    background-color: white;
    border-radius: 10px;
    margin: 1vh 0;
    text-align: center;
    height: 28vh;
}

.value {
    margin-top: 2%;
    font-size: 3vmin;
    height: 4vh;
}

.min {
    position: absolute;
    top: 0;
    left: 2%;
    color: rgb(45, 140, 240);
}

.max {
    position: absolute;
    top: 0;
    right: 44%;
    color: red;
}

.extre {
    position: relative;
    height: 3vh;
    font-size: 1.66vmin;
}

.img {
    width: 28%;
    height: 28%;
    margin-top: 1%;
}

.time {
    margin: 0.4vh 0;
    font-size: 1.6vmin;
}

.monitorType {
    font-size: 1.66vmin;
    position: absolute;
    top: 4.5vmin;
    text-align: center;
    width: 82%;
    color: #fff;
}

 .ivu-card-head {
    border-bottom: none;
    padding: 1.4vmin 1.6vmin;
}

.ivu-card-bordered {
    border: none;
}

.ivu-card-head p {
    color: #fff;
}

.ivu-card-body {
    color: #fff;
    padding: 2.6vmin;
}
.historyData {
    position: absolute;
    top: 0;
    right: 0;
}
.historyDataBtn {
    font-size: 0.8vmin;
    border-radius: 0.4vmin;
    padding: 0 0.4vmin;
} 

    }
    
</style>