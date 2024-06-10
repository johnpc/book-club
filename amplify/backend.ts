import * as s3 from "aws-cdk-lib/aws-s3";
import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { Function } from "aws-cdk-lib/aws-lambda";
import dotenv from "dotenv";
dotenv.config();

const authFunction = defineFunction({
  entry: "./data/custom-authorizer.ts",
});
const backend = defineBackend({
  authFunction,
  auth,
  data: data(authFunction),
  storage,
});

const underlyingAuthLambda = backend.authFunction.resources.lambda as Function;
underlyingAuthLambda.addEnvironment(
  "ADMIN_API_KEY",
  process.env.ADMIN_API_KEY!,
);

const bucket = backend.storage.resources.bucket;
// allow any authenticated user to read and write to the bucket
const authRole = backend.auth.resources.authenticatedUserIamRole;
bucket.grantReadWrite(authRole);

// allow any guest (unauthenticated) user to read from the bucket
const unauthRole = backend.auth.resources.unauthenticatedUserIamRole;
bucket.grantRead(unauthRole);
