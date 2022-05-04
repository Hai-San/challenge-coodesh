<template>
    <div class="patientsList">
        <input
            v-model="searchByName"
            type="text"
            placeholder="Buscar por nome"
        >

        <table class="patientsList_table">
            <thead>
                <tr>
                    <th>
                        Nome
                    </th>
                    <th>
                        Gênero
                    </th>
                    <th>
                        Aniversário
                    </th>
                    <th />
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
                    <td>.</td>
                </tr>
            </tbody>
        </table>
        <button
            class="patientsList_button"
            @click="loadNextPage"
        >
            Carregar mais
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
@use '@/styles/tokens/border.scss' as *;
@use '@/styles/tokens/colors.scss' as *;
@use '@/styles/tokens/spacing.scss' as *;

.patientsList {
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	gap: $spacing-vh-md 0px;
}

.patientsList_table {
	box-sizing: border-box;

	width: 100%;

	border: 1px solid black;	
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
		color: black;

		text-transform: uppercase;
	}

	td {
		border-top: $border-width-small solid black;
		border-bottom: $border-width-small solid black;
	}

	td,th {
		padding: $spacing-vh-sm 0px;

		color: black;
		

		text-align: left;

		&:first-of-type {
			padding-left: $spacing-vh-md;
		}

		&:last-of-type {
			padding-right: $spacing-vh-md;
		}	

		&:not(:last-child) {
			padding-right: $spacing-px-xxs;
		}
	}
}

.patientsList_button {
	display: flex;

	padding: $spacing-vh-xxs $spacing-vh-md;

	background-color: $color-primary-base;

	font-weight: 700;
	text-transform: uppercase;

	cursor: pointer;
}
</style>