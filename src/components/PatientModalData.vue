<template>
    <Teleport to="body">
        <modal
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
                </div>
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
@use '@/styles/tokens/spacing.scss' as *;

.patientModal {
	display: flex;
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
</style>