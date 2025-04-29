/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextAreaField, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createPost } from "./graphql/mutations";
const client = generateClient();
export default function PostCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onChange,
    onValidate,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    description: "Join us for our next book club meeting!",
    title: "",
    eventUrl: "",
    epubUrl: "https://ebooks.jpc.io",
    audiobookUrl: "https://audiobooks.jpc.io",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [description, setDescription] = React.useState(initialValues.description);
  const [title, setTitle] = React.useState(initialValues.title);
  const [eventUrl, setEventUrl] = React.useState(initialValues.eventUrl);
  const [epubUrl, setEpubUrl] = React.useState(initialValues.epubUrl);
  const [audiobookUrl, setAudiobookUrl] = React.useState(initialValues.audiobookUrl);
  const [errors, setErrors] = React.useState({});
  
  const resetStateValues = () => {
    setDate(initialValues.date);
    setDescription(initialValues.description);
    setTitle(initialValues.title);
    setEventUrl(initialValues.eventUrl);
    setEpubUrl(initialValues.epubUrl);
    setAudiobookUrl(initialValues.audiobookUrl);
    setErrors({});
  };
  
  const validations = {
    date: [{ type: "Required" }],
    description: [{ type: "Required" }],
    title: [{ type: "Required" }],
    eventUrl: [],
    epubUrl: [],
    audiobookUrl: [],
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
          date,
          description,
          title,
          eventUrl,
          epubUrl,
          audiobookUrl,
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
            query: createPost.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description,
              title: value,
              eventUrl,
              epubUrl,
              audiobookUrl,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              description,
              title,
              eventUrl,
              epubUrl,
              audiobookUrl,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      
      <TextAreaField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description: value,
              title,
              eventUrl,
              epubUrl,
              audiobookUrl,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextAreaField>
      
      <TextField
        label="Event URL (optional)"
        isRequired={false}
        isReadOnly={false}
        value={eventUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description,
              title,
              eventUrl: value,
              epubUrl,
              audiobookUrl,
            };
            const result = onChange(modelFields);
            value = result?.eventUrl ?? value;
          }
          if (errors.eventUrl?.hasError) {
            runValidationTasks("eventUrl", value);
          }
          setEventUrl(value);
        }}
        onBlur={() => runValidationTasks("eventUrl", eventUrl)}
        errorMessage={errors.eventUrl?.errorMessage}
        hasError={errors.eventUrl?.hasError}
        {...getOverrideProps(overrides, "eventUrl")}
      ></TextField>
      
      <TextField
        label="eBook URL"
        isRequired={false}
        isReadOnly={false}
        value={epubUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description,
              title,
              eventUrl,
              epubUrl: value,
              audiobookUrl,
            };
            const result = onChange(modelFields);
            value = result?.epubUrl ?? value;
          }
          if (errors.epubUrl?.hasError) {
            runValidationTasks("epubUrl", value);
          }
          setEpubUrl(value);
        }}
        onBlur={() => runValidationTasks("epubUrl", epubUrl)}
        errorMessage={errors.epubUrl?.errorMessage}
        hasError={errors.epubUrl?.hasError}
        {...getOverrideProps(overrides, "epubUrl")}
      ></TextField>
      
      <TextField
        label="Audiobook URL"
        isRequired={false}
        isReadOnly={false}
        value={audiobookUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description,
              title,
              eventUrl,
              epubUrl,
              audiobookUrl: value,
            };
            const result = onChange(modelFields);
            value = result?.audiobookUrl ?? value;
          }
          if (errors.audiobookUrl?.hasError) {
            runValidationTasks("audiobookUrl", value);
          }
          setAudiobookUrl(value);
        }}
        onBlur={() => runValidationTasks("audiobookUrl", audiobookUrl)}
        errorMessage={errors.audiobookUrl?.errorMessage}
        hasError={errors.audiobookUrl?.hasError}
        {...getOverrideProps(overrides, "audiobookUrl")}
      ></TextField>
      
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
