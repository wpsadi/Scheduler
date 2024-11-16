import * as sdk from "node-appwrite";

export const adminAppwriteClient = async () => {
  const client = new sdk.Client()
    .setEndpoint(String(process.env.APPWRITE_ENDPOINT)) // Your API Endpoint
    .setProject(String(process.env.APPWRITE_PROJECT_ID)) // Your project ID
    .setKey(String(process.env.APPWRITE_KEY)); // Your secret API key

  const account = new sdk.Account(client);
  const database = new sdk.Databases(client);
  const storage = new sdk.Storage(client);

  return { client, account, database, storage };
};

export const clientAppwrite = async () => {
  const client = new sdk.Client()
    .setEndpoint(String(process.env.APPWRITE_ENDPOINT)) // Your API Endpoint
    .setProject(String(process.env.APPWRITE_PROJECT_ID)) // Your project ID
    .setSession(""); // The user session to authenticate with

  const account = new sdk.Account(client);
  const database = new sdk.Databases(client);
  const storage = new sdk.Storage(client);

  return { client, account, database, storage };
};
