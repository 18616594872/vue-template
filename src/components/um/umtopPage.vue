<template>
    <div class="UMTopPage-wrap">
        <div class="sys-title">后台管理平台</div>
        <div class="navigation-wrap">
            <ul class="ul-wrap">
                <li class="select-li-wrap">
                    <Select v-model="defaultValue" class="select-wrap" @on-change="changeNavParent">
                        <Option v-for="(item ,index) in itemMenu" :key="index" :value="item.id">
                            {{item.name}}</Option>
                    </Select>
                </li>
                <li v-for="(item, index) in itemNavigation" :key="index" @click="chooseNav(item, index)">
                    <div class="nav-bar-name" :class="{ 'active-li': currentIndex === index }">
                        {{item.name}}
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
        SubFunModuleItem
    } from '@/types/components/umtopPage.interface.ts'
    import {
        getNavBarNum
    } from '@/api/mainPage'

    @Component({})
    export default class About extends Vue {

        tips: string = require("@/assets/images/um/tips.png")
        headSign: string = require("@/assets/images/um/my-info.png")
        defaultValue: string = "0"
        itemNavigation: any[] = []
        currentIndex: string = ''
        itemMenu: any[] = []

        @Prop({
            default: ''
        })
        path!: string

        @Watch('path')
        pathChange() {
            this.initPath()
        }
        get Routers(){
            return this.$store.getters.routers
        }

        mounted() {
            this.initRouters()
            this.initPath()
        }
        initPath() {
            let toPath = sessionStorage.getItem('toPath')
            if (!toPath) {
                return
            }
            this.itemMenu.forEach((item: ModuleItem) => {
                item.children.forEach((ele: SubFunModuleItem, idx: any) => {
                    if (toPath && toPath.indexOf(`${item.path}/${ele.path}`) !== -1) {
                            this.evaluation(item.id, idx, item.children)
                            ele.children && this.chooseNav(ele, idx) //跳转非总览界面,进行二级跳转
                        }
                })
            })
        }
        initRouters(){
            this.itemMenu = this.parseRouters(this.Routers).map((router: any, index: number) => {
                router.id = index
                return router
            })
        }
        parseRouters(Routers: any[]){
            let o: any = []
            Array.isArray(Routers) && Routers.forEach((router: any) => {
                if(!router.hidden){
                    o.push(router)
                    router.children && (router.children = this.parseRouters(router.children))
                }
            })
            return o
        }
        changeNavParent(id: string) {
            let {
                itemMenu
            } = this

            itemMenu.forEach((item: ModuleItem) => {
                if (id === item.id) {
                    this.evaluation(item.id, item.children[0].id, item.children)
                    this.$router.push(item.path)
                }
            })

        }
        evaluation(id: string, childId: string, child: Array < any > ) {
            this.defaultValue = id
            this.currentIndex = childId
            this.itemNavigation = child
        }
        chooseNav(item: any, index: any) {   
            this.currentIndex = index

            let router = item.children ? Object.assign({
                name: item.name,
                params: {
                    children: item.children
                }
            }) : {
                name: item.name
            }
            this.$router.push(router)
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
            font-size: 0.9rem;
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