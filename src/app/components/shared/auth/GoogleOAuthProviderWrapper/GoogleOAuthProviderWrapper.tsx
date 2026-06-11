'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PropsWithChildren } from 'react';

const GOOGLE_CLIENT_ID =
  '435189959290-jji28hv7ubter1n0l56rnoggmphpekuj.apps.googleusercontent.com';

export const GoogleOAuthProviderWrapper = ({ children }: PropsWithChildren) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>
);
