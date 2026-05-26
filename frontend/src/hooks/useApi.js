import { useMutation } from '@tanstack/react-query'
import api from '../utils/api'

export function useApiMutation(endpoint, options = {}) {
  return useMutation({
    mutationFn: async (data) => {
      if (data instanceof FormData) {
        return api.post(endpoint, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      return api.post(endpoint, data)
    },
    ...options,
  })
}

export function useApiGet(endpoint) {
  return useMutation({
    mutationFn: async () => api.get(endpoint),
  })
}
