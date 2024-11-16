import { clientAppwrite } from "@/config/appwrite.config";
import { errorHandler, successHandler } from "../../handler";
import { setSessionConfig } from "@/app/(cookies)/(auth)/cookies";

export const GET = async () => {
  try {
    const { account, client } = await clientAppwrite();
    await setSessionConfig(client);

    // doing logout
    await account.deleteSession("current");

    return successHandler("Session deleted","Session deleted",200);
  } catch (e) {
    return errorHandler(e);
  }
};
