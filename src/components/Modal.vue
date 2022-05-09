<template>
    <Transition name="modal">
        <div
            v-if="show"
            class="modal"
            aria-modal="true"
            role="dialog"
        >
            <div class="modal_container">
                <div
                    class="modal_background"
                    @click="close()"
                />
                <div class="modal_box">
                    <button
                        class="modal_button_close"
                        aria-label="Close modal"
                        @click="close()"
                    />
                    <div class="modal_content">
                        <slot name="content" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import router from '@/router'

const emit = defineEmits([ 'close' ])
const props = defineProps({
    show: Boolean,
    urlParams: {
        type: Object,
        default() {
            return {}
        }
    }
})

function close() {
    emit('close')
}

function handleKeyup(event) {
    if(event.key === 'Escape') {
        close()
    }
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyup)
})

watch(() => props.urlParams, (newParams) => {
    let params = null

    if(newParams) {
        params = newParams      

        if(params?.id) {
            const scrollElement = document.getElementById(params?.id)

            if(scrollElement) {
                scrollElement.scrollIntoView()
            }
        }
    }

    router.push({ query: params })    
	
})


</script>

<style lang="scss">
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/tools/interactions.scss' as *;
@use '@/styles/tokens/speed.scss' as *;

.modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;

	overflow-y: auto;

	width: 100%;
	height: 100vh;
}

.modal_container {
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	min-height: 100%;
}

.modal_background {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background-color: $color-low-transparent-base;
}

.modal_box {
	position: relative;
	z-index: 2;

	max-width: 100%;

	background-color: $color-high-lightest;
}

.modal_button_close {
	position: absolute;
	top: 8px;
	right: 8px;

	width: 20px;
	height: 20px;

	background-color: $color-primary-darkest;

	transition: background-color ease-in-out $speed-base;

	cursor: pointer;

	-webkit-mask: url('@assets/icons/close.svg');

	mask: url('@assets/icons/close.svg');
	mask-size: contain;

	will-change: background-color;

	@include interaction_full {
		background-color: $color-primary-base;
	}
}

.modal_content {
	width: 100%;
}

.modal-enter-from,
.modal-leave-to  {
	opacity: 0;
}
</style>