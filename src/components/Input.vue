<template>
    <div
        class="field"
        :class="{
            'field-icon' : icon,
            'field__error': text || errorText
        }"
    >
        <label class="field__label" v-if="label">
            {{ $t(label ?? '') }}
        </label>

        <input
            class="field__main"
            v-model="modelValue"
            :placeholder="$t(placeholder ?? 'enter_data')"
            @keyup.enter="$emit('enter')"
            v-maska:[masks]
            :type="types"
        >

        <p class="field__text" v-if="text || errorText">{{ $t((text || errorText) ?? '') }}</p>

        <Icon
            class="field__icon"
            @click="$emit('icon')"
            :icon="icon"
            v-if="icon"
        />

        <Validator
            v-if="validator?.length"
            v-model="modelValue"
            v-model:errorText="errorText"
            :validator="validator"
        />
    </div>
</template>

<script setup lang="ts">
import { Icon, Validator } from './index.ts'
import { ref, defineModel, computed } from 'vue'
import { useFindItem } from '../composables'
import { vMaska } from 'maska'

const modelValue = defineModel<string | null>()

const emit = defineEmits(['icon', 'enter'])

const props = withDefaults(defineProps<{
    icon?: string
    label?: string
    placeholder?: string
    validator?: string[]
    name?: string
    type?: string
    mask?: string
    text?: string
}>(), {
    validator: () => []
})

const errorText = ref('')

const masks = computed<{ mask: string }>(() => {
    return {
        mask: props.mask ? props.mask : ''
    }
})

const types = computed<string>(() => {
    if (props.type) {
        return props.type
    }

    for (const iterator of ['number', 'email', 'password']) {
        const type = useFindItem(iterator, props.validator)

        if (type) return type
    }

    return 'text'
})
</script>

<style scoped lang="scss">
</style>
