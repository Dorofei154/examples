import { ResetPasswordFormValues } from '../../interfaces';

export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormValues) => void;
  error?: string;
  loading?: boolean;
}
