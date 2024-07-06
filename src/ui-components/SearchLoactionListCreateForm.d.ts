/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SearchLoactionListCreateFormInputValues = {
    addressInfo?: string;
};
export declare type SearchLoactionListCreateFormValidationValues = {
    addressInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchLoactionListCreateFormOverridesProps = {
    SearchLoactionListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type SearchLoactionListCreateFormProps = React.PropsWithChildren<{
    overrides?: SearchLoactionListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SearchLoactionListCreateFormInputValues) => SearchLoactionListCreateFormInputValues;
    onSuccess?: (fields: SearchLoactionListCreateFormInputValues) => void;
    onError?: (fields: SearchLoactionListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SearchLoactionListCreateFormInputValues) => SearchLoactionListCreateFormInputValues;
    onValidate?: SearchLoactionListCreateFormValidationValues;
} & React.CSSProperties>;
export default function SearchLoactionListCreateForm(props: SearchLoactionListCreateFormProps): React.ReactElement;
