
import { createStore } from 'vuex'
import patients from './modules/patients'

export default createStore({
    modules: {
        patients
    }
})