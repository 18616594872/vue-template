<template>
    <div class="detailsMain-wrap">
        <div class="UMLeftMenu-wrap-single left-menu" :class="styleClase">
            <div class="meun-icon">
                <Icon type="md-menu" size="22" class="md-menu" @click="toggle()"/>
                <span class="menu-open" v-show="isOpen" @click="toggle()">展开</span>
                <span class="menu-pack-up" v-show="isPickUp" @click="toggle()">收起</span>
            </div>
            <div class="menu-content">
                <ul class="menu-content-ul">
                    <li v-for="(item, index) in menuData" :key="index" >
                        <section v-if="item.children"  class="children-wrap" @click="choosedHasChildMenu(item)">
                            <div class="parent-menu-wrap" :class="{ 'active-li': currentMenu === item.id }">
                                <div>
                                    <img :src="item.picUrl" class="menu-item-icon"/>
                                </div>
                                <div v-show="isPickUp">
                                    {{item.name}}
                                </div>
                                <div class="arrow" :class="isChildMenu === true ? 'to-top' : 'to-bottom'"></div>
                            </div>
                            <ul class="children-menu-ul-wrap" v-show="isChildMenu">
                                <li v-for="(ele, idx) in item.children" :key="idx" ref="childrenMenu" class="children-menu-li-wrap" @click="choosedChildrenMenu(ele, item)" :class="{ 'child-active-li': currentChild === ele.id }">
                                    <div>
                                        <img :src="ele.picUrl" class="menu-item-icon"/>
                                    </div>
                                    <div>
                                        {{ele.name}}
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section v-else class="no-children-wrap" @click="choosedMenu(item)"  :class="{ 'active-li': currentMenu === item.id }">
                            <div>
                                <img :src="item.picUrl" class="menu-item-icon"/>
                            </div>
                            <div v-show="isPickUp">
                                {{item.name}}
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

<script lang="ts" src="./detailsMain.ts"></script>

<style lang="less">
    @import './detailsMain.less';
</style>

