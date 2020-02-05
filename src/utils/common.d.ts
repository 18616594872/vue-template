import Vue from 'vue'

declare let SuperMap: any;
declare let Cesium: any;

declare module 'vue/types/vue' {
    interface Vue {
        VIEWER: any,
        LAYERSNAME: any
    }
  }