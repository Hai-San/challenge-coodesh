<template>
    <Teleport to="body">
        <modal
            :url-params="url"
            :show="show"
            @close="$emit('close')"
        >
            <template #content>
                <div class="patientModal">
                    <img
                        class="patientModal_photo"
                        :src="photo"
                        :alt="fullName"
                    >
                    <p class="patientModal_data">
                        <b>Name:</b>{{ fullName }}
                    </p>
                    <p class="patientModal_data">
                        <b>Gender:</b>{{ gender }}
                    </p>
                    <p class="patientModal_data">
                        <b>Birth:</b>{{ birth }}
                    </p>
                    <p class="patientModal_data">
                        <b>Nationality:</b>{{ nat }}
                    </p>
                    <p
                        v-if="id.value"
                        class="patientModal_data"
                    > 
                        <b>Id:</b> {{ id.name }} - {{ id.value }}
                    </p>
                    <p class="patientModal_data">
                        <b>Address:</b>{{ address }}
                    </p>
                    <p class="patientModal_data">
                        <b>Phone:</b>
                        <a :href="`tel:${phone}`">{{ phone }}</a>
                    </p>
                    <p class="patientModal_data"> 
                        <b>Email:</b><a :href="`mailto:${email}`">{{ email }}</a>
                    </p>
                    <button
                        class="patientModal_urlButton js_patientModal_urlButton"
                        :data-clipboard-text="modalUrl"
                    >
                        {{ urlButtonText }}
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Modal from './Modal.vue'
import ClipboardJS from 'clipboard'

const route = useRoute()
const modalUrl = ref(location.href)
const urlButtonTextDefault = 'Copy URL'
const urlButtonTextCopied = 'The URL was copied!'
const urlButtonText = ref(urlButtonTextDefault)
const clipboardUrl = new ClipboardJS('.js_patientModal_urlButton')
const emit = defineEmits([ 'close' ])

watch(() => route.query, () => {
    modalUrl.value = location.href
})

clipboardUrl.on('success', function (e) {
    urlButtonText.value = urlButtonTextCopied
    setTimeout(() => {
        urlButtonText.value = urlButtonTextDefault
    }, 2000)
})

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
        type: Object,
        default() {
            return {
                id: '',
                patientPage: ''
            }
        }
    }
})


</script>

<style lang="scss">
@use '@/styles/tokens/spacing.scss' as *;
@use '@/styles/utils/buttons.scss';

.patientModal {
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;

	width: 640px;
	max-width: 100%;
	padding: $spacing-lg-vh;
	gap: $spacing-xxxs-px;
}

.patientModal_photo {
	--size: 128px;

	display: flex;

	width: var(--size);
	height: var(--size);
	margin: 0 auto;
	margin-top: calc(var(--size) / -2 - $spacing-lg-vh);

	border-radius: 50%;

	object-fit: cover;
}

.patientModal_data {
	display: flex;

	width: 100%;

	b {
		margin-right: $spacing-nano-px;
	}
}

.patientModal_urlButton {
	@extend %button_small;
	align-self: center;

	margin-top: $spacing-md-vh;
}
</style>