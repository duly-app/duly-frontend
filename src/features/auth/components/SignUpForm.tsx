import type { JSX } from 'react/jsx-runtime';
import type React from 'react';
import { signup } from '@/features/auth/api/auth';
import { Button } from '@/components/ui/button';
import {
  CardAction,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
  CardFooter,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type LoginHandler = (event?: React.MouseEvent<HTMLButtonElement>) => void;

function SignUpHeader({ onToggleLogin }: { onToggleLogin: LoginHandler }): JSX.Element {
  return (
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>Enter your email, password, and registration code below</CardDescription>
      <CardAction>
        <Button type="button" variant="link" onClick={onToggleLogin}>
          Login
        </Button>
      </CardAction>
    </CardHeader>
  );
}

function SignUpContent({ onToggleLogin }: { onToggleLogin: LoginHandler }): JSX.Element {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registration_code, setRegistrationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    try {
      // @ts-ignore
      await signup({ username, email, password, registration_code });
      onToggleLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  }

  return (
    <CardContent>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="registration-code">Registration Code</Label>
            <Input
              type="text"
              id="registration-code"
              name="registration-code"
              placeholder="Enter your registration code"
              value={registration_code}
              onChange={(e) => setRegistrationCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </form>
    </CardContent>
  );
}

function SignUpFooter(): JSX.Element {
  return (
    <CardFooter>
      <Button type="submit" form="signup-form">
        Sign Up
      </Button>
    </CardFooter>
  );
}

export default function SignUpForm({
  onToggleLogin,
}: {
  onToggleLogin: LoginHandler;
}): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-lg">
        <SignUpHeader onToggleLogin={onToggleLogin} />
        <SignUpContent onToggleLogin={onToggleLogin} />
        <SignUpFooter />
      </Card>
    </div>
  );
}
