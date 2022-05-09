<template>
    <header class="header">
        <div class="header_container">
            <a
                class="header_logo"
                href="/"
                title="Pharma home page"
            >
                <img
                    aria-hidden="true"
                    class="header_logo_image"
                    :src="logo"
                    alt="Pharma logo"
                >
            </a>
            <button
                class="header_buttonUser"
                title="Click to open user options"
            />
        </div>
    </header>
</template>
<script>
import logo from '@assets/logo.svg'

export default {
    name: 'Header',
    setup() {
        return {
            logo
        }
    }
}
</script>
<style lang="scss">
@use '@/styles/utils/containers.scss';
@use '@/styles/tokens/speed.scss' as *;
@use '@/styles/tokens/spacing.scss' as *;
@use '@/styles/tokens/borders.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/tools/interactions.scss' as *;

.header {
	display: flex;
	justify-content: center;

	width: 100%;
	padding: $spacing-xxxs-vh 0px;

	border-bottom: $border-width-base solid $border-color-primary-base; 
}

.header_container {
	@extend %container;
	align-items: center;
	justify-content: space-between;
}

.header_logo_image {
	width: 60px;
}

.header_buttonUser {
	width: 60px;
	height: 60px;

	background-image: url('@assets/icons/user.svg');
	background-color: $color-primary-base;
	background-size: 32px;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: 50%;

	transition: opacity ease-in-out $speed-base;

	cursor: pointer;

	will-change: opacity;

	@include interaction_full {
		opacity: .75;
	}
}
</style>