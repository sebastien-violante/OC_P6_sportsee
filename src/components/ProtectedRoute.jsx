export default function ProtectedRoute({ token, useMock, children }) {
  if (!token && !useMock) {
    return <Navigate to="/" replace />;
  }

  return children;
} 