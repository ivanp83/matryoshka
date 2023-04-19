import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";

interface RequireAuthProps {
  children: ReactElement;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const { user } = useTelegram();
  const isAuth: boolean = user.id == import.meta.env.CLIENT_ADMIN_ID;

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
