import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contacts";
import css from "../css/ContactForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const notify = (contactName) =>
  toast(`Contact ${contactName} succesfully added!`);
const notifyError = () => toast("There is a problem with adding this contact");

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Field is required")
    .min(3, "Minimum length is 3 characters")
    .max(50, "Maximum length is 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  number: Yup.string()
    .required("Field is required")
    .min(3, "Minimum length is 3 characters")
    .max(50, "Maximum length is 50 characters")
    .matches(/^\d+(-\d+){0,2}$/, "Number can only contain digits and hyphens"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.contacts.error);

  const handleAdd = async (values, { resetForm }) => {
    try {
      const resultAction = await dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      );

      if (addContact.fulfilled.match(resultAction)) {
        console.log("Contact added successfully:", resultAction.payload);
        notify(values.name);
        resetForm();
      } else {
        const errorMessage = resultAction.payload || resultAction.error.message;
        console.error("Error adding contact:", errorMessage);
        notifyError();
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactFormSchema}
      onSubmit={handleAdd}>
      {() => (
        <Form className={css.formContainer}>
          <div className={css.formGroup}>
            <label>
              Name
              <Field type="text" name="name" className={css.input} />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>
          </div>
          <div className={css.formGroup}>
            <label>
              Number
              <Field type="tel" name="number" className={css.input} />
              <ErrorMessage
                name="number"
                component="div"
                className={css.error}
              />
            </label>
          </div>
          <button type="submit" className={css.button}>
            Add Contact
          </button>
          {error && <div className={css.error}>{error}</div>}{" "}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
