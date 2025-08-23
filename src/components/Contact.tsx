import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import styles from "../styles/Contact.module.css";
import { MessageCircle } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load key from Vite .env
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", WEB3FORMS_KEY);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Form submission failed:", data);
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundLayer}>
        <div className={styles.gridPattern} />
        <div className={styles.ambientLight1} />
        <div className={styles.ambientLight2} />
      </div>

      <div className={styles.contentWrapper}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.iconWrapper}>
            <MessageCircle className={styles.icon} />
          </div>
          <h2 className={styles.title}>Get In Touch</h2>
          <div className={styles.divider} />
          <span className={styles.subtitle}>
            Send me a message and I'll get back to you soon!
          </span>
        </div>

        {/* Contact Form */}
        <div className={styles.formContainer}>
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <CheckCircle className={styles.successIcon} />
              <h4 className={styles.successTitle}>Message Sent!</h4>
              <p className={styles.successText}>
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="New Contact Form Submission"
              />
              <input
                type="checkbox"
                name="botcheck"
                className={styles.hidden}
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                    placeholder="Your name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={styles.textarea}
                  placeholder="Tell me more..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <div className={styles.loading}>
                    <div className={styles.spinner} />
                    Sending...
                  </div>
                ) : (
                  <div className={styles.buttonContent}>
                    <Send className={styles.buttonIcon} />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Horizontal Line */}
        <hr className={styles.horizontalLine} />

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerText}>
            © 2025 Nishara Jayakody. Built with ❤️ using React, Vite, TypeScript
            & CSS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
