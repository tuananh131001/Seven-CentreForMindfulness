import * as yup from 'yup'

export const signInSchema = yup.object().shape({
  email: yup.string().email('This is not an email.').required('Please enter an email.'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(7)
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
})

export const signUpSchema = yup.object().shape({
  email: yup.string().email('This is not an email.').required('Please enter an email.'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(7)
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
  name: yup.string().required('Please enter a name.'),
  age: yup.number().typeError('Must be number').required('Please enter an age').min(1,'Min is 1').max(100, 'Max is 100'),
  confirmPassword: yup
    .string()
    .required('Please enter a confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  gender: yup.string().required('Please enter a gender'),
})
