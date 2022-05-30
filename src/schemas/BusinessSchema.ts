import { array, number } from 'yup'
import { string, object } from 'yup'

export default object().shape({
  name: string().required('Debe ingresar un nombre válido'),
  description: string().max(255).required('Debe ingresar una breve descripción que no pase de 255 carácteres'),
  address: object().shape({
    longitude: number().required('Debe ingresar una longitud.'),
    latitude: number().required('Debe ingresar una longitud.'),
  }).required('Debe ingresar una dirección'),
  employees: number()
    .default(1)
    .required('Debe ingresar una cantidad de empleados.'),
  service_types: array(string()).required('Debe ingresar uno o más servicios.'),
})
