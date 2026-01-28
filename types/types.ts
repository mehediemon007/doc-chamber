export type FormActionState = {
  success: boolean;
  message: string | null;
  error: string | null;
  fieldErrors?: Record<string, string[]> | null;
};