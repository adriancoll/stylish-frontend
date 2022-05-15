import { string, object } from 'yup'
import 'yup-phone'

export const getSchema = (region: string) =>
  object().shape({
    email: string()
      .email('Debe ser un email válido')
      .required('Debe ingresar un email'),
    name: string().required('Debes ingresar tu nombre'),
    password: string()
      .min(6, 'Debe tener al menos 6 caracteres')
      .required('Debe ingresar una contraseña'),
    phone_number: string()
      .phone(region, false, 'El formato no es correcto, revisa el número')
      .required('Debe ingresar un número de teléfono'),
  })
