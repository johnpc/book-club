import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfileCreateFormInputValues = {
  id?: string;
  userId?: string;
  email?: string;
  avatarKey?: string;
  name?: string;
};
export declare type ProfileCreateFormValidationValues = {
  id?: ValidationFunction<string>;
  userId?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  avatarKey?: ValidationFunction<string>;
  name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ProfileCreateFormOverridesProps = {
  ProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  id?: PrimitiveOverrideProps<TextFieldProps>;
  userId?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  avatarKey?: PrimitiveOverrideProps<TextFieldProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ProfileCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: ProfileCreateFormInputValues,
    ) => ProfileCreateFormInputValues;
    onSuccess?: (fields: ProfileCreateFormInputValues) => void;
    onError?: (
      fields: ProfileCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: ProfileCreateFormInputValues,
    ) => ProfileCreateFormInputValues;
    onValidate?: ProfileCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProfileCreateForm(
  props: ProfileCreateFormProps,
): React.ReactElement;
