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
export declare type UserCarListUpdateFormInputValues = {
    portType?: string;
    brand?: string;
    name?: string;
    range?: string;
};
export declare type UserCarListUpdateFormValidationValues = {
    portType?: ValidationFunction<string>;
    brand?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    range?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCarListUpdateFormOverridesProps = {
    UserCarListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    portType?: PrimitiveOverrideProps<TextFieldProps>;
    brand?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    range?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCarListUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserCarListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userCarList?: any;
    onSubmit?: (fields: UserCarListUpdateFormInputValues) => UserCarListUpdateFormInputValues;
    onSuccess?: (fields: UserCarListUpdateFormInputValues) => void;
    onError?: (fields: UserCarListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCarListUpdateFormInputValues) => UserCarListUpdateFormInputValues;
    onValidate?: UserCarListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserCarListUpdateForm(props: UserCarListUpdateFormProps): React.ReactElement;
