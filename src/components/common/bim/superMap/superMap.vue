<template>
    <div class="superMap-wrap">
        <div class="cesiumContainer" id="cesiumContainer"></div>
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
        // prop
        @Prop({
            required: false,
            default: ''
        }) name!: string

        mounted() {
        }

    }
</script>

<style lang="scss">
    @import "@/assets/scss/variables";

    .superMap-wrap {
        width: 100%;
    }
</style>