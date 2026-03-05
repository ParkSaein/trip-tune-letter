// src/components/ProtectedRoute.tsx
import { type ReactNode, useEffect } from "react";
import { useAuth } from "react-oidc-context";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const auth = useAuth();

  useEffect(() => {
    // 로딩 중이 아니고, 인증되지 않았다면 자동으로 로그인 리다이렉트
    if (!auth.isLoading && !auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, [auth.isLoading, auth.isAuthenticated, auth]);

  if (auth.isLoading) {
    return <div>인증 확인 중...</div>;
  }

  if (auth.isAuthenticated) {
    if (requiredRole) {
      const roles: string[] = (auth.user?.profile as { realm_access?: { roles?: string[] } })?.realm_access?.roles || [];

      const hasRole = roles.some(role => typeof role === 'string' && role.toUpperCase() === requiredRole.toUpperCase());
      if (!hasRole) {
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>접근 권한이 없습니다.</h2>
            <p>{requiredRole} 권한이 필요합니다.</p>
          </div>
        );
      }
    }
    return <>{children}</>;
  }

  return <div>로그인이 필요합니다. 리다이렉트 중...</div>;
};

export default ProtectedRoute;
