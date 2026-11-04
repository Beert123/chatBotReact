import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { supabase } from "../lib/supabase";

export async function clientAction({ request }) {

    const formData = await request.formData();
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");
    const confirmPwd = formData.get("confirmPassword")


    console.log(formData,emailValue,passwordValue,confirmPwd)

    if (!emailValue || !passwordValue || !confirmPwd) {
        return { error: "udfyld alle felterne" }
    }
    if (passwordValue.length < 6 || confirmPwd.length < 6) {
        return { error: "password skal være over 6 tegn" }
    }
    if (passwordValue !== confirmPwd) {
        return { error: "passwords matcher ikke hinanden" }
    }

    const { data, error } = await supabase.auth.signUp({ email: emailValue, password: passwordValue });

    console.log(error)
    console.log(data)

    if (error) {
        return { error: error.message }
    }

    return redirect("/login?registered=true")
}
export default function Register() {
    const actionData = useActionData();
    const nav = useNavigation();
    const isSubmitting = nav.state === "submitting"

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="auth-subtitle">Sign up with email and password</p>

                <Form method="post" className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                        />
                    </div>
                    {actionData?.error &&
                        <div className="error-message">{actionData.error}</div>}
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                        {isSubmitting ? "createing account..." : "createaccount"}
                    </button>
                </Form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}