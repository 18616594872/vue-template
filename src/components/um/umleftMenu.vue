<template>
    <div class="UMLeftMenu-wrap" ref="UMLeftMenu-wrap">
        <div class="meun-icon">
            <Icon type="md-menu" size="22" class="md-menu" @click="toggle()" />
            <span class="menu-open" v-show="isOpen" @click="toggle()">展开</span>
            <span class="menu-pack-up" v-show="isPickUp" @click="toggle()">收起</span>
        </div>
        <div class="menu-content">
            <ul class="menu-content-ul">
                <li v-for="(item, index) in menuData" :key="index" @click="choosedMenu(index, item)"
                    :class="{ 'active-li': currentIndex === index }">
                    <div>
                        <img :src="item.picUrl" class="menu-item-icon" />
                    </div>
                    <div v-show="isPickUp">
                        {{item.menuName}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch,
        Emit
    } from "vue-property-decorator"
    import Utils from "./utils"
    @Component({})
    export default class About extends Vue {

        // prop
        @Prop({
            required: false,
            default: ''
        }) data!: any[]

        currentIndex: number = 0

        isOpen: boolean = false
        isPickUp: boolean = true

        menuData: any[] = []

        mounted() {
            this.initRefresh()
            // top页面二级菜单第一次被点击时，默认加载一个子节点
            let that = this
            Utils.$on('callLeft', function (forLeft: any) {
                that.choosedMenu(forLeft.index, forLeft.item);
            })
        }

        initRefresh() {
            this.menuData = this.data
            let index = Number(sessionStorage.getItem("lastIndex"))
            if (sessionStorage.getItem('leftMenu') === null) {
                this.choosedMenu(0, this.menuData[0])
            } else {
                this.menuData.forEach((ele: any) => {
                    if (sessionStorage.getItem('leftMenu') === ele.id) {
                        if (sessionStorage.getItem('fromPath') !== null) {
                            this.refreshChoosedMenu(index)
                        } else {
                            this.choosedMenu(index, ele)
                        }
                    }
                })
            }
        }

        toggle() {
            this.isOpen = !this.isOpen
            this.isPickUp = !this.isPickUp
            if (this.isPickUp === false && this.isOpen === true) {
                (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.flex = '0 0 4%';
                (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.transition = '.5s'
            } else {
                (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.flex = '0 0 6%';
                (this.$refs['UMLeftMenu-wrap'] as HTMLElement).style.transition = '.5s'
            }
        }

        choosedMenu(index: number, item: any) {
            this.currentIndex = index
            this.$router.push(item.url)
            sessionStorage.setItem("lastIndex", index.toString())
            sessionStorage.setItem("leftMenu", item.id)
        }

        refreshChoosedMenu(index: number) {
            this.currentIndex = index
            sessionStorage.setItem("lastIndex", index.toString())
        }
    }
</script>

<style lang="less">
    
    .UMLeftMenu-wrap {
        width: 100%;
        height: 100%;

        .meun-icon {
            line-height: 2.5;

            .md-menu {
                margin-right: 5px;
                cursor: pointer;
                vertical-align: sub;
            }

            .menu-open,
            .menu-pack-up {
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                color: #75777A;
            }
        }

        .menu-content {
            margin-top: 10px;

            .menu-content-ul {
                li {
                    display: flex;
                    cursor: pointer;
                    margin-top: 5px;
                    border: 2px solid transparent;

                    div {
                        line-height: 60px;
                    }

                    div:first-child {
                        flex: 1;
                        text-align: left;
                    }

                    div:last-child {
                        flex: 3.5;
                        font-size: 18px;
                        font-weight: bold;
                        color: #75777A;
                    }

                    .menu-item-icon {
                        width: 16px;
                        vertical-align: middle;
                    }
                }

                .active-li {
                    border-top: 2px solid;
                    border-right: 2px solid #04ff67;
                    border-bottom: 2px solid;
                    border-image: -webkit-linear-gradient(left, #1B2023 30%, #19B9EC 60%, #1AF9B8 100%) 5 5;

                    div:last-child {
                        color: @font-color-theme
                    }
                }
            }
        }
    }
</style>