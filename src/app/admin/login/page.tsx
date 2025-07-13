"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from "@heroui/react";
import { FormInput } from "@/components/ui/FormInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log("Login Response: ", response);
      if (response?.error) {
        console.log("Setting error: Invalid email or password");
        setError("Invalid email or password");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">WhiteLie Admin Login</h1>
          <p className="text-neutral-500 text-sm">
            Please sign in to access the admin area
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormInput
                label="Email"
                placeholder="admin@example.com"
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
                error={errors.email?.message}
                fullWidth
                autoFocus
              />
            </div>
            <div>
              <FormInput
                label="Password"
                placeholder="••••••••"
                type="password"
                {...register("password")}
                isInvalid={!!errors.password}
                error={errors.password?.message}
                fullWidth
              />
            </div>
            <Spacer y={2} />
            <Button
              type="submit"
              fullWidth
              color="default"
              className="bg-black text-white hover:bg-neutral-800"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-neutral-600">
            Forgot your password? Contact your administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
