import { ref } from 'vue'
import { defineStore } from 'pinia'

const useToken = defineStore('token', () => {
    const refresh_token = ref<string>('')
    const access_token = ref<string>('')
    const is_auth = ref<boolean>(false)

    return {
        refresh_token,
        access_token,
        is_auth
    }
})

export default useToken
