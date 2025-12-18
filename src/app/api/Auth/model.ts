import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    email: z
      .string({ required_error: 'Email harus diisi' })
      .email({ message: 'Masukan format email yang benar' }),
    password: z
      .string({ required_error: 'Password harus diisi' })
      .min(6, { message: 'password minimal 6 karakter' }),
    confirm_password: z
      .string({ required_error: 'Konfirmasi password harus diisi' })
      .min(6, { message: 'Password minimal 6 karakter' }),
    name: z
      .string({ required_error: 'Nama harus diisi' })
      .nonempty({ message: 'Nama harus diisi' }),
    educationLevel: z.enum(
      [
        'Elementary_School',
        'Junior_High_School',
        'Senior_High_School',
        'Undergraduate',
        'Graduate',
        'Bachelor',
      ],
      {
        required_error: 'Tingkat pendidikan harus diisi',
        invalid_type_error: 'Tingkat pendidikan tidak valid',
      }
    ),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'Kata sandi harus cocok',
      path: ['confirm_password'],
    }
  );

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: 'email harus diisi' })
    .email({ message: 'Masukan format email yang benar' })
    .nonempty({ message: 'email harus diisi' }),
  password: z
    .string({ required_error: 'password harus diisi' })
    .min(6)
    .nonempty({ message: 'password harus diisi' }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
