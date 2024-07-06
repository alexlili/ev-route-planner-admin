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
export declare type FavouriteChargerListUpdateFormInputValues = {
    addressInfo?: string;
    userId?: string;
};
export declare type FavouriteChargerListUpdateFormValidationValues = {
    addressInfo?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FavouriteChargerListUpdateFormOverridesProps = {
    FavouriteChargerListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FavouriteChargerListUpdateFormProps = React.PropsWithChildren<{
    overrides?: FavouriteChargerListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    favouriteChargerList?: any;
    onSubmit?: (fields: FavouriteChargerListUpdateFormInputValues) => FavouriteChargerListUpdateFormInputValues;
    onSuccess?: (fields: FavouriteChargerListUpdateFormInputValues) => void;
    onError?: (fields: FavouriteChargerListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FavouriteChargerListUpdateFormInputValues) => FavouriteChargerListUpdateFormInputValues;
    onValidate?: FavouriteChargerListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FavouriteChargerListUpdateForm(props: FavouriteChargerListUpdateFormProps): React.ReactElement;
