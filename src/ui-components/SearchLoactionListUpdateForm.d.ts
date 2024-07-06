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
export declare type SearchLoactionListUpdateFormInputValues = {
    addressInfo?: string;
};
export declare type SearchLoactionListUpdateFormValidationValues = {
    addressInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchLoactionListUpdateFormOverridesProps = {
    SearchLoactionListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    addressInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type SearchLoactionListUpdateFormProps = React.PropsWithChildren<{
    overrides?: SearchLoactionListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    searchLoactionList?: any;
    onSubmit?: (fields: SearchLoactionListUpdateFormInputValues) => SearchLoactionListUpdateFormInputValues;
    onSuccess?: (fields: SearchLoactionListUpdateFormInputValues) => void;
    onError?: (fields: SearchLoactionListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SearchLoactionListUpdateFormInputValues) => SearchLoactionListUpdateFormInputValues;
    onValidate?: SearchLoactionListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SearchLoactionListUpdateForm(props: SearchLoactionListUpdateFormProps): React.ReactElement;
