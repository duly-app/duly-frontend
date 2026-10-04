import type { JSX } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import LoginForm from "../../features/auth/components/LoginForm";
import { useState } from "react";
import SignUpForm from "../../features/auth/components/SignUpForm";
import useAuth from "../../features/auth/context/UseAuth";
import { Spinner } from "@/components/ui/spinner";

type FormType = "login" | "signup";

export default function LoginPage(): JSX.Element {
  const [currentForm, setCurrentForm] = useState<FormType>("login");
  const { loggedIn, isLoading } = useAuth();

  const toggleForm = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();

    setCurrentForm((prev) => (prev === "login" ? "signup" : "login"));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      {currentForm === "login" ? (
        <LoginForm onToggleSignUp={toggleForm} />
      ) : (
        <SignUpForm onToggleLogin={toggleForm} />
      )}
    </div>
  );
}
