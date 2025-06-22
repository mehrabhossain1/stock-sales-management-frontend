import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/axios";
import { useAuth } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await api.post("/auth/login", data);

            const { user, token } = res.data;

            login({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
            });

            navigate("/dashboard");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <p className="text-sm text-muted-foreground text-center">
                        Use demo credentials below to test the app
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Demo Credentials */}
                    <div className="bg-muted/50 p-4 rounded-md text-sm space-y-2">
                        <div>
                            <span className="font-semibold">Admin:</span>
                            <div className="text-muted-foreground">
                                Email:{" "}
                                <code className="underline">
                                    mehrab@gmail.com
                                </code>
                                <br />
                                Password: <code>123456</code>
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">Manager:</span>
                            <div className="text-muted-foreground">
                                Email:{" "}
                                <code className="underline">
                                    munna@gmail.com
                                </code>
                                <br />
                                Password: <code>123456</code>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    {/* Role Info */}
                    <div className="text-xs text-muted-foreground text-center pt-2">
                        <strong>Note:</strong> Managers can only view{" "}
                        <em>their own sales</em> and cannot add or modify
                        products.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
