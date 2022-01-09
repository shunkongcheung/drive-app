import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

import { AUTH_STORAGE_KEY } from "../../constants";

interface Result {
  isAuth: boolean;
}

const useAuth = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: yup.object({
      password: yup.string().required(),
    }),
    onSubmit: async ({ password }, formik) => {
      // check if password is valid
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await res.json()) as Result;

      if (!result.isAuth) {
        // if invalid set error
        formik.setErrors({ password: "Invalid password." });
        return;
      } else {
        // if valid, store it to local storage
        document.cookie = `${AUTH_STORAGE_KEY}=${password};`;
        // go to home page after login
        router.push("/");
      }
    },
  });

  return {
    errors: formik.errors,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    values: formik.values,
  };
};

export default useAuth;
