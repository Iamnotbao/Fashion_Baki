
import { useState } from "react"
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
    InputAdornment,
    Link,
    Stack,
    Divider,
} from "@mui/material"
import PasswordIcon from '@mui/icons-material/Password';
import Background from "../../assets/images/logo/login.png"
import Logo from "../../assets/images/logo/logo.png"
import './SignIn.css';
import { resetPassword } from "../../services/authenticationServices"
import { useNavigate } from "react-router-dom"


function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const navigation = useNavigate();
    const email = localStorage.getItem("email");
    console.log(email);
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Password is not the same!")
            return
        }
        try {
            const response = await resetPassword(email,password);
            if (response) {
                console.log(response);
                setIsSubmitting(true)
                setError("")
                navigation("/Fashion_Baki/authentication/signIn");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="login" style={{ backgroundImage: `url(${Background})`, display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Container maxWidth="sm" sx={{ opacity: "0.85" }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #eaeaea",
                        borderRadius: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={Logo}
                        alt="Bootstrap Brain"
                        sx={{ mb: 3, height: 200, width: 200 }}
                    />

                    <Typography variant="body1" align="center" sx={{ mb: 4, color: "text.secondary" }}>
                        Provide the email address associated with your account to recover your password.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                           New Password{" "}
                            <Box component="span" sx={{ color: "error.main" }}>
                                *
                            </Box>
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                            helperText={error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            Confirm Password{" "}
                            <Box component="span" sx={{ color: "error.main" }}>
                                *
                            </Box>
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!error}
                            helperText={error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isSubmitting}
                            sx={{
                                mb: 3,
                                py: 1.5,
                                backgroundColor: "#1976d2",
                                "&:hover": {
                                    backgroundColor: "#1565c0",
                                },
                            }}
                        >
                            {isSubmitting ? "Sending..." : "Reset Password"}
                        </Button>
                    </Box>

                    <Divider sx={{ width: "100%", my: 2 }} />

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Link href="/Fashion_Baki/authentication/signIn" underline="hover" sx={{ color: "text.secondary" }}>
                            Log In
                        </Link>
                        <Link href="/Fashion_Baki/authentication/signUp" underline="hover" sx={{ color: "text.secondary" }}>
                            Register
                        </Link>
                    </Stack>
                </Paper>
            </Container>
        </div>

    )
}

export default ResetPassword

