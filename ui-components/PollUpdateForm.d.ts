import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Poll } from "./graphql/types";
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
export declare type PollUpdateFormInputValues = {
  prompt?: string;
};
export declare type PollUpdateFormValidationValues = {
  prompt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PollUpdateFormOverridesProps = {
  PollUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  prompt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PollUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: PollUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    poll?: Poll;
    onSubmit?: (fields: PollUpdateFormInputValues) => PollUpdateFormInputValues;
    onSuccess?: (fields: PollUpdateFormInputValues) => void;
    onError?: (fields: PollUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PollUpdateFormInputValues) => PollUpdateFormInputValues;
    onValidate?: PollUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function PollUpdateForm(
  props: PollUpdateFormProps,
): React.ReactElement;
