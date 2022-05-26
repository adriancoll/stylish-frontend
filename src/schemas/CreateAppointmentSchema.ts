import { string, object, date } from 'yup'

export default object().shape({
  service_type: object()
    .shape({
      label: string(),
      value: string(),
      key: string(),
    })
    .required('Debe ingresar un servicio'),
  date: date().required('Debe ingresar una fecha'),
  observations: string()
    .optional()
    .max(255, 'Debe tener un máximo de 255 (tweet) caracteres.'),
})
