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
export declare type PostCreateFormInputValues = {
  date?: string;
  description?: string;
  title?: string;
};
export declare type PostCreateFormValidationValues = {
  date?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PostCreateFormOverridesProps = {
  PostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostCreateFormProps = React.PropsWithChildren<
  {
    overrides?: PostCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onSuccess?: (fields: PostCreateFormInputValues) => void;
    onError?: (fields: PostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onValidate?: PostCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function PostCreateForm(
  props: PostCreateFormProps,
): React.ReactElement;
