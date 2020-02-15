<template>
    <div class="UMTopPage-wrap">
        <div class="sys-title" @click="backToMain">后台管理平台</div>
        <div class="navigation-wrap">
            <ul class="ul-wrap">
                <li class="select-li-wrap">
                    <Select v-model="defaultValue" class="select-wrap" @on-change="changeNavParent">
                        <Option v-for="(item ,index) in itemMenu" :key="index" :value="item.id">
                            {{item.navBarParentName}}</Option>
                    </Select>
                </li>
                <li v-for="(item, index) in itemNavigation" :key="index" @click="chooseNav(index, item)">
                    <div class="nav-bar-name" :class="{ 'active-li': currentIndex === index }">
                        {{item.navBarName}}
                    </div>
                    <div class="active-line"></div>
                </li>
            </ul>
            <div class="line"></div>
        </div>
        <div class="tip-wrap">
            <img :src="tips" class="tip-icon" />
            <img :src="headSign" class="tip-icon" />
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch,
        Emit,
        Inject
    } from "vue-property-decorator"
    import {
        ModuleItem,
        SubFunModuleItem,
        DetailSubFunModuleItem
    } from '@/types/components/umtopPage.interface.ts'
    @Component({})
    export default class About extends Vue {

        tips: string = require("@/assets/images/um/tips.png")
        headSign: string = require("@/assets/images/um/my-info.png")
        defaultValue: string = "1"
        itemNavigation: any[] = []
        currentIndex: number = 0

        // prop
        @Prop({
            required: false,
            default: ''
        }) itemMenu!: ModuleItem[]

        @Prop({
            required: false,
            default: ''
        }) refeshPath!: ''

        @Watch('itemMenu', {
            deep: true
        })
        onItemMenu() {
            this.changeNavParent({
                id: this.defaultValue
            }) // 接收传入数据页面初始化调用首选项
        }

        @Watch('refeshPath', {
            deep: true
        })
        onWatchRefreshPath(newVal: string) {
            // f5 刷新
            this.itemMenu.forEach((item: ModuleItem, index: number) => {
                item.children.forEach((ele: SubFunModuleItem, idx: number) => {
                    // 无左侧菜单
                    if (ele.url) {
                        if (ele.url === newVal) {
                            this.changeNavParent(item.id)
                            this.defaultValue = item.id
                        }
                    }
                    // 有左侧菜单
                    else if (ele.children) {
                        ele.children.forEach((tep: DetailSubFunModuleItem) => {
                            if (tep.url === newVal || tep.url === sessionStorage.getItem(
                                    'fromPath')) {
                                this.changeNavParent({
                                    id: item.id,
                                    index: idx
                                })
                                this.defaultValue = item.id
                            }
                        })
                    }
                })
            })
        }

        @Emit('bingSend')
        send(leftMenu: DetailSubFunModuleItem[]) {}

        @Emit('bingIsShow')
        isShow(isShowLeftMenu: boolean) {}

        changeNavParent(param: any) {
            let navParam = typeof param === 'string' ? {
                id: param
            } : param
            let {
                itemMenu
            } = this

            itemMenu.forEach((item: ModuleItem) => {
                if (navParam.id === item.id) {
                    this.itemNavigation = item.children
                    this.chooseNav(navParam.index || 0, this.itemNavigation[0])
                }
            })

        }
        // 三级菜单
        chooseNav(index: number, leftMenu: SubFunModuleItem) {
            this.currentIndex = index

            if (leftMenu.url) {
                this.$router.push(leftMenu.url)
                this.isShow(false)
            }

            if (leftMenu.children) {
                this.send(leftMenu.children)
                this.isShow(true)
            }

        }
        backToMain() {
            this.$router.push('/UMMain')
        }
    }
</script>


<style lang="less">
    .UMTopPage-wrap {
        width: 100%;
        height: 57px;
        display: flex;

        .sys-title {
            width: 370px;
            height: 57px;
            font-size: 36px;
            font-family: STXingkai;
            font-weight: bold;
            color: #e0e4e7;
            margin-left: 16px;
            cursor: pointer;
            padding-top: 10px;
        }

        .navigation-wrap {
            font-size: 16px;
            flex: 1;
            margin: 19px 20rem 0 10rem;

            .select-wrap {
                width: 120px;

                .ivu-select-selection,
                .ivu-select-dropdown {
                    background: @background-color-theme;
                    color: @base-black-color5;
                    border: none;
                    outline: none;
                }

                .ivu-select-item-focus {
                    background: none;
                }

                .ivu-select-item {
                    font-weight: bold;
                    color: rgba(224, 228, 231, 1);
                    font-weight: 21px;
                }

                .ivu-select-item:hover {
                    background: none;
                    color: @base-black-color5;
                    outline: none;
                }

            }

            .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
            .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                font-size: 16px;
                font-weight: 600;
            }

            .select-wrap,
            .ul-wrap,
            .ul-wrap li,
            .select-wrap1 {
                display: inline-block;
                vertical-align: top;
            }

            .ul-wrap {
                .select-li-wrap {
                    height: 24px;
                    border-right: 2px solid @font-color-theme;
                    padding: 0 20px 0 40px;
                }

                li {
                    cursor: pointer;
                    position: relative;

                    .nav-bar-name {
                        padding: 0 40px;
                        border-right: 2px solid @font-color-theme;
                    }
                }

                .active-li {
                    color: rgba(0, 159, 255, 1);
                }

                .active-li+.active-line {
                    width: -webkit-fill-available;
                    height: 3px;
                    background: linear-gradient(90deg, #eeeeee05 2%, #00a0ff59 10%, #81eef1 50%, #00a4ff87 83%, #eeeeee05 98%);
                    margin-top: 9px;
                    position: absolute;
                }
            }

            .item-select {
                color: @base-black-color5;
                outline: none;
                background: none;
                border: none;
                background: @base-black-color1;

                :hover {
                    background: @base-black-color1;
                    border: 1px solid @base-black-color1;
                    color: @base-black-color5;
                }

                .item-select-option {
                    -webkit-appearance: none;
                    background: @base-black-color1;
                    border: 1px solid @base-black-color1;
                    color: @base-black-color5;
                }

                .item-select-option:hover,
                .item-select-option:active {
                    background: red !important;
                }
            }

            .line {
                height: 2px;
                background: radial-gradient(white 12%, #4c4545 80%);
                margin-top: 10px;
            }
        }

        .tip-icon {
            width: 25px;
            height: 25px;
        }

        .tip-wrap {
            flex: 0 0 7%;
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
    }
</style>