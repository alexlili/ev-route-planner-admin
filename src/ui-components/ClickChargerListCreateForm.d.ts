/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ClickChargerListCreateFormInputValues = {
    uuid?: string;
    addressInfo?: string;
};
export declare type ClickChargerListCreateFormValidationValues = {
    uuid?: ValidationFunction<string>;
    addressInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClickChargerListCreateFormOverridesProps = {
    ClickChargerListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    uuid?: PrimitiveOverrideProps<TextFieldProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ClickChargerListCreateFormProps = React.PropsWithChildren<{
    overrides?: ClickChargerListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ClickChargerListCreateFormInputValues) => ClickChargerListCreateFormInputValues;
    onSuccess?: (fields: ClickChargerListCreateFormInputValues) => void;
    onError?: (fields: ClickChargerListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClickChargerListCreateFormInputValues) => ClickChargerListCreateFormInputValues;
    onValidate?: ClickChargerListCreateFormValidationValues;
} & React.CSSProperties>;
export default function ClickChargerListCreateForm(props: ClickChargerListCreateFormProps): React.ReactElement;
