import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { AppRouterClient } from "@backend/rpc/router";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
)
  .trim()
  .replace(/\/+$/, "");

const link = new RPCLink({
  origin: API_BASE,
  url: "/rpc",
});

export const orpc = createORPCClient<AppRouterClient>(link);
