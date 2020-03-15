<template>
    <div class="UMTitle-wrap">
        {{Text}}
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true,
            default: ''
        }) Text!: string
    }
</script>

<style lang="less">
    .UMTitle-wrap {
        width: 100%;
        height: 40px;
        background: linear-gradient(90deg, #495158 0%, #323a43 100%);
        font-size: 1rem;
        line-height: 40px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        
    }
</style>