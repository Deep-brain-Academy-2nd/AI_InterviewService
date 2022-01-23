import { TextField, Button, Grid } from "@mui/material";
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Router from "next/router"
import { User } from "../types/user";
import { register } from '../services/user-service';

// Setup Validation Info
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your confirm password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Confirm Password is required'),
});

const RegisterForm = () => {

    // Form, Validation library - formik, yup
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: User, { setSubmitting }: FormikHelpers<User>) => {

            setTimeout(async () => {
              
                // Register
                if (values.password !== values.confirmPassword) {
                    alert("Please check your confirm password")
                } else {
                    const result = await register(values);
                    if (result === 'success') {
                        alert("Sign up was successful")
                        Router.push("/")
                    } else {
                        alert("Failed to sign up")
                    }

                }

                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" justifyContent='space-between' alignItems='center'>
                {/* ID */}
                <Grid item md={12} style={{marginBottom: 15, minWidth: 320, display: "flex", justifyContent: "center"}}>
                    <TextField
                        fullWidth
                        label="ID"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                {/* ID */}
                <Grid item md={12} style={{marginBottom: 15, minWidth: 320, display: "flex", justifyContent: "center"}}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={formik.values.name}
                        name="name"
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                {/* Password */}
                <Grid item md={12} style={{marginBottom: 15, minWidth: 320, display: "flex", justifyContent: "center"}}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                {/* Password */}
                <Grid item md={12} style={{marginBottom: 15, minWidth: 320, display: "flex", justifyContent: "center"}}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        value={formik.values.confirmPassword}
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                </Grid>
                {/* Login Button */}
                <Grid item md={12} style={{marginBottom: 15, minWidth: 320, display: "flex", justifyContent: "center"}}>
                    <Button type="submit" variant="outlined" style={{ color: "#20c997", border: "1px solid #20c997"}}>Sign Up</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default RegisterForm;