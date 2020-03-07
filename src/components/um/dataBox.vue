<template>
    <div class="DataBox-wrap">
        <div v-for="(item, index) in monitorData" class="content-split-wrap" :key="index"
            :class="{ 'border-content':  monitorData.length >= 2 && index === 0}">
            <div class="content-box">
                <div class="data-value">
                    {{item.value}}
                </div>
                <div class="data-name">
                    {{item.name}}
                </div>
            </div>
            <div class="data-split" v-if="monitorData.length >= 2 && index === 0">
                /
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"
    import {
        keyVal
    } from '@/types/common.interface'

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true,
            default: ''
        }) monitorData!: keyVal[]

    }
</script>

<style lang="less">
    .DataBox-wrap {
        width: 100%;
        height: 100%;
        display: flex;

        .content-split-wrap {
            display: flex;
            width: 100%;
            height: 100%;
            background: #5A636B;
            text-align: center;
            padding: 10px 0px;
            border-radius: 20px;

            .content-box {
                flex: 5;
                line-height: 1.7;

                .data-value {
                    font-size: 38px;
                    font-weight: bold;
                }

                .data-name {
                    font-size: 22px;
                    font-weight: bold;
                    color: #A5A7A9;
                }
            }

            .data-split {
                flex: 1;
                font-size: 38px;
                line-height: 1.7;
            }
        }

        .border-content {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            text-align: right;
        }

        .border-content+.content-split-wrap {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            text-align: left;

            .content-box {
                padding-left: 20px;
            }
        }
    }
</style>