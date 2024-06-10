import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Profile } from "./graphql/types";
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
export declare type ProfileUpdateFormInputValues = {
  id?: string;
  userId?: string;
  email?: string;
  avatarKey?: string;
  name?: string;
};
export declare type ProfileUpdateFormValidationValues = {
  id?: ValidationFunction<string>;
  userId?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  avatarKey?: ValidationFunction<string>;
  name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ProfileUpdateFormOverridesProps = {
  ProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  id?: PrimitiveOverrideProps<TextFieldProps>;
  userId?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  avatarKey?: PrimitiveOverrideProps<TextFieldProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ProfileUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    profile?: Profile;
    onSubmit?: (
      fields: ProfileUpdateFormInputValues,
    ) => ProfileUpdateFormInputValues;
    onSuccess?: (fields: ProfileUpdateFormInputValues) => void;
    onError?: (
      fields: ProfileUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: ProfileUpdateFormInputValues,
    ) => ProfileUpdateFormInputValues;
    onValidate?: ProfileUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProfileUpdateForm(
  props: ProfileUpdateFormProps,
): React.ReactElement;
