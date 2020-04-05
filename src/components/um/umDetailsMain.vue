<template>
    <div class="detailsMain-wrap">
        <div class="UMLeftMenu-wrap-single left-menu" :class="styleClase">
            <div class="meun-icon">
                <Icon type="md-menu" size="22" class="md-menu" @click="toggle()" />
                <span class="menu-open" v-show="isOpen" @click="toggle()">展开</span>
                <span class="menu-pack-up" v-show="isPickUp" @click="toggle()">收起</span>
            </div>
            <div class="menu-content">
                <ul class="menu-content-ul">
                    <li v-for="(item, index) in treeRouters" :key="index">
                        <section v-if="item.children" class="children-wrap"
                            @click="choosedHasChildMenu(item.children[0], index)">
                            <div class="parent-menu-wrap" :class="{ 'active-li': currentMenu == index }">
                                <div>
                                    <img :src="tips(item.meta.icon)" class="menu-item-icon" />
                                </div>
                                <div v-show="isPickUp">
                                    {{item.meta.title}}
                                </div>
                                <div class="arrow" :class="isChildMenu === true ? 'to-top' : 'to-bottom'"></div>
                            </div>
                            <ul class="children-menu-ul-wrap" v-show="isChildMenu">
                                <li v-for="(ele, idx) in item.children" :key="idx" ref="childrenMenu"
                                    class="children-menu-li-wrap"
                                    @click="choosedChildrenMenu(ele, `${index}-${idx}`, index)"
                                    :class="{ 'child-active-li': currentChild === `${index}-${idx}` }">
                                    <div>
                                        <img :src="tips(ele.meta.icon)" class="menu-item-icon" />
                                    </div>
                                    <div>
                                        {{ele.meta.title}}
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section v-else class="no-children-wrap" @click="choosedMenu(item, index)"
                            :class="{ 'active-li': currentMenu == index }">
                            <div>
                                <img :src="tips(item.meta.icon)" class="menu-item-icon" />
                            </div>
                            <div v-show="isPickUp">
                                {{item.meta.title}}
                            </div>
                        </section>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-page-wrap">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'vue-property-decorator'
    import {
        SubFunModuleItem
    } from '@/types/components/umtopPage.interface.ts'

    @Component({})
    export default class About extends Vue {
        // data 

        isOpen: boolean = true
        isPickUp: boolean = true
        isChildMenu: boolean = false
        currentMenu: string = '0' // 父元素默认项
        currentChild: string = '0-0' // 子元素默认项

        get treeRouters(): any {
            return this.$store.getters.leftTreeRouters
        }
        get styleClase(): string {
            let bool = this.treeRouters.some((treeRouters: SubFunModuleItem) => treeRouters.children !== undefined)
            return bool ? 'UMLeftMenu-wrap-double' : 'UMLeftMenu-wrap-single'
        }

        mounted() {
            this.initPath()
        }
        initPath() {
            let toPath = sessionStorage.getItem('toPath')
            if (!toPath) {
                return
            }

            this.treeRouters.forEach((router: SubFunModuleItem, index: any) => {
                if (router.children) {
                    router.children.forEach((child: SubFunModuleItem, childIndex: any) => {
                            (toPath && toPath.indexOf(child.path) === 0) && this.assign(index,
                                `${index}-${childIndex}`, true)
                        })

                        !this.isChildMenu && this.assign(`0`, `0-0`, true) // 由详情界面进入 默认匹配第一项
                }
            })
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

        tips(icon: string) {
            return require(`@/assets/images/um/${icon}.png`)
        }

        choosedMenu(item: any, index: string) {
            this.assign(index, `0-0`, false)
            this.$router.push({
                name: item.name
            })
        }

        // click parent
        choosedHasChildMenu(child: SubFunModuleItem, index: string) {
            this.assign(index, `0-0`, true)
            this.$router.push({
                name: child.name
            })


        }
        // click child
        choosedChildrenMenu(ele: any, childIndex: string, parentIndex: string) {
            this.currentMenu = parentIndex
            this.currentChild = childIndex
            this.$router.push({
                name: ele.name
            });
            (event as Event).stopPropagation()
        }
        assign(parentIndex: string, childIndex: string, isChild: boolean) {
            this.currentMenu = parentIndex
            this.currentChild = childIndex
            this.isChildMenu = isChild
        }
    }
</script>

<style lang="less">
    .UMLeftMenu-wrap-single {
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
                    cursor: pointer;
                    margin-top: 5px;
                    border: 2px solid transparent;

                    .no-children-wrap {
                        line-height: 60px;
                        display: flex;
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

    .UMLeftMenu-wrap-double {
        width: 100%;
        height: 100%;

        .meun-icon {
            display: none;
        }

        .menu-content {
            margin-top: 10px;
            width: 180px;
            margin-left: 10px;

            .menu-content-ul {
                li {
                    cursor: pointer;
                    margin-bottom: 15px;
                    color: #75777A;
                    min-height: 40px;
                    line-height: 40px;
                    position: relative;

                    .no-children-wrap,
                    .children-wrap .parent-menu-wrap,
                    .children-menu-li-wrap {
                        display: flex;
                        flex-wrap: wrap;
                        background: #3F4752;

                        div:first-child {
                            flex: 1;
                            text-align: right;
                        }

                        div:nth-child(2) {
                            flex: 3.5;
                            font-size: 14px;
                            color: #75777A;
                            text-align: left;
                            padding-left: 15px;
                        }

                        div:nth-child(3) {
                            flex: 1
                        }

                        .menu-item-icon {
                            width: 12px;
                            vertical-align: middle;
                            margin-left: 20px;
                        }
                    }

                    .children-menu-ul-wrap {
                        margin-top: 15px;
                        margin-left: 10px;
                    }

                    .arrow {
                        position: absolute;
                        right: 10px;
                        height: 8px;
                        width: 8px;
                        transform: rotate(-135deg);
                        -webkit-transform: rotate(-135deg);
                        display: inline-block;
                        -moz-transform: rotate(-135deg);
                        -ms-transform: rotate(-135deg);
                        -o-transform: rotate(-135deg);
                        vertical-align: middle;
                    }

                    .arrow.to-top {
                        top: 17px;
                        border-right: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        border-left: 2px solid transparent;
                        border-top: 2px solid transparent;

                    }

                    .arrow.to-bottom {
                        top: 13px;
                        border-left: 2px solid #fff;
                        border-top: 2px solid #fff;
                        border-right: 2px solid transparent;
                        border-bottom: 2px solid transparent;
                    }
                }

                .active-li,
                .child-active-li {
                    background-color: #3C7199 !important;

                    div {
                        color: @font-color-theme  !important;
                    }
                }

                .active-li::after {
                    content: ' ';
                    width: 0;
                    height: 0;
                    border-top: 14px solid transparent;
                    border-bottom: 14px solid transparent;
                    border-left: 14px solid #3C7199;
                    margin-right: -14px;
                    margin-top: 7.5px;
                }
            }
        }
    }

    .detailsMain-wrap {
        position: absolute;
        top: 57px;
        bottom: 57px;
        left: 0;
        right: 0;
        display: flex;

        .UMLeftMenu-wrap-single,
        .UMLeftMenu-wrap-double {
            flex: 0 0 6%;
        }

        .content-page-wrap {
            flex: 0 0 90%;
        }
    }
</style>