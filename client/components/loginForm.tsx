import { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Router from "next/router"
import { User } from "../types/user";
import UserService from '../services/user-service';

const useStyles = makeStyles(theme => ({
    gridItem: {
        marginBottom: 15,
        minWidth: 320,
        display: "flex",
        justifyContent: "center"
    }
}))

// Setup Validation Info
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginForm = () => {

    const classes = useStyles();

    // Form, Validation library - formik, yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: User, { setSubmitting }: FormikHelpers<User>) => {

            setTimeout(async () => {

                // Login
                const userService = new UserService();
                const result = await userService.login(values.email, values.password);
                if (result.type === 'success') {
                    Router.push("/")
                } else {
                    alert(result.message);
			        values.email = "";
                    values.password = "";
                }

                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" justify='space-between' alignItems='center'>
                {/* ID */}
                <Grid item md={12} className={classes.gridItem}>
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
                {/* Password */}
                <Grid item md={12} className={classes.gridItem}>
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
                {/* Login Button */}
                <Grid item md={12} className={classes.gridItem}>
                    <Button color="primary" type="submit" variant="outlined">Login</Button>
                </Grid>
            </Grid>


        </form>
    )
}
export default LoginForm;