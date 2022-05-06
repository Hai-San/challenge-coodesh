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
                <template v-for="(pagePatients, pageIndex) in paginatedPatientsFiltered">
                    <tr
                        v-for="(patient, index) in pagePatients"
                        :key="`${pageIndex + 1}${index}`"
                    >
                        <td>{{ patient.name.first }} {{ patient.name.last }}</td>
                        <td>{{ patient.gender }}</td>
                        <td>{{ patient.dob.date }}</td>
                        <td>
                            <button
                                class="patientsList_buttonDetails"
                                @click="openModal(patient, pageIndex + 1)"
                            >
                                Details
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <button
            class="patientsList_buttonLoadMore"
            @click="loadNextPage"
        >
            Load more
        </button>
    </div>
    <PatientModalData
        v-bind="modalData"
        @close="modalData.show = false, modalData.url = {}"
    />
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import PatientModalData from '@/components/PatientModalData.vue'

const urlParams = new URLSearchParams(window.location.search)
const searchByName = ref('')
const currentPage = ref(1)
const patientsPerPage = ref(10)
const store = useStore()
const openedPatient = reactive({
    id: '',
    page: '',
    data: null
})
const modalData = reactive({
    show: false,
    photo: '',
    fullName: '',
    email: '',
    gender: '',
    birth: '',
    phone: '',
    nat: '',
    address: '',
    id: null,
    url: {}
})

const paginatedPatients =  computed(() => {
    return store.state.patients.all
})

const paginatedPatientsFiltered = computed(() => {
    const searchValue = searchByName.value.toLowerCase()
    return paginatedPatients.value.map(page => {
        return page.filter(patient => {
        	return patient.name.first.toLowerCase().includes(searchValue) || patient.name.last.toLowerCase().includes(searchValue)
        })
    })	
}) 

watch(store.state.patients.all, () => {
    if(openedPatient?.page) {
        loadOpenedPatient()
    }
})

watch(openedPatient, () => {
    if(openedPatient.data) {
        openModal(openedPatient.data, openedPatient.page)
    }    
})

if(urlParams) {
    openedPatient.id = urlParams.get('id')
    openedPatient.page = urlParams.get('patientPage')
}

function loadOpenedPatient() {
    if (openedPatient.page > currentPage.value) {
        loadNextPage()
    } else if (openedPatient.id)   {        
        openedPatient.data = paginatedPatients.value[openedPatient.page - 1].filter(patient => {
            return patient.id.value == openedPatient.id
        })[0]
    }
}

function loadNextPage() {
    currentPage.value++
    loadPatients()
}

function loadPatients() {
    store.dispatch('patients/fetchPatients',{ page: currentPage, perPage: patientsPerPage })
}

function openModal(patient, page) {
    modalData.photo = patient.picture.large
    modalData.fullName = `${patient.name.first} ${patient.name.last}`
    modalData.email = patient.email
    modalData.gender = patient.gender
    modalData.birth = patient.dob.date
    modalData.phone = patient.phone
    modalData.nat = patient.nat
    modalData.address = `${patient.location.street.name} ${patient.location.street.number}, ${patient.location.postcode}, ${patient.location.city} - ${patient.location.state}, ${patient.location.country}`
    modalData.id = patient.id
    modalData.url = {
        id: patient.id.value,
        patientPage: page
    }
    modalData.show = true
}

loadPatients()
</script>

<style lang="scss">
@use '@/styles/tools/placeholderColor.scss' as *;
@use '@/styles/tools/interactions.scss' as *;
@use '@/styles/utils/layout.scss';
@use '@/styles/utils/buttons.scss';
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
	gap: $spacing-md-vh 0px;
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
	background-position: center right  $spacing-xxs-px;
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
		padding: $spacing-sm-vh 0px;

		text-align: left;

		&:first-of-type {
			padding-left: $spacing-md-vh;
		}

		&:last-of-type {
			padding-right: $spacing-md-vh;

			text-align: right;
		}	

		&:not(:last-child) {
			padding-right: $spacing-xxs-px;
		}
	}
}

.patientsList_buttonDetails {
	@extend %button_small;
	float: right;
}

.patientsList_buttonLoadMore {
	@extend %button;
}
</style>