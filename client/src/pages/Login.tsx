import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);

    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } else if (mode === "signup") {
      notifications.show({
        title: "Check your email",
        message: "We sent you a confirmation link",
        color: "green",
      });
    }

    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      notifications.show({
        title: "Email required",
        message: "Enter your email first",
        color: "yellow",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Magic link sent",
        message: "Check your email for the login link",
        color: "green",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <Container size={420} w="100%">
        <Title ta="center" mb={4} c="white">
          ⬡ Cognigy Explorer
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={24}>
          {mode === "signin"
            ? "Sign in to your account"
            : "Create a new account"}
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" bg="dark.8">
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              loading={loading}
              onClick={handleSubmit}
              color="indigo"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>

            <Divider label="or" labelPosition="center" />

            <Button
              fullWidth
              variant="outline"
              loading={loading}
              onClick={handleMagicLink}
            >
              Send magic link
            </Button>

            <Text size="sm" ta="center" c="dimmed">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text
                span
                c="indigo"
                style={{ cursor: "pointer" }}
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </Text>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
