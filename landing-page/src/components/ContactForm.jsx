import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { BASE_URL } from "../data/baseUrl";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitError("");
        // Mock API call using JSONPlaceholder
        await axios.post(`${BASE_URL}/customer-support`, values);
        setIsSubmitted(true);
        resetForm();
        setTimeout(() => setIsSubmitted(false), 10000);
      } catch (error) {
        setSubmitError("Something went wrong. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto padding-x min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-sm font-bold tracking-wide uppercase gradient-text mb-2">
          Contact Us
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          We'd love to hear from you
        </h1>
        <p className="text-lg text-gray-500 max-w-[500px] mx-auto text-center leading-[1.3] font-normal">
          Have a question about quikoro? Want to report a bug or suggest a
          feature? Drop us a message below.
        </p>
      </motion.div>

      <div className="w-full">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-[#5E51C9] font-medium hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <p>{submitError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`w-full px-4 py-3 rounded-xl border ${formik.touched.name && formik.errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[#5E51C9]"} focus:outline-none focus:ring-2 transition-shadow`}
                    placeholder="John Doe"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full px-4 py-3 rounded-xl border ${formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[#5E51C9]"} focus:outline-none focus:ring-2 transition-shadow`}
                    placeholder="john@example.com"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                  className={`w-full px-4 py-3 rounded-xl border ${formik.touched.subject && formik.errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[#5E51C9]"} focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="How can we help you?"
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.subject}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  className={`w-full px-4 py-3 rounded-xl border ${formik.touched.message && formik.errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-[#5E51C9]"} focus:outline-none focus:ring-2 transition-shadow resize-none`}
                  placeholder="Write your message here..."
                />
                {formik.touched.message && formik.errors.message ? (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full gradient-bg text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {formik.isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
