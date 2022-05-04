<template>
    <Header />
    <router-view />
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style lang="scss">
@import './styles/global/global.scss';
@import './styles/global/reset.scss';
@import './styles/global/fonts.scss';
</style>