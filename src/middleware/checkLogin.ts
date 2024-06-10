import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const checkLogin = (to: any) => {
    const is_auth = useStorage('is_auth', false)
    const router = useRouter()

    if (to.path !== '/login' && !is_auth.value) {
        router.push('/login')
    }
}

export default checkLogin
