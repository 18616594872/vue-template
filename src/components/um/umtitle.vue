<template>
    <div class="UMTitle-wrap">
        <div class="title">
            <img :src="Title.titleIcon" class="titleIcon" />
            <span>{{Title.text}}</span>
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
        TitleInterface
    } from '@/types/views/operationManagement.interface'

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true,
            default: ''
        }) Title!: TitleInterface
    }
</script>

<style lang="less">
    .UMTitle-wrap {
        width: 100%;

        .title {
            height: 40px;
            background: linear-gradient(90deg, rgba(73, 81, 88, 1) 0%, rgba(50, 58, 67, 1) 100%);
            font-size: 16px;
            line-height: 2;
            padding-left: 15px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;

            .titleIcon {
                width: 19px;
                vertical-align: middle;
                margin-right: 7px;
            }

            span {
                color: #00D2FF;
            }
        }
    }
</style>