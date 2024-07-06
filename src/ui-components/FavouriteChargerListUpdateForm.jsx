/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getFavouriteChargerList } from "../graphql/queries";
import { updateFavouriteChargerList } from "../graphql/mutations";
const client = generateClient();
export default function FavouriteChargerListUpdateForm(props) {
  const {
    id: idProp,
    favouriteChargerList: favouriteChargerListModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    addressInfo: "",
    userId: "",
  };
  const [addressInfo, setAddressInfo] = React.useState(
    initialValues.addressInfo
  );
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = favouriteChargerListRecord
      ? { ...initialValues, ...favouriteChargerListRecord }
      : initialValues;
    setAddressInfo(
      typeof cleanValues.addressInfo === "string" ||
        cleanValues.addressInfo === null
        ? cleanValues.addressInfo
        : JSON.stringify(cleanValues.addressInfo)
    );
    setUserId(cleanValues.userId);
    setErrors({});
  };
  const [favouriteChargerListRecord, setFavouriteChargerListRecord] =
    React.useState(favouriteChargerListModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFavouriteChargerList.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFavouriteChargerList
        : favouriteChargerListModelProp;
      setFavouriteChargerListRecord(record);
    };
    queryData();
  }, [idProp, favouriteChargerListModelProp]);
  React.useEffect(resetStateValues, [favouriteChargerListRecord]);
  const validations = {
    addressInfo: [{ type: "JSON" }],
    userId: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          addressInfo: addressInfo ?? null,
          userId: userId ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateFavouriteChargerList.replaceAll("__typename", ""),
            variables: {
              input: {
                id: favouriteChargerListRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "FavouriteChargerListUpdateForm")}
      {...rest}
    >
      <TextAreaField
        label="Address info"
        isRequired={false}
        isReadOnly={false}
        value={addressInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addressInfo: value,
              userId,
            };
            const result = onChange(modelFields);
            value = result?.addressInfo ?? value;
          }
          if (errors.addressInfo?.hasError) {
            runValidationTasks("addressInfo", value);
          }
          setAddressInfo(value);
        }}
        onBlur={() => runValidationTasks("addressInfo", addressInfo)}
        errorMessage={errors.addressInfo?.errorMessage}
        hasError={errors.addressInfo?.hasError}
        {...getOverrideProps(overrides, "addressInfo")}
      ></TextAreaField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              addressInfo,
              userId: value,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || favouriteChargerListModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || favouriteChargerListModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
