<template>
    <section class="login">
        <img src="/images/waves.svg" alt="waves" class="login__waves">

        <img src="/images/logo.svg" alt="logo" class="login__logo">

        <div class="login__info">
            <h3>{{ $t(text.h3[count] ?? '') }}</h3>
            <p>{{ $t(text.p[count]) ?? '' }} {{ count == 3 ? 'example*****@gmail.com' : '' }}</p>
        </div>

        <Form v-model="formHendler">
            <div class="login__form">
                <Input
                    v-model="item.login"
                    :validator="validator.login"
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

            <Button :value="text.button[count]" isSubmit />
        </Form>

        <span>v2.27 <br> ac75ed5169d1f91a</span>
    </section>
</template>

<script setup lang="ts">
import { Form, Button, Input } from '../components'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

const access_token = useStorage('access_token', '')
const refresh_token = useStorage('refresh_token', '')
const is_auth = useStorage('is_auth', false)
const router = useRouter()

const count = ref<number>(1)
const text = ref<any>({
    h3: {
        1: 'welcome',
        2: 'password_recovery',
        3: 'letter_sent'
    },
    p: {
        1: 'please_enter_your_details',
        2: 'enter_your_account_login_receive_email_with_new_password',
        3: 'email_with_password_has_been_sent_to'
    },
    a: {
        1: 'forgot_your_password',
        2: 'return_login',
        3: ''
    },
    button: {
        1: 'enter',
        2: 'restore',
        3: 'return_login'
    }
})

const item = ref<any>({
    login: '',
    password: ''
})
const validator = {
    login: ['required', 'email'],
    password: ['required']
}

const login = () => {
    if (count.value == 1) {
        refresh_token.value = 'token'
        access_token.value = 'token'
        is_auth.value = true
        router.push('/')

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
