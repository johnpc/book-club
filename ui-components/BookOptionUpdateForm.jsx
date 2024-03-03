/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getBookOption } from "./graphql/queries";
import { updateBookOption } from "./graphql/mutations";
const client = generateClient();
export default function BookOptionUpdateForm(props) {
  const {
    id: idProp,
    bookOption: bookOptionModelProp,
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
    publishYear: "",
    amazonId: "",
    goodReadsId: "",
    googleId: "",
    pageCount: "",
    voteCount: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [publishYear, setPublishYear] = React.useState(
    initialValues.publishYear,
  );
  const [amazonId, setAmazonId] = React.useState(initialValues.amazonId);
  const [goodReadsId, setGoodReadsId] = React.useState(
    initialValues.goodReadsId,
  );
  const [googleId, setGoogleId] = React.useState(initialValues.googleId);
  const [pageCount, setPageCount] = React.useState(initialValues.pageCount);
  const [voteCount, setVoteCount] = React.useState(initialValues.voteCount);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bookOptionRecord
      ? { ...initialValues, ...bookOptionRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setAuthor(cleanValues.author);
    setPublishYear(cleanValues.publishYear);
    setAmazonId(cleanValues.amazonId);
    setGoodReadsId(cleanValues.goodReadsId);
    setGoogleId(cleanValues.googleId);
    setPageCount(cleanValues.pageCount);
    setVoteCount(cleanValues.voteCount);
    setErrors({});
  };
  const [bookOptionRecord, setBookOptionRecord] =
    React.useState(bookOptionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBookOption.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBookOption
        : bookOptionModelProp;
      setBookOptionRecord(record);
    };
    queryData();
  }, [idProp, bookOptionModelProp]);
  React.useEffect(resetStateValues, [bookOptionRecord]);
  const validations = {
    title: [{ type: "Required" }],
    author: [{ type: "Required" }],
    publishYear: [{ type: "Required" }],
    amazonId: [],
    goodReadsId: [],
    googleId: [],
    pageCount: [{ type: "Required" }],
    voteCount: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue,
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
          publishYear,
          amazonId: amazonId ?? null,
          goodReadsId: goodReadsId ?? null,
          googleId: googleId ?? null,
          pageCount,
          voteCount,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item),
                ),
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName]),
            );
            return promises;
          }, []),
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
            query: updateBookOption.replaceAll("__typename", ""),
            variables: {
              input: {
                id: bookOptionRecord.id,
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
      {...getOverrideProps(overrides, "BookOptionUpdateForm")}
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
              publishYear,
              amazonId,
              goodReadsId,
              googleId,
              pageCount,
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
              publishYear,
              amazonId,
              goodReadsId,
              googleId,
              pageCount,
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
        label="Publish year"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={publishYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishYear: value,
              amazonId,
              goodReadsId,
              googleId,
              pageCount,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.publishYear ?? value;
          }
          if (errors.publishYear?.hasError) {
            runValidationTasks("publishYear", value);
          }
          setPublishYear(value);
        }}
        onBlur={() => runValidationTasks("publishYear", publishYear)}
        errorMessage={errors.publishYear?.errorMessage}
        hasError={errors.publishYear?.hasError}
        {...getOverrideProps(overrides, "publishYear")}
      ></TextField>
      <TextField
        label="Amazon id"
        isRequired={false}
        isReadOnly={false}
        value={amazonId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishYear,
              amazonId: value,
              goodReadsId,
              googleId,
              pageCount,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.amazonId ?? value;
          }
          if (errors.amazonId?.hasError) {
            runValidationTasks("amazonId", value);
          }
          setAmazonId(value);
        }}
        onBlur={() => runValidationTasks("amazonId", amazonId)}
        errorMessage={errors.amazonId?.errorMessage}
        hasError={errors.amazonId?.hasError}
        {...getOverrideProps(overrides, "amazonId")}
      ></TextField>
      <TextField
        label="Good reads id"
        isRequired={false}
        isReadOnly={false}
        value={goodReadsId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishYear,
              amazonId,
              goodReadsId: value,
              googleId,
              pageCount,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.goodReadsId ?? value;
          }
          if (errors.goodReadsId?.hasError) {
            runValidationTasks("goodReadsId", value);
          }
          setGoodReadsId(value);
        }}
        onBlur={() => runValidationTasks("goodReadsId", goodReadsId)}
        errorMessage={errors.goodReadsId?.errorMessage}
        hasError={errors.goodReadsId?.hasError}
        {...getOverrideProps(overrides, "goodReadsId")}
      ></TextField>
      <TextField
        label="Google id"
        isRequired={false}
        isReadOnly={false}
        value={googleId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              author,
              publishYear,
              amazonId,
              goodReadsId,
              googleId: value,
              pageCount,
              voteCount,
            };
            const result = onChange(modelFields);
            value = result?.googleId ?? value;
          }
          if (errors.googleId?.hasError) {
            runValidationTasks("googleId", value);
          }
          setGoogleId(value);
        }}
        onBlur={() => runValidationTasks("googleId", googleId)}
        errorMessage={errors.googleId?.errorMessage}
        hasError={errors.googleId?.hasError}
        {...getOverrideProps(overrides, "googleId")}
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
              publishYear,
              amazonId,
              goodReadsId,
              googleId,
              pageCount: value,
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
              publishYear,
              amazonId,
              goodReadsId,
              googleId,
              pageCount,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || bookOptionModelProp)}
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
              !(idProp || bookOptionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
