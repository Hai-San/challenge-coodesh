<template>
    <Teleport to="body">
        <modal
            :show="show"
            @close="$emit('close')"
        >
            <template #body>
                {{ fullName }}
                {{ email }}
            </template>
        </modal>
    </Teleport>
</template>

<script setup>
import Modal from './Modal.vue'

const props = defineProps({
    show: Boolean,
    photo: {
        type:String,
        default: ''
    },
    fullName: {
        type:String,
        default: ''
    },
    email: {
        type:String,
        default: ''
    },
    gender: {
        type:String,
        default: ''
    },
    birth: {
        type:String,
        default: ''
    },
    phone: {
        type:String,
        default: ''
    },
    nat: {
        type:String,
        default: ''
    },
    address: {
        type:String,
        default: ''
    },
    id: {
        type: Object,
        default() {
            return {
                name: '',
                value: ''
            }
        }
    },
    url: {
        type:String,
        default: ''
    }
})

const emit = defineEmits([ 'close' ])
</script>

<style lang="scss">
	
</style>