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
import { getClickChargerList } from "../graphql/queries";
import { updateClickChargerList } from "../graphql/mutations";
const client = generateClient();
export default function ClickChargerListUpdateForm(props) {
  const {
    id: idProp,
    clickChargerList: clickChargerListModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    uuid: "",
    addressInfo: "",
  };
  const [uuid, setUuid] = React.useState(initialValues.uuid);
  const [addressInfo, setAddressInfo] = React.useState(
    initialValues.addressInfo
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = clickChargerListRecord
      ? { ...initialValues, ...clickChargerListRecord }
      : initialValues;
    setUuid(cleanValues.uuid);
    setAddressInfo(
      typeof cleanValues.addressInfo === "string" ||
        cleanValues.addressInfo === null
        ? cleanValues.addressInfo
        : JSON.stringify(cleanValues.addressInfo)
    );
    setErrors({});
  };
  const [clickChargerListRecord, setClickChargerListRecord] = React.useState(
    clickChargerListModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getClickChargerList.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getClickChargerList
        : clickChargerListModelProp;
      setClickChargerListRecord(record);
    };
    queryData();
  }, [idProp, clickChargerListModelProp]);
  React.useEffect(resetStateValues, [clickChargerListRecord]);
  const validations = {
    uuid: [],
    addressInfo: [{ type: "JSON" }],
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
          uuid: uuid ?? null,
          addressInfo: addressInfo ?? null,
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
            query: updateClickChargerList.replaceAll("__typename", ""),
            variables: {
              input: {
                id: clickChargerListRecord.id,
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
      {...getOverrideProps(overrides, "ClickChargerListUpdateForm")}
      {...rest}
    >
      <TextField
        label="Uuid"
        isRequired={false}
        isReadOnly={false}
        value={uuid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              uuid: value,
              addressInfo,
            };
            const result = onChange(modelFields);
            value = result?.uuid ?? value;
          }
          if (errors.uuid?.hasError) {
            runValidationTasks("uuid", value);
          }
          setUuid(value);
        }}
        onBlur={() => runValidationTasks("uuid", uuid)}
        errorMessage={errors.uuid?.errorMessage}
        hasError={errors.uuid?.hasError}
        {...getOverrideProps(overrides, "uuid")}
      ></TextField>
      <TextAreaField
        label="Address info"
        isRequired={false}
        isReadOnly={false}
        value={addressInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              uuid,
              addressInfo: value,
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
          isDisabled={!(idProp || clickChargerListModelProp)}
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
              !(idProp || clickChargerListModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
