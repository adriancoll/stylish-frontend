import { string, object } from 'yup'

export default object().shape({
  email: string()
    .email('Debe ser un email válido')
    .required('Debe ingresar un email'),
  password: string()
    .min(6, 'Debe tener al menos 6 caracteres')
    .required('Debe ingresar una contraseña'),
})
