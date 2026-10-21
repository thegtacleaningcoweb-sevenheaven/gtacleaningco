/** Runtime env. Dynamic access so Vite does not inline secrets at build time. */
export function readEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function isProd() {
  return import.meta.env.PROD;
}
