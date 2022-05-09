import axios from 'axios'
import dateTime from '@/util/dateTime'

const resquestSeed = 'pharma1d809dac6eb1a8bh'

export default {
    async getPatients(payload = { page: { value: 1 }, perPage: { value: 50 } }) {		
        const { page: { value: page }, perPage: { value: perPage } } = payload
        try {
            const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=${perPage}&seed=${resquestSeed}`)

            if (response?.data?.results) {
                response.data.results.map(patient => patient.dob.date = dateTime.format(patient.dob.date))
                return response.data
            } else {
                throw new Error('Users not found')
            }
        } catch (error) {
            console.error(error)
        }
    }
}