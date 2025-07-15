import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/sql_tower" : "",
  assetPrefix: isProd ? "/sql_tower/" : "",
};

export default nextConfig;
