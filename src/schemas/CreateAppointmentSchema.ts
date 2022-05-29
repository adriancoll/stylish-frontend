import { string, object, date } from 'yup'

export default object().shape({
  service_type: string().required('Debe ingresar un servicio'),
  date: string().required('Debe ingresar una fecha'),
  observations: string()
    .optional()
    .max(255, 'Debe tener un máximo de 255 (tweet) caracteres.'),
})
