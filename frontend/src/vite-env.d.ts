/// <reference types="vite/client" />

declare module "*.png" {
  const value: import('react').ImageSourcePropType;
  export = value;
}

declare module "*.jpeg" {
  const value: import('react').ImageSourcePropType;
  export = value;
}

declare module "*.jpg" {
  const value: import('react').ImageSourcePropType;
  export = value;
}

declare module "*.webp" {
  const value: import('react').ImageSourcePropType;
  export = value;
}

declare module "react-dom/client";
