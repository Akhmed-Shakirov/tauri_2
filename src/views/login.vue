<template>
    <section class="login">
        <img src="/images/waves.svg" alt="waves" class="login__waves">

        <img src="/images/logo.svg" alt="logo" class="login__logo">

        <div class="login__info">
            <h3>{{ $t(text.h3[count] ?? '') }}</h3>
            <p>{{ $t(text.p[count]) ?? '' }} {{ count == 3 ? 'example*****@gmail.com' : '' }}</p>
        </div>

        <Form v-model="formHendler">
            <div class="login__form" v-if="count !== 4">
                <Input
                    v-model="item.username"
                    :validator="validator.username"
                    placeholder="login"
                    v-if="count !== 3"
                />

                <Input
                    v-model="item.password"
                    :validator="validator.password"
                    placeholder="password"
                    type="password"
                    v-if="count == 1"
                />

                <a @click="count !== 2 ? count++ : count--" v-if="text.a[count]">
                    {{ $t(text.a[count]) }}
                </a>
            </div>

            <div class="login__form" v-else>
                <Radio
                    v-model="city_id"
                    :selects="cities"
                    :keys="['name', 'id']"
                    :validator="validator.city_id"
                />
            </div>

            <Button
                v-if=text.button[count]
                :value="text.button[count]"
                isSubmit
            />
        </Form>

        <span>v2.27 <br> ac75ed5169d1f91a</span>
    </section>
</template>

<script setup lang="ts">
import { Form, Button, Input, Radio } from '../components'
import { useToken, storeToRefs } from '../stores'
import { useFetch } from '../composables'
import { ref, watch } from 'vue'

const { access_token } = storeToRefs(useToken())
const { setAuth, setCity } = useToken()

const count = ref<number>(1)
const text = ref<any>({
    h3: {
        1: 'welcome',
        2: 'password_recovery',
        3: 'letter_sent',
        4: 'select_city'
    },
    p: {
        1: 'please_enter_your_details',
        2: 'enter_your_account_login_receive_email_with_new_password',
        3: 'email_with_password_has_been_sent_to',
        4: ''
    },
    a: {
        1: 'forgot_your_password',
        2: 'return_login',
        3: '',
        4: ''
    },
    button: {
        1: 'enter',
        2: 'restore',
        3: 'return_login',
        4: ''
    }
})
const cities = ref<any[]>([])
const city_id = ref<string>('')
watch(city_id, (v) => {
    if (v && count.value == 4) {
        city(v)
    }
})

const item = ref<any>({
    username: '',
    password: ''
})
const validator = {
    username: ['required'],
    password: ['required'],
    city_id: ['']
}

const city = async (id: string) => {
    try {
        const city = await useFetch('auth/city_token/', 'post', {
            auth_token: access_token.value,
            city_id: id,
            is_remember: true
        })

        setCity(city)
    } catch (error) {
        console.log('error city_token', error)
    }
}
const login = async () => {
    if (count.value == 1) {
        const auth = await useFetch('auth/token/', 'post', { ...item.value, is_remember: true })
        setAuth(auth)
        cities.value = auth?.user?.city_user.map((el: any) => ({ ...el.city }))

        if (cities.value?.length == 1) {
            city(cities.value[0].id)
        }

        if (cities.value?.length > 1) {
            count.value = 4
        }

        console.log('auth', auth)

        return
    }

    if (count.value == 2) {
        count.value++
    } else {
        count.value = 1
    }
}
const close = () => {
    console.log('Error')
}
const formHendler = ref({
    send: () => login(),
    error: () => close()
})
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    padding-top: 17vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    &__waves {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }

    &__logo {
        width: 200px;
        margin-bottom: 40px;
    }

    &__info {
        width: 100%;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        gap: 16px;
        min-height: 124px;
    }


    h3, p, a {
        text-align: left;
    }

    h3 {
        font-size: 22px;
        color: #181C20;
        margin-bottom: 8px;
    }

    p {
        font-size: 14px;
        line-height: 16.5px;
        color: #42474E;
    }

    a {
        display: inline;
        font-size: 14px;
        color: #2C638B;
    }

    span {
        font-size: 12px;
        color: #42474E;
    }
}
</style>
