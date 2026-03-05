import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider, type AuthProviderProps } from 'react-oidc-context'


const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:8080/realms/realm",
  client_id: "react-client",
  redirect_uri: "http://localhost:5173",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
}

// If a post-logout path was stored before redirecting to the identity provider, navigate back to it
const postLogoutPath = localStorage.getItem('post_logout_path');
if (postLogoutPath) {
  localStorage.removeItem('post_logout_path');
  // Redirect back to the stored path if we're not already there
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (current !== postLogoutPath) {
    window.location.replace(postLogoutPath);
  }
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
