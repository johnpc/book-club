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
export declare type BookOptionCreateFormInputValues = {
  title?: string;
  author?: string;
  publishDate?: string;
  description?: string;
  pageCount?: number;
  imageUrl?: string;
  googleBooksUrl?: string;
  price?: number;
  voteCount?: number;
};
export declare type BookOptionCreateFormValidationValues = {
  title?: ValidationFunction<string>;
  author?: ValidationFunction<string>;
  publishDate?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  pageCount?: ValidationFunction<number>;
  imageUrl?: ValidationFunction<string>;
  googleBooksUrl?: ValidationFunction<string>;
  price?: ValidationFunction<number>;
  voteCount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type BookOptionCreateFormOverridesProps = {
  BookOptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  author?: PrimitiveOverrideProps<TextFieldProps>;
  publishDate?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  pageCount?: PrimitiveOverrideProps<TextFieldProps>;
  imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
  googleBooksUrl?: PrimitiveOverrideProps<TextFieldProps>;
  price?: PrimitiveOverrideProps<TextFieldProps>;
  voteCount?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BookOptionCreateFormProps = React.PropsWithChildren<
  {
    overrides?: BookOptionCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: BookOptionCreateFormInputValues,
    ) => BookOptionCreateFormInputValues;
    onSuccess?: (fields: BookOptionCreateFormInputValues) => void;
    onError?: (
      fields: BookOptionCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: BookOptionCreateFormInputValues,
    ) => BookOptionCreateFormInputValues;
    onValidate?: BookOptionCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function BookOptionCreateForm(
  props: BookOptionCreateFormProps,
): React.ReactElement;
