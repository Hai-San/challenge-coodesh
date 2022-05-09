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
                placeholder="Search by name or nationality"
            >
        </div>

        <label
            class="patientsList_genderFilter"
        >
            Filter by Gender
            <select
                v-model="filteredGender"
                class="patientsList_genderFilter_input"
            >
                <option value="">
                    All
                </option>
                <option value="male">
                    Male
                </option>
                <option value="female">
                    Female
                </option>
            </select>
        </label>

        <table class="patientsList_table">
            <div
                v-if="loading"
                class="table_loading is_loading"
            />
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        gender
                    </th>
                    <th>
                        Birth
                    </th>
                    <th>
                        Nationality
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
                        :id="patient.login.uuid"
                        :key="`${pageIndex + 1}${index}`"
                    >
                        <td>{{ patient.name.first }} {{ patient.name.last }}</td>
                        <td>{{ patient.gender }}</td>
                        <td>{{ patient.dob.date }}</td>
                        <td>{{ patient.location.country }}</td>
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
            :class="loading ? 'is_loading' : ''"
            @click="loadNextPage"
        >
            <span class="button_text">
                Load more
            </span>
            <span
                aria-busy="true"
                class="button_loading"
                role="alert"
            >
                Loading more patients
            </span>
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

const loading = ref(true)
const urlParams = new URLSearchParams(window.location.search)
const searchByName = ref('')
const filteredGender = ref('')
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
            let filtered = true

            if(filteredGender.value) {
                filtered = patient.gender === filteredGender.value
            }

            if(filtered) {
                filtered = patient.name.first.toLowerCase().includes(searchValue) || patient.name.last.toLowerCase().includes(searchValue) || patient.location.country.toLowerCase().includes(searchValue)
            }

            return filtered
        })
    })	
}) 

watch(store.state.patients.all, () => {
    if(openedPatient?.page) {
        loadOpenedPatient()
    }

    loading.value = false
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
            return patient.login.uuid == openedPatient.id
        })[0]
    }
}

function loadNextPage() {
    loading.value = true
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
        id: patient.login.uuid,
        patientPage: page
    }
    modalData.show = true
}

loadPatients()
</script>

<style lang="scss">
@use '@/styles/tools/loading.scss' as *;
@use '@/styles/utils/layout.scss';
@use '@/styles/utils/inputs.scss';
@use '@/styles/utils/buttons.scss';
@use '@/styles/utils/tables.scss';
@use '@/styles/tokens/border.scss' as *;
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
	@extend %input_big;

	background-image: url('@assets/icons/search.svg');
	background-size: 30px;
	background-position: center right  $spacing-xxs-px;
	background-repeat: no-repeat;
}

.patientsList_genderFilter {
	display: flex;
	align-self: flex-start;
	flex-direction: column;
}

.patientsList_genderFilter_input {
	@extend %select_input;

	margin-top: $spacing-nano-px;
}

.patientsList_table {
	@extend %table;
}

.patientsList_buttonDetails {
	@extend %button_small;
	float: right;
}

.patientsList_buttonLoadMore {
	@extend %button;
}
</style>