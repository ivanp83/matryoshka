/// <reference types="vite/client" />

interface ImportMetaEnv
  extends Readonly<Record<string, string | boolean | undefined>> {
  readonly CLIENT_NEXT_PUBLIC_BACKEND_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
