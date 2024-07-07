/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUserCarList } from "../graphql/queries";
import { updateUserCarList } from "../graphql/mutations";
const client = generateClient();
export default function UserCarListUpdateForm(props) {
  const {
    id: idProp,
    userCarList: userCarListModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    portType: "",
    brand: "",
    name: "",
    range: "",
  };
  const [portType, setPortType] = React.useState(initialValues.portType);
  const [brand, setBrand] = React.useState(initialValues.brand);
  const [name, setName] = React.useState(initialValues.name);
  const [range, setRange] = React.useState(initialValues.range);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userCarListRecord
      ? { ...initialValues, ...userCarListRecord }
      : initialValues;
    setPortType(cleanValues.portType);
    setBrand(cleanValues.brand);
    setName(cleanValues.name);
    setRange(cleanValues.range);
    setErrors({});
  };
  const [userCarListRecord, setUserCarListRecord] =
    React.useState(userCarListModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserCarList.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserCarList
        : userCarListModelProp;
      setUserCarListRecord(record);
    };
    queryData();
  }, [idProp, userCarListModelProp]);
  React.useEffect(resetStateValues, [userCarListRecord]);
  const validations = {
    portType: [],
    brand: [],
    name: [],
    range: [],
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
          portType: portType ?? null,
          brand: brand ?? null,
          name: name ?? null,
          range: range ?? null,
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
            query: updateUserCarList.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userCarListRecord.id,
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
      {...getOverrideProps(overrides, "UserCarListUpdateForm")}
      {...rest}
    >
      <TextField
        label="Port type"
        isRequired={false}
        isReadOnly={false}
        value={portType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              portType: value,
              brand,
              name,
              range,
            };
            const result = onChange(modelFields);
            value = result?.portType ?? value;
          }
          if (errors.portType?.hasError) {
            runValidationTasks("portType", value);
          }
          setPortType(value);
        }}
        onBlur={() => runValidationTasks("portType", portType)}
        errorMessage={errors.portType?.errorMessage}
        hasError={errors.portType?.hasError}
        {...getOverrideProps(overrides, "portType")}
      ></TextField>
      <TextField
        label="Brand"
        isRequired={false}
        isReadOnly={false}
        value={brand}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              portType,
              brand: value,
              name,
              range,
            };
            const result = onChange(modelFields);
            value = result?.brand ?? value;
          }
          if (errors.brand?.hasError) {
            runValidationTasks("brand", value);
          }
          setBrand(value);
        }}
        onBlur={() => runValidationTasks("brand", brand)}
        errorMessage={errors.brand?.errorMessage}
        hasError={errors.brand?.hasError}
        {...getOverrideProps(overrides, "brand")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              portType,
              brand,
              name: value,
              range,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Range"
        isRequired={false}
        isReadOnly={false}
        value={range}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              portType,
              brand,
              name,
              range: value,
            };
            const result = onChange(modelFields);
            value = result?.range ?? value;
          }
          if (errors.range?.hasError) {
            runValidationTasks("range", value);
          }
          setRange(value);
        }}
        onBlur={() => runValidationTasks("range", range)}
        errorMessage={errors.range?.errorMessage}
        hasError={errors.range?.hasError}
        {...getOverrideProps(overrides, "range")}
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
          isDisabled={!(idProp || userCarListModelProp)}
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
              !(idProp || userCarListModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
