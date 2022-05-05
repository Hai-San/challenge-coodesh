<template>
    <div class="patientsList">
        <div class="patientsList_searchField">
            <label
                class="patientsList_searchLabel"
                for="patientsList_searchInput"
            >Search by name</label>
            <input
                id="patientsList_searchInput"
                v-model="searchByName"
                class="patientsList_searchInput"
                type="text"
                placeholder="Search by name"
            >
        </div>

        <table class="patientsList_table">
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Gender
                    </th>
                    <th>
                        Birth
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(patient, index) in filteredPatients"
                    :key="index"
                >
                    <td>{{ patient.name.first }} {{ patient.name.last }}</td>
                    <td>{{ patient.gender }}</td>
                    <td>{{ patient.dob.date }}</td>
                    <td>
                        <button
                            class="patientsList_buttonDetails"
                            @click=""
                        >
                            Details
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button
            class="patientsList_buttonLoadMore"
            @click="loadNextPage"
        >
            Load more
        </button>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(){
        const searchByName = ref('')
        const currentPage = ref(1)
        const patientsPerPage = ref(10)
        const store = useStore()
        const patientsPages =  computed(() => store.state.patients.all)

        const filteredPatients = computed(() => {
            const searchValue = searchByName.value.toLowerCase()
        	return patientsPages.value.filter(patient => {
                return patient.name.first.toLowerCase().includes(searchValue) || patient.name.last.toLowerCase().includes(searchValue)
            })	
        })  	
        

        function loadNextPage() {
            currentPage.value++
            loadPatients()
        }

        function loadPatients() {
            store.dispatch('patients/fetchPatients',{ page: currentPage, perPage: patientsPerPage })
        }

        loadPatients()

        return {
            searchByName,
            filteredPatients,
            patientsPages,
            loadNextPage
        }
    }
}
</script>

<style lang="scss">
@use '@/styles/tools/placeholderColor.scss' as *;
@use '@/styles/tools/interactions.scss' as *;
@use '@/styles/utils/layout.scss';
@use '@/styles/tokens/border.scss' as *;
@use '@/styles/tokens/components/inputs.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/tokens/spacing.scss' as *;
@use '@/styles/tokens/speed.scss' as *;

.patientsList {
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	gap: $spacing-vh-md 0px;
}

.patientsList_searchField{
	width: 100%;

}

.patientsList_searchLabel {
	@extend %accessible_hidden;
}

.patientsList_searchInput {
	@include placeholderColor($color: $input-placeholder-color);

	width: 100%;
	padding: $input-padding;

	background-image: url('@assets/icons/search.svg');
	background-color: $input-background-color;
	background-size: 30px;
	background-position: center right  $spacing-px-xxs;
	background-repeat: no-repeat;
	border: 1px solid $input-border-color;

	transition: background-color ease-in-out $speed-base;

	will-change: background-color;

	@include interaction_focus {
		background-color: $input-background-color-focus;
	}
}

.patientsList_table {
	box-sizing: border-box;

	width: 100%;

	border: 1px solid $color-primary-darkest;	
	border-collapse: separate;

	border-spacing: 0px;

	thead {
		width: 100%;

		background-color: $color-primary-base;
	}

	tbody {

		&:not(:first-of-type) {

			td {
				margin-top: -$border-width-small;
			}
		}
	}

	tr {
		width: 100%;

		box-shadow: none;

		&:not(:first-child) {

			td {
				border-top: 0px;
			}
		}

		&:last-of-type {

			td {
				border-bottom: 0px;
			}
		}
	}

	th {
		color: $color-high-lightest;

		text-transform: uppercase;
	}

	td {
		color: black;
		border-top: $border-width-small solid $color-primary-darkest;
		border-bottom: $border-width-small solid $color-primary-darkest;
	}

	td,th {
		padding: $spacing-vh-sm 0px;

		text-align: left;

		&:first-of-type {
			padding-left: $spacing-vh-md;
		}

		&:last-of-type {
			padding-right: $spacing-vh-md;

			text-align: right;
		}	

		&:not(:last-child) {
			padding-right: $spacing-px-xxs;
		}
	}
}

.patientsList_buttonDetails {
	display: flex;
	float: right;

	padding: $spacing-vh-xxxs $spacing-vh-xs;

	color: $color-high-lightest;
	background-color: $color-primary-base;

	font-weight: 700;
	text-transform: uppercase;

	transition: opacity ease-in-out $speed-base;

	cursor: pointer;

	will-change: opacity;

	@include interaction_full {
		opacity: .75;
	}	
}

.patientsList_buttonLoadMore {
	display: flex;

	padding: $spacing-vh-xxs $spacing-vh-md;

	color: $color-high-lightest;
	background-color: $color-primary-base;

	font-weight: 700;
	text-transform: uppercase;

	transition: opacity ease-in-out $speed-base;

	cursor: pointer;

	will-change: opacity;

	@include interaction_full {
		opacity: .75;
	}
}
</style>