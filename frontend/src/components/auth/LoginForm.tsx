import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { emailPattern } from "../../utils/validation";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        fullWidth
        {...register("email", { required: "Email is required", pattern: emailPattern })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        {...register("password", { required: "Password is required" })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        className="!rounded-lg !py-3 !text-sm"
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
