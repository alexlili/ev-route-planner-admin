/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

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
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCarListCreateFormInputValues = {
    portType?: string;
    brand?: string;
    name?: string;
    range?: string;
};
export declare type UserCarListCreateFormValidationValues = {
    portType?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    range?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCarListCreateFormOverridesProps = {
    UserCarListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    portType?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    range?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCarListCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCarListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCarListCreateFormInputValues) => UserCarListCreateFormInputValues;
    onSuccess?: (fields: UserCarListCreateFormInputValues) => void;
    onError?: (fields: UserCarListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCarListCreateFormInputValues) => UserCarListCreateFormInputValues;
    onValidate?: UserCarListCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCarListCreateForm(props: UserCarListCreateFormProps): React.ReactElement;
