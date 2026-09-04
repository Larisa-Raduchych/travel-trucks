"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/api";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

// валідація
const validationSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function BookingForm({ camperId }: BookingFormProps) {
  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createBooking(camperId, values);
            toast.success("Booking successful!");
            resetForm();
          } catch {
            toast.error("Something went wrong. Try again.");
          }
        }}
      >
        <Form className={css.form}>
          <div className={css.field}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={css.input}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <button type="submit" className={css.submitBtn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}