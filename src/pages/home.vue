<template>
    <main class="pageHome">
        <div class="pageHome_container">
            <Patients />
        </div>
    </main>
</template>

<script>
import Patients from '@/components/Patients.vue'

export default {
    name: 'PageHome',
    components: {
        Patients
    },
    setup() {
    }
}
</script>

<style lang="scss">
@use '@/styles/snippets/containers.scss';
@use '@/styles/tokens/spacing.scss' as *;

.pageHome {
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	padding-bottom: $spacing-xl-vh;
	margin-top: $spacing-md-vh;
}

.pageHome_container {
	@extend %container;
}
</style>
