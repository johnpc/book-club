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
  publishYear?: number;
  amazonId?: string;
  goodReadsId?: string;
  googleId?: string;
  pageCount?: number;
  voteCount?: number;
};
export declare type BookOptionCreateFormValidationValues = {
  title?: ValidationFunction<string>;
  author?: ValidationFunction<string>;
  publishYear?: ValidationFunction<number>;
  amazonId?: ValidationFunction<string>;
  goodReadsId?: ValidationFunction<string>;
  googleId?: ValidationFunction<string>;
  pageCount?: ValidationFunction<number>;
  voteCount?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type BookOptionCreateFormOverridesProps = {
  BookOptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  author?: PrimitiveOverrideProps<TextFieldProps>;
  publishYear?: PrimitiveOverrideProps<TextFieldProps>;
  amazonId?: PrimitiveOverrideProps<TextFieldProps>;
  goodReadsId?: PrimitiveOverrideProps<TextFieldProps>;
  googleId?: PrimitiveOverrideProps<TextFieldProps>;
  pageCount?: PrimitiveOverrideProps<TextFieldProps>;
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
