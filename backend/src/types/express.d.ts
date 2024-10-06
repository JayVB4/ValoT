// src/types/express.d.ts

import { Request } from 'express';

// Extend the Request interface to include the `user` property
declare module 'express' {
  interface Request {
    user?: {
      id: string;      // Assuming `id` is a string, adjust if necessary
      email: string;   // Assuming you are also storing `email`

      username : string;
      // Add other fields you want to store in `user` here
    };
  }
}
