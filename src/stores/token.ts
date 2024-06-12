import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const useToken = defineStore('token', () => {
    const router = useRouter()

    const access_token = ref<string>('')
    const refresh_token = ref<string>('')
    const city_access_token = ref<string>('')
    const city_refresh_token = ref<string>('')
    const is_auth = ref<boolean>(false)
    const user_info = ref<any>({})

    // Storage
    const access = useStorage('access_token', '')
    const refresh = useStorage('refresh_token', '')
    const city_access = useStorage('city_access_token', '')
    const city_refresh = useStorage('city_refresh_token', '')
    const isAuth = useStorage('is_auth', false)
    const user = useStorage('user', {})


    const logout = () => {
        access_token.value = ''
        refresh_token.value = ''
        city_access_token.value = ''
        city_refresh_token.value = ''
        is_auth.value = false
        user_info.value = {}

        router.push('/login')
    }

    const setAuth = (auth: any) => {
        access_token.value = auth?.access
        refresh_token.value = auth?.refresh
        user_info.value = auth?.user
    }

    const setCity = (city: any) => {
        city_access_token.value = city?.access
        city_refresh_token.value = city?.refresh
        is_auth.value = true
        router.push('/')
    }

    const load = () => {
        access_token.value = access.value
        refresh_token.value = refresh.value
        city_access_token.value = city_access.value
        city_refresh_token.value = city_refresh.value
        is_auth.value = isAuth.value
        user_info.value = user.value
    }

    const beforeunload = () => {
        access.value = access_token.value
        refresh.value = refresh_token.value
        city_access.value = city_access_token.value
        city_refresh.value = city_refresh_token.value
        isAuth.value = is_auth.value
        user.value = user_info.value
    }

    return {
        access_token,
        refresh_token,
        city_access_token,
        city_refresh_token,
        is_auth,
        user_info,

        logout,
        load,
        beforeunload,
        setAuth,
        setCity
    }
})

export default useToken
