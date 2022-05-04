import apiPatients from '@/api/patients'

const state = {
    all: []
}

const getters = {
    getPatients: (state) => state.all
}

const actions = {
    fetchPatients({ commit }, payload) {
        const patientsList = apiPatients.getPatients(payload)
        patientsList.then(response => {
            commit('setPatients', response.results)
        })       
    }
}

const mutations = {
    setPatients(state, patients) {
        state.all.push(...patients)   
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}