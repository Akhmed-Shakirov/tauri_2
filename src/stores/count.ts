import { ref } from 'vue'
import { defineStore } from 'pinia'

const useCount = defineStore('count', () => {
    const count = ref<number>(0)

    return {
        count
    }
})

export default useCount
