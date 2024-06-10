import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Post } from "./graphql/types";
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
export declare type PostUpdateFormInputValues = {
  date?: string;
  description?: string;
  title?: string;
};
export declare type PostUpdateFormValidationValues = {
  date?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PostUpdateFormOverridesProps = {
  PostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: PostUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    post?: Post;
    onSubmit?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onSuccess?: (fields: PostUpdateFormInputValues) => void;
    onError?: (fields: PostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onValidate?: PostUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function PostUpdateForm(
  props: PostUpdateFormProps,
): React.ReactElement;
