<template>
    <div class="publicMonitorDetails-wrap">
        <div class="title-list">
            <ul class="titleUl">
                <li v-for="(item, index) in equipmentType" :key="index" class="label-wrap page-title"
                    @click="changEquipmentType(index, item)" :class="{ 'active-span': isActive === index}">
                    {{ item.name }}
                </li>
            </ul>
            <div class="rightJump">
                <span><Icon type="logo-buffer" @click="switchCard"/></span>
                <span><Icon type="md-grid" @click="switchTable"/></span>
            </div>
        </div>
        <Row class="condition-wrap">
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="tunnelSelect" @on-change="tunnelChange" />
            </Col>
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="areaSelect" @on-change="areaChange" />
            </Col>
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="storeSelect" @on-change="storeChange" />
            </Col>
        </Row>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Emit,
        Watch
    } from "vue-property-decorator"
    import {
        MonitorType,
        Codition
    } from '@/types/views/environmentalMonitor.interface.ts'
    import {
        SelectData
    } from '@/types/components/selectTemp.interface'
    import SelectTemp from './selectTemp.vue'
    import {
        listTunnel,
        listArea,
        listStore
    } from '@/api/commonModule.ts'

    @Component({
        components: {
            SelectTemp
        }
    })
    export default class About extends Vue {

        // data 
        isActive: number = 0
        tunnelSelect: SelectData = {
            selectOption: [],
            defaultValue: 0,
            type: 'label',
            labelTxt: '管廊：',
        }

        areaSelect: SelectData = {
            selectOption: [{
                id: 0,
                name: '全部'
            }],
            defaultValue: 0,
            type: 'label',
            labelTxt: '区域：'
        }

        storeSelect: SelectData = {
            selectOption: [{
                id: 0,
                name: '全部'
            }],
            defaultValue: 0,
            type: 'label',
            labelTxt: '管舱: '
        }
        equipmentTypeId: number = 1

        // prop
        @Prop({
            required: true,
            default: ''
        }) equipmentType!: MonitorType[]

        @Emit('condition-change')
        send(choosedItem: Codition) {}
        @Emit('switch')
        switchPage(show: boolean){

        }

        @Watch("equipmentType", {
            deep: true
        })
        onEquipmentType(newVal: any) {
            if( !newVal.lenght ){
                return false
            }
            let [first, ...othent] = newVal // 监听设备类型变化 默认选中首项数据
            this.equipmentTypeId = first.id
        }

        mounted() {
            this.init()
        }

        changEquipmentType(index: number, data: any) {

            if (this.equipmentTypeId !== data.id) {
                this.isActive = index // 改变选中下坐标颜色
                this.equipmentTypeId = data.id

                this.queryDataCondition()

            }
        }
        switchCard(){
            this.switchPage(true)
        }
        switchTable(){
            this.switchPage(false)
        }

        transform(data: any) {
            return data.map((tunnel: any) => {
                let o = < any > {}
                o.id = tunnel.key
                o.name = tunnel.val
                return o
            })
        }


        async init() {
            let [firstTunnel, ...otherTunnel] = await this.getTunnelList()
            await this.getAreaList(firstTunnel.id)
            await this.getStoreList(firstTunnel.id)
            await this.queryDataCondition()

        }
        queryDataCondition() {
            let {
                tunnelSelect: {
                    defaultValue
                },
                areaSelect,
                storeSelect,
                equipmentTypeId
            } = this

            this.send({
                tunnelId: defaultValue === 0 ? null : defaultValue,
                storeId: storeSelect.defaultValue === 0 ? null : storeSelect.defaultValue,
                areaId: areaSelect.defaultValue === 0 ? null : areaSelect.defaultValue,
                objtypeId: equipmentTypeId
            })
        }
        // 获取管舱
        getTunnelList(): Promise < any > {
            let {
                tunnelSelect
            } = this
            return listTunnel().then(
                (result: any) => {
                    let {
                        code,
                        data
                    } = result.data
                    if (code === 200) {

                        tunnelSelect.selectOption.splice(0) // 清空数组
                        let option = this.transform(data)
                        tunnelSelect.selectOption = option
                        tunnelSelect.defaultValue = option[0].id
                        return option
                    }
                },
                (error: any) => {
                    (this as any).Log.warn(error)
                }
            )
        }
        // 获取区域
        getAreaList(areaId: number) {
            return listArea({
                areaId
            }).then(
                (result: any) => {
                    let {
                        code,
                        data
                    } = result.data
                    if (code === 200) {
                        this.areaSelect.selectOption.splice(1) // 清空数组
                        let option = this.transform(data)
                        this.areaSelect.selectOption = [...this.areaSelect.selectOption, ...option]
                    }
                },
                (error: any) => {
                    (this as any).Log.warn(error)
                }
            )
        }
        // 获取区域
        getStoreList(storeId: number) {
            return listStore({
                storeId
            }).then(
                (result: any) => {
                    let {
                        code,
                        data
                    } = result.data
                    if (code === 200) {
                        this.storeSelect.selectOption.splice(1) // 清空数组
                        let option = this.transform(data)
                        this.storeSelect.selectOption = [...this.storeSelect.selectOption, ...option]
                    }
                },
                (error: any) => {
                    (this as any).Log.warn(error)
                }
            )
        }
        tunnelChange(data: any) {

            if (this.tunnelSelect.defaultValue !== data.id) {
                this.getAreaList(data.id)
                this.getStoreList(data.id)

                this.tunnelSelect.defaultValue = data.id
                this.queryDataCondition()
            }
        }
        areaChange(data: any) {
            if (this.areaSelect.defaultValue !== data.id) {

                this.areaSelect.defaultValue = data.id
                this.queryDataCondition()

            }
        }
        storeChange(data: any) {

            if (this.storeSelect.defaultValue !== data.id) {

                this.storeSelect.defaultValue = data.id
                this.queryDataCondition()

            }
        }

    }
</script>

<style lang="less">
    .publicMonitorDetails-wrap {
        width: 100%;
        margin-left: 0.5rem;

        .title-list {
            margin: 0.4rem .9rem;
            overflow: hidden;

            .titleUl {
                float: left;

                .active-span {
                    color: rgba(0, 159, 255, 1);
                }

                :first-child {
                    margin-left: 1.3rem;
                }
            }

            .page-title {
                margin: 0 0.5208rem;
                cursor: pointer;

                .title-img {
                    width: 0.07rem;
                    height: 0.08rem;
                }
            }

            .rightJump {
                width: 8rem;
                float: right;
                margin-right: 1.2rem;
                line-height: 100%;

                >span {
                    display: inline-block;
                    font-size: 1.8rem;

                    >i {
                        cursor: pointer;
                    }
                }
                >:first-child {
                    margin: 0 2.1rem 0 0.9rem;
                }
            }
        }

        .condition-wrap {
            margin: 1rem 0;
        }

    }
</style>