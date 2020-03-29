<template>
    <div class="SelectTemp-wrap" :type="data.type">
        <div class="select-wrap"
            :class="[data.type === 'solid' ? 'solid-select' : data.type === 'border' ? 'border-select' : 'label-selct']">
            <div class="label" v-show="data.type === 'label'">{{data.labelTxt}}</div>
            <div style="display: inline-block;vertical-align: top">
                <Input class="choosed-li" v-model="value" readonly @on-focus="chooedValue()" />
                <ul class="ul-box" v-show="isShowUL">
                    <li class="li-box" v-for="(item, index) in data.selectOption" :key="index" @click="choosedLi(item)">
                        {{item.name}}</li>
                </ul>
            </div>
            <div class="icon">
                <div class="triangle" @click="chooedValue()"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Emit,
        Watch
    } from "vue-property-decorator";
    import {
        SelectData
    } from '@/types/components/selectTemp.interface'

    @Component({})
    export default class About extends Vue {
        // prop
        @Prop({
            required: false,
            default: {}
        }) data!: SelectData

        isShowUL: boolean = false

        value: any = ''

        choosedItem: any = ''

        @Watch('data.selectOption')
        watchData(newVal: any, oldVal: any) {
            if (newVal.length !== 0) {
                if ((this.data as SelectData).defaultValue !== undefined) {
                    newVal.forEach((item: any) => {
                        if(item.id === this.data.defaultValue){
                            this.choosedLi(item)
                        }
                    })
                }
            }
        }

        @Emit('on-change')
        send(choosedItem: any) {}

        mounted() {
            if(this.data.defaultValue !== undefined) {
                this.data.selectOption.forEach((option: any) => {
                    if(option.id === this.data.defaultValue){
                        this.choosedLi(option)
                    }
                })
                
            }
        }

        chooedValue() {
            if (this.data.selectOption.length === 0) {
                this.isShowUL = false
            } else {
                this.isShowUL = true
            }
        }

        choosedLi(item: any) {
            this.isShowUL = false
            this.value = item.name
            this.choosedItem = item
            this.send(this.choosedItem)
        }


    }
</script>

<style lang="less">
    .SelectTemp-wrap {
        .select-wrap {
            z-index: 999;

            .choosed-li,
            .icon {
                display: inline-block;
                vertical-align: top;

                :hover {
                    cursor: pointer;
                }
            }

            .choosed-li {
                min-width: 120px;

                .ivu-input {
                    background-color: #474747;
                    outline: none;
                    padding: 4px 7px;
                    border-radius: 0;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border: none;
                    height: 20px;
                    color: @base-black-color5;
                    width: 120px;
                    text-align: center;
                }

                .ivu-input:hover {
                    border: none;
                    cursor: pointer;
                }

                .ivu-input:focus {
                    outline: none;
                    border: none;
                    box-shadow: 0 0 0 2px transparent;
                }
            }

            .icon {
                width: 20px;
                height: 20px;
                background: #474747;
                margin-left: 5px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;

                .triangle {
                    width: 0;
                    height: 0;
                    border-width: 7px;
                    border-color: @base-black-color5 transparent transparent transparent;
                    border-style: solid dashed dashed dashed;
                    border-radius: 4px;
                    margin-top: 6px;
                    margin-left: 2px;
                }
            }

            .ul-box {
                z-index: 999999;
                background: #474747;
                margin-top: 3px;
                width: 120px;
                border-radius: 4px;
                max-height: 200px;
                overflow-y: auto;
                position: absolute;

                .li-box {
                    line-height: 1.5;
                    padding: 2px 7px;
                    cursor: pointer;
                }
            }

            .ul-box::-webkit-scrollbar {
                width: 4px;
                height: 4px;
                overflow-x: hidden;
                overflow-y: auto;
            }

            .ul-box::-webkit-scrollbar-thumb {
                border-radius: 5px;
                box-shadow: inset 0 0 5px rgb(27, 102, 207);
                background: rgba(0, 0, 0, 0.2)
            }

            .ul-box::-webkit-scrollbar-track {
                border-radius: 4px;
                box-shadow: inset 0 0 5px rgb(235, 227, 235);
                background: rgba(0, 0, 0, 0.1)
            }
        }

        .border-select.select-wrap {
            .choosed-li {
                .ivu-input {
                    border: 1px solid #797979;
                }
            }

            .icon {
                border: 1px solid #797979;
            }
        }

        .label-selct.select-wrap {
            .label {
                background: #323A43;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                display: inline-block;
                padding: 4px 14px;
                margin-right: 5px;
            }

            .choosed-li {
                .ivu-input {
                    border-radius: 0;
                    background-color: #323A43;
                    height: 32px;
                }
            }

            .icon {
                background-color: #323A43;
                height: 32px;
                width: 32px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;

                .triangle {
                    border-width: 8px;
                    border-color: @base-black-color5 transparent transparent transparent;
                    border-style: solid dashed dashed dashed;
                    border-radius: 4px;
                    margin-top: 13px;
                    margin-left: 8px;
                }
            }

            .ul-box {
                background-color: #323A43;
            }
        }
    }
</style>