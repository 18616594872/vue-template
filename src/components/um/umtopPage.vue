<template>
    <div class="UMTopPage-wrap">
        <div class="sys-logo">
            <img :src="logo" class="logo" />
        </div>
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
    import Utils from "./utils"
    @Component({})
    export default class About extends Vue {

        logo: string = require("@/assets/images/um/logo.png")
        tips: string = require("@/assets/images/um/tips.png")
        headSign: string = require("@/assets/images/um/my-info.png")
        defaultValue: string = "1"
        itemMenu: any[] = []
        itemNavigation: any[] = []
        leftMenu: any[] = []
        currentIndex: number = 0
        isShowLeftMenu: boolean = false
        isSessionStorage!: any
        secondMenu!: any

        // prop
        @Prop({
            required: false,
            default: ''
        }) data!: any[]

        @Prop({
            required: false,
            default: ''
        }) defaultPath!: ''

        @Prop({
            required: false,
            default: ''
        }) refeshPath!: ''

        @Watch('data', {
            deep: true
        })
        onDataChanged(newVal: any, oldVal: any) {
            this.init()
        }

        @Watch('defaultPath', {
            deep: true
        })
        onWatchDefaultPath(newVal: any, oldVal: any) {
            this.data.forEach(item => {
                // ummain 点击跳转导致
                if (item.children[0].url === newVal) {
                    this.changeNavParent(item.id)
                    this.defaultValue = item.id
                }

            })
        }

        @Watch('refeshPath', {
            deep: true
        })
        onWatchRefreshPath(newVal: any, oldVal: any) {
            // f5 刷新
            this.data.forEach((item: any, index: number) => {
                item.children.forEach((ele: any, idx: number) => {
                    // 无左侧菜单
                    if (ele.url) {
                        if (ele.url === newVal) {
                            this.changeNavParent(item.id)
                            this.defaultValue = item.id
                        }
                    }
                    // 有左侧菜单
                    else if (ele.children) {
                        ele.children.forEach((tep: any, orderIndex: number) => {
                            if (tep.url === newVal) {
                                this.refreshNacParent(item.id)
                                this.defaultValue = item.id
                                this.chooseNav(idx, ele)
                            } else if (tep.url === sessionStorage.getItem('fromPath')) {
                                this.refreshNacParent(item.id)
                                this.defaultValue = item.id
                                this.chooseNav(idx, ele)
                            }
                        })
                    }
                })
            })
        }

        @Emit('bingSend')
        send(leftMenu: any[]) {}

        @Emit('bingIsShow')
        isShow(isShowLeftMenu: boolean) {}

        mounted() {
            this.init()
        }

        init() {
            this.itemMenu = this.data
        }

        // 一级菜单、二级菜单
        changeNavParent(id: string) {
            this.itemMenu.forEach((item: any) => {
                if (id === item.id) {
                    this.currentIndex = 0
                    this.itemNavigation = item.children
                    this.isShowLeftMenu = false
                    this.isShow(this.isShowLeftMenu)
                    this.chooseNav(0, this.itemNavigation[0])
                }
            })
        }

        // 刷新一级菜单 二级菜单 不自动跳二级菜单第一个
        refreshNacParent(id: string) {
            this.itemMenu.forEach((item: any) => {
                if (id === item.id) {
                    this.currentIndex = 0
                    this.itemNavigation = item.children
                    this.isShowLeftMenu = false
                    this.isShow(this.isShowLeftMenu)
                }
            })
        }

        // 三级菜单
        chooseNav(index: number, item: any) {
            this.currentIndex = index
            this.leftMenu = []
            // 针对没有子菜单的二级菜单，直接跳
            if (item.url) {
                this.$router.push(item.url)
                this.isShowLeftMenu = false
                this.isShow(this.isShowLeftMenu)
            }
            if (item.children) {
                this.leftMenu = item
                this.send(this.leftMenu)
                this.isShowLeftMenu = true
                this.isShow(this.isShowLeftMenu)
                let forLeft = {
                    index: 0,
                    item: (this.leftMenu as any).children[0]
                }
                Utils.$emit('callLeft', forLeft)
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

        .sys-logo {
            margin-left: 13px;
            margin-top: 4px;

            .logo {
                width: 60px;
                height: 48px;
            }
        }

        .sys-title {
            width: 370px;
            height: 37px;
            font-size: 36px;
            font-family: STXingkai;
            font-weight: bold;
            color: rgba(224, 228, 231, 1);
            margin-top: 11px;
            margin-left: 16px;
            cursor: pointer;
        }

        .navigation-wrap {
            margin-left: 30px;
            margin-top: 19px;
            font-size: 16px;
            flex: 1;

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
                    // color: @base-black-color5;
                    // font-weight: 600;
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
                /*去掉默认的下拉三角*/
                // -webkit-appearance: none;   
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
                width: 44%;
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