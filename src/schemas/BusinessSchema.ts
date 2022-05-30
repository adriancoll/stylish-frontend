import { array, number } from 'yup'
import { string, object } from 'yup'

export default object().shape({
  name: string().required('Debe ingresar un email'),
  longitude: number().required('Debe ingresar una longitud.'),
  latitude: number().required('Debe ingresar una longitud.'),
  employees: number()
    .default(1)
    .required('Debe ingresar una cantidad de empleados.'),
  service_types: array(string()).required('Debe ingresar uno o más servicios.'),
})
