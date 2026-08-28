import { execSync } from "node:child_process";

export const APP_VERSION = "2.0.0";
export const COMMIT = execSync("git rev-parse --short HEAD").toString().trim();
