import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Sign Up To Reactivities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="userName" placeholder="User Name" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="positive"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
