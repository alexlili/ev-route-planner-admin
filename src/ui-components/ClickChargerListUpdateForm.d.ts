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
export declare type ClickChargerListUpdateFormInputValues = {
    uuid?: string;
    addressInfo?: string;
};
export declare type ClickChargerListUpdateFormValidationValues = {
    uuid?: ValidationFunction<string>;
    addressInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClickChargerListUpdateFormOverridesProps = {
    ClickChargerListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    uuid?: PrimitiveOverrideProps<TextFieldProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ClickChargerListUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClickChargerListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    clickChargerList?: any;
    onSubmit?: (fields: ClickChargerListUpdateFormInputValues) => ClickChargerListUpdateFormInputValues;
    onSuccess?: (fields: ClickChargerListUpdateFormInputValues) => void;
    onError?: (fields: ClickChargerListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClickChargerListUpdateFormInputValues) => ClickChargerListUpdateFormInputValues;
    onValidate?: ClickChargerListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClickChargerListUpdateForm(props: ClickChargerListUpdateFormProps): React.ReactElement;
