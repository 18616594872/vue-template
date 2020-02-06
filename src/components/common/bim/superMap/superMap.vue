<template>
    <div class="superMap-wrap">
        <div class="cesiumContainer" id="cesiumContainer" v-cancellation></div>
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
            // this.createHtml()
        }

        createHtml(){
            return new Promise((resolve, reject) => {
                if (!this.VIEWER) {
                    $('#cesiumContainer')
                        .prepend(
                            "<div id='simple3DBox' style='position: relative;height: 100%;width: 100%'></div>"
                        )
                        .end()

                    this.VIEWER= new Cesium.Viewer('simple3DBox')
                    resolve()
                } else {
                    reject()
                }
            })
        }

    }
</script>

<style lang="scss">
    @import "@/assets/scss/variables";

    .superMap-wrap {
        width: 100%;
    }
</style>