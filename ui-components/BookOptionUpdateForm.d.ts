import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { BookOption } from "./graphql/types";
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
export declare type BookOptionUpdateFormInputValues = {
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
export declare type BookOptionUpdateFormValidationValues = {
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
export declare type BookOptionUpdateFormOverridesProps = {
  BookOptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type BookOptionUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: BookOptionUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    bookOption?: BookOption;
    onSubmit?: (
      fields: BookOptionUpdateFormInputValues,
    ) => BookOptionUpdateFormInputValues;
    onSuccess?: (fields: BookOptionUpdateFormInputValues) => void;
    onError?: (
      fields: BookOptionUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: BookOptionUpdateFormInputValues,
    ) => BookOptionUpdateFormInputValues;
    onValidate?: BookOptionUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function BookOptionUpdateForm(
  props: BookOptionUpdateFormProps,
): React.ReactElement;
