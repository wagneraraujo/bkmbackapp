import axios from 'axios'

export const tempToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4MjQ3MzI4LCJpYXQiOjE2NTU2NTUzMjgsImp0aSI6ImU4NTQxZmFiZTBmMTQ3M2NhZDYxZDQyMzY2MWVlOGRiIiwidXNlcl9pZCI6Nn0.gdlQpitRKr1ugekWshfBcuhpffgevchc67hdeqDMG8s'

export const api = axios.create({
  baseURL: `https://bkmapp.store/api/v1`,
})
