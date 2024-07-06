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
export declare type CarListCreateFormInputValues = {
    name?: string;
    portType?: string;
    brand?: string;
    range?: string;
    userId?: string;
};
export declare type CarListCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    portType?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    range?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CarListCreateFormOverridesProps = {
    CarListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    portType?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    range?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CarListCreateFormProps = React.PropsWithChildren<{
    overrides?: CarListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CarListCreateFormInputValues) => CarListCreateFormInputValues;
    onSuccess?: (fields: CarListCreateFormInputValues) => void;
    onError?: (fields: CarListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CarListCreateFormInputValues) => CarListCreateFormInputValues;
    onValidate?: CarListCreateFormValidationValues;
} & React.CSSProperties>;
export default function CarListCreateForm(props: CarListCreateFormProps): React.ReactElement;
