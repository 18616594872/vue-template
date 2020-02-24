<template>
    <div class="publicMonitorDetails-wrap">
        <div class="title-list">
            <ul class="titleUl">
                <li v-for="(item, index) in equipmentType" :key="index" class="label-wrap page-title"
                    @click="changEquipmentType(index)" :class="{ 'active-span': isActive === index}">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <Row class="condition-wrap">
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="defecTypeSelect" />
            </Col>
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="defecStatusSelect" />
            </Col>
            <Col span="4">
            <SelectTemp class="select-temp-wrap" :data="dangerLevelSelect" />
            </Col>
        </Row>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"
    import {
        MonitorType
    } from '@/types/views/environmentalMonitor.interface.ts'
    import {
        SelectData
    } from '@/types/components/selectTemp.interface'
    import SelectTemp from './selectTemp.vue'

    @Component({
        components: {
            SelectTemp
        }
    })
    export default class About extends Vue {

        // data 
        isActive: number = 0
        defecTypeSelect: SelectData = {
            selectOption: [{
                    id: 1,
                    name: '所有'
                },
                {
                    id: 2,
                    name: '本体缺陷'
                },
                {
                    id: 3,
                    name: '设备缺陷'
                }
            ],
            type: 'label',
            labelTxt: '缺陷类型：',
        }

        defecStatusSelect: SelectData = {
            selectOption: [{
                    id: 1,
                    name: '所有'
                },
                {
                    id: 2,
                    name: '未处理'
                },
                {
                    id: 3,
                    name: '维修中'
                },
                {
                    id: 4,
                    name: '维修完成'
                }
            ],
            type: 'label',
            labelTxt: '缺陷状态：'
        }

        dangerLevelSelect: SelectData = {
            selectOption: [{
                    id: 1,
                    name: '所有'
                },
                {
                    id: 1,
                    name: '正常'
                },
                {
                    id: 1,
                    name: '隐患'
                },
                {
                    id: 1,
                    name: '严重'
                },
                {
                    id: 1,
                    name: '危急'
                }
            ],
            type: 'label',
            labelTxt: '危险等级'
        }

        // prop
        @Prop({
            required: true,
            default: ''
        }) equipmentType!: MonitorType[]

        changEquipmentType(index: number) {
            this.isActive = index // 改变选中下坐标颜色
        }

    }
</script>

<style lang="less">
    .publicMonitorDetails-wrap {
        width: 100%;
        margin-left: 0.5rem;

        .title-list {
            margin: 0.5rem 0;
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
        }

        .condition-wrap {
            margin: 1rem 0; 
        }

    }
</style>