import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../FormContainer";
import { signupSchema } from "../../utils/schema";
import { setCredentials } from "../../slices/authSlice";
import { ApiError, SignupFormFields } from "../../utils/types";
import { useRegisterMutation } from "../../slices/usersApiSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: object | null } }) => state.auth
  );
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const onSubmit = async (data: SignupFormFields) => {
    try {
      const { name, email, password } = data;
      const response = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer<SignupFormFields>
      schema={signupSchema}
      onSubmit={onSubmit}
      fields={[
        { id: "name", label: "Your name", type: "text" },
        { id: "email", label: "Your e-mail", type: "text" },
        { id: "password", label: "Password", type: "password" },
        { id: "confirmPassword", label: "Confirm password", type: "password" },
      ]}
      submitButtonText="Sign Up"
      errorMessage="E-mail has already been taken"
      welcomeText="Welcome!"
      additionalText="Welcome to the place made specifically for aspiring developers, like you, looking to take their skills to the next level."
      sideImage="/card.jpg"
      bottomText="Already have an account? Login"
      redirectTo="/login"
      isLoading={isLoading}
    />
  );
};

export default SignupForm;
