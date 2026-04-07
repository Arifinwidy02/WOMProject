import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type loginFormValues = yup.InferType<typeof loginSchema>;
