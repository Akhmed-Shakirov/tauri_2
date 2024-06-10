<template>
    <h3 @click="logout()">Hello Mobile App!!!</h3>
</template>

<script setup lang="ts">
// import { Button } from '../components'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const access_token = useStorage('access_token', '')
const refresh_token = useStorage('refresh_token', '')
const is_auth = useStorage('is_auth', false)
const router = useRouter()

const logout = () => {
    refresh_token.value = ''
    access_token.value = ''
    is_auth.value = false
    router.push('/login')
}
</script>

<style scoped lang="scss"></style>
