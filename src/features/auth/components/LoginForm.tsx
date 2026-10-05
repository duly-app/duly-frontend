import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login as loginApi } from '@/features/auth/api/auth';
import useAuth from '@/features/auth/context/UseAuth';

type SignUpHandler = (event?: React.MouseEvent<HTMLButtonElement>) => void;

function LoginHeader({ onToggleSignUp }: { onToggleSignUp: SignUpHandler }): JSX.Element {
  return (
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>Enter your email and password below</CardDescription>
      <CardAction>
        <Button type="button" variant="link" onClick={onToggleSignUp}>
          Sign Up
        </Button>
      </CardAction>
    </CardHeader>
  );
}

function LoginContent(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    try {
      // @ts-ignore
      const data = await loginApi({ email, password });

      await login(data.token);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <CardContent>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2"></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </form>
    </CardContent>
  );
}

function LoginFooter(): JSX.Element {
  return (
    <CardFooter>
      <Button type="submit" form="login-form">
        Login
      </Button>
    </CardFooter>
  );
}

export default function LoginForm({
  onToggleSignUp,
}: {
  onToggleSignUp: SignUpHandler;
}): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-lg">
        <LoginHeader onToggleSignUp={onToggleSignUp} />
        <LoginContent />
        <LoginFooter />
      </Card>
    </div>
  );
}
