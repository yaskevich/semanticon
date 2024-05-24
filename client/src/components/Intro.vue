<template>
    <div v-for="item in store?.meta?.intro" :class="'p-component p-4 info ' + item?.class">
        <div class="explain-header" v-if="item?.header">{{ item.header }}</div>
        <div class="ml-4" v-html="item.body"></div>
        <div class="text-center" v-if="item?.image">
            <img :src="item.image" :style="{ maxHeight: item?.height || '10rem' }" />
        </div>
    </div>
</template>
<script setup>
import store from '../store';
</script>
