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
export declare type FavouriteChargerListCreateFormInputValues = {
    addressInfo?: string;
    userId?: string;
};
export declare type FavouriteChargerListCreateFormValidationValues = {
    addressInfo?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FavouriteChargerListCreateFormOverridesProps = {
    FavouriteChargerListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FavouriteChargerListCreateFormProps = React.PropsWithChildren<{
    overrides?: FavouriteChargerListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FavouriteChargerListCreateFormInputValues) => FavouriteChargerListCreateFormInputValues;
    onSuccess?: (fields: FavouriteChargerListCreateFormInputValues) => void;
    onError?: (fields: FavouriteChargerListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FavouriteChargerListCreateFormInputValues) => FavouriteChargerListCreateFormInputValues;
    onValidate?: FavouriteChargerListCreateFormValidationValues;
} & React.CSSProperties>;
export default function FavouriteChargerListCreateForm(props: FavouriteChargerListCreateFormProps): React.ReactElement;
