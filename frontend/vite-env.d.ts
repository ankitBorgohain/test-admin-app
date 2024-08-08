/// <reference types="vite/client" />
import 'vite/client';


interface ImportMetaEnv {
    readonly VITE_ADMIN_MAIL: string;
    readonly VITE_APP_URI_API: string;
    // Add more environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }