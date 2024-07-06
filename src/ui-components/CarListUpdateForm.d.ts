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
export declare type CarListUpdateFormInputValues = {
    name?: string;
    portType?: string;
    brand?: string;
    range?: string;
    userId?: string;
};
export declare type CarListUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    portType?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    range?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CarListUpdateFormOverridesProps = {
    CarListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    portType?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    range?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CarListUpdateFormProps = React.PropsWithChildren<{
    overrides?: CarListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    carList?: any;
    onSubmit?: (fields: CarListUpdateFormInputValues) => CarListUpdateFormInputValues;
    onSuccess?: (fields: CarListUpdateFormInputValues) => void;
    onError?: (fields: CarListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CarListUpdateFormInputValues) => CarListUpdateFormInputValues;
    onValidate?: CarListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CarListUpdateForm(props: CarListUpdateFormProps): React.ReactElement;
