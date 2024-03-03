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
export declare type PollCreateFormInputValues = {
  prompt?: string;
};
export declare type PollCreateFormValidationValues = {
  prompt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PollCreateFormOverridesProps = {
  PollCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  prompt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PollCreateFormProps = React.PropsWithChildren<
  {
    overrides?: PollCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PollCreateFormInputValues) => PollCreateFormInputValues;
    onSuccess?: (fields: PollCreateFormInputValues) => void;
    onError?: (fields: PollCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PollCreateFormInputValues) => PollCreateFormInputValues;
    onValidate?: PollCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function PollCreateForm(
  props: PollCreateFormProps,
): React.ReactElement;
