<template>
    <h3 @click="logout()">Hello Mobile App!!!</h3>
</template>

<script setup lang="ts">
import { useToken } from '../stores'
const { logout } = useToken()
</script>

<style scoped lang="scss">
</style>
