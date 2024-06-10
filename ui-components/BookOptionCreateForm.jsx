/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createBookOption } from "./graphql/mutations";
const client = generateClient();
export default function BookOptionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    author: "",
    publishDate: "",
    description: "",
    pageCount: "",
    imageUrl: "",
    googleBooksUrl: "",
    price: "",
    voteCount: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [publishDate, setPublishDate] = React.useState(
    initialValues.publishDate
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [pageCount, setPageCount] = React.useState(initialValues.pageCount);
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [googleBooksUrl, setGoogleBooksUrl] = React.useState(
    initialValues.googleBooksUrl
  );
  const [price, setPrice] = React.useState(initialValues.price);
  const [voteCount, setVoteCount] = React.useState(initialValues.voteCount);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setAuthor(initialValues.author);
    setPublishDate(initialValues.publishDate);
    setDescription(initialValues.description);
    setPageCount(initialValues.pageCount);
    setImageUrl(initialValues.imageUrl);
    setGoogleBooksUrl(initialValues.googleBooksUrl);
    setPrice(initialValues.price);
    setVoteCount(initialValues.voteCount);
    setErrors({});
  };
  const validations = {
    title: [{ type: "Required" }],
    author: [{ type: "Required" }],
    publishDate: [{ type: "Required" }],
    description: [],
    pageCount: [{ type: "Required" }],
    imageUrl: [],
    googleBooksUrl: [],
    price: [],
    voteCount: [{ type: "Required" }],
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
          title,
          author,
          publishDate,
          description,
          pageCount,
          imageUrl,
          googleBooksUrl,
          price,
          voteCount,
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
            query: createBookOption.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "BookOptionCreateForm")}
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
              title: value,
              author,
              publishDate,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount,
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
        label="Author"
        isRequired={true}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author: value,
              publishDate,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Publish date"
        isRequired={true}
        isReadOnly={false}
        value={publishDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate: value,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.publishDate ?? value;
          }
          if (errors.publishDate?.hasError) {
            runValidationTasks("publishDate", value);
          }
          setPublishDate(value);
        }}
        onBlur={() => runValidationTasks("publishDate", publishDate)}
        errorMessage={errors.publishDate?.errorMessage}
        hasError={errors.publishDate?.hasError}
        {...getOverrideProps(overrides, "publishDate")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description: value,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount,
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
      ></TextField>
      <TextField
        label="Page count"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={pageCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description,
              pageCount: value,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.pageCount ?? value;
          }
          if (errors.pageCount?.hasError) {
            runValidationTasks("pageCount", value);
          }
          setPageCount(value);
        }}
        onBlur={() => runValidationTasks("pageCount", pageCount)}
        errorMessage={errors.pageCount?.errorMessage}
        hasError={errors.pageCount?.hasError}
        {...getOverrideProps(overrides, "pageCount")}
      ></TextField>
      <TextField
        label="Image url"
        isRequired={false}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description,
              pageCount,
              imageUrl: value,
              googleBooksUrl,
              price,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
      ></TextField>
      <TextField
        label="Google books url"
        isRequired={false}
        isReadOnly={false}
        value={googleBooksUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl: value,
              price,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.googleBooksUrl ?? value;
          }
          if (errors.googleBooksUrl?.hasError) {
            runValidationTasks("googleBooksUrl", value);
          }
          setGoogleBooksUrl(value);
        }}
        onBlur={() => runValidationTasks("googleBooksUrl", googleBooksUrl)}
        errorMessage={errors.googleBooksUrl?.errorMessage}
        hasError={errors.googleBooksUrl?.hasError}
        {...getOverrideProps(overrides, "googleBooksUrl")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price: value,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Vote count"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={voteCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishDate,
              description,
              pageCount,
              imageUrl,
              googleBooksUrl,
              price,
              voteCount: value,
            };
            const result = onChange(modelFields);
            value = result?.voteCount ?? value;
          }
          if (errors.voteCount?.hasError) {
            runValidationTasks("voteCount", value);
          }
          setVoteCount(value);
        }}
        onBlur={() => runValidationTasks("voteCount", voteCount)}
        errorMessage={errors.voteCount?.errorMessage}
        hasError={errors.voteCount?.hasError}
        {...getOverrideProps(overrides, "voteCount")}
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
