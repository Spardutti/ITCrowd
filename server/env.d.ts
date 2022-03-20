declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      CLOUDINARY_SECRET: string;
      CLOUDINARY_API_KEY: string;
      CLOUD_NAME: string;
    }
  }
}

export {};
