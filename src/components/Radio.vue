<template>
    <div class="radio" :class="{ 'radio__error': errorText }">
        <template v-for="item in selects" :key="item">
            <div
                class="radio__item"
                :class="{ 'radio__active': modelValue == item[keys[1]] }"
                @click="setValue(item[keys[1]])"
            >
                {{ $t(item[keys[0]] ?? '') }}

                <span />
            </div>
        </template>

        <p class="radio__text" v-if="errorText">{{ $t(errorText ?? '') }}</p>
    </div>

    <Validator
        v-if="validator?.length"
        v-model="modelValue"
        v-model:errorText="errorText"
        :validator="validator"
    />
</template>

<script setup lang="ts">
import { Validator } from './index.ts'
import { defineModel, ref } from 'vue'

const modelValue = defineModel<string>()
const errorText = ref('')

const setValue = (value: string) => {
    modelValue.value = value
}

const props = withDefaults(defineProps<{
    selects: any[]
    keys?: string[]
    validator?: string[]
}>(), {
    keys: () => ['name', 'value'],
    validator: () => []
})

props
</script>

<style scoped lang="scss">
.radio {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__item {
        font-size: 16px;
        padding: 4px 16px;
        border-radius: 4px;
        height: 46px;

        background: transparent;
        color: #42474E;
        border: 1px solid #72787E;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__active {
        border: 1px solid #3a94cf;
        background: #f5faff;
        color: #3a94cf;
    }

    &__error {
        .radio__item {
            border-color: #BA1A1A;
            color: #BA1A1A;
        }
    }

    &__text {
        font-size: 12px;
        color: #BA1A1A;
    }
}
</style>
