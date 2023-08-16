import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../server/src/trpc/router/_app";

export const trpc = createTRPCReact<AppRouter>();
