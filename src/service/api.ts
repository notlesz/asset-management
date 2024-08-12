import axios from 'axios'
import { Asset, Location } from '../types'
import { Company } from '../context/type'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getCompanies = async () => {
  try {
    const { data } = await api.get<Company[]>('/companies')
    return data
  } catch (error) {
    return null
  }
}

export const getLocations = async (companyId: string) => {
  try {
    const { data } = await api.get<Location[]>(`/companies/${companyId}/locations`)
    return data
  } catch (error) {
    return null
  }
}

export const getAssets = async (companyId: string) => {
  try {
    const { data } = await api.get(`/companies/${companyId}/assets`)
    return data as Asset[]
  } catch (error) {
    return null
  }
}
