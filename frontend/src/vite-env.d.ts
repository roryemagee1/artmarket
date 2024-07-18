/// <reference types="vite/client" />

declare module "*.png" {
  const value: import('react').ImageSourcePropType;
  export = value;
}
