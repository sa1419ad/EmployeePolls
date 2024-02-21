import { Navigate } from "react-router-dom";

export function withCondition(
  WrappedComponent,
  condition,
  redirectTo,
  location
) {
  return function InnerComponent(props) {
    return condition ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to={redirectTo} replace state={{ from: location }} />
    );
  };
}
