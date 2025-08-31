import { useState } from "react";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Styled components
const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4, 2), // Increased from (3, 2)
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 2), // Increased from (2, 1)
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 1.5), // Added specific padding for small screens
  },
}));

const BackgroundLayer = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  pointerEvents: "none",
});

const GridPattern = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.03,
  backgroundImage: "radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)",
  backgroundSize: "50px 50px",
});

const AmbientLight = styled(Box)({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(40px)",
});

const AmbientLight1 = styled(AmbientLight)({
  top: "20%",
  right: "20%",
  width: "300px",
  height: "300px",
  background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
});

const AmbientLight2 = styled(AmbientLight)({
  bottom: "20%",
  left: "20%",
  width: "250px",
  height: "250px",
  background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(0, 1), // Added horizontal padding
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 0.5), // Reduced padding for very small screens
  },
}));

const IconWrapper = styled(Box)({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "2rem",
  width: "100%",
  padding: "0 0.5rem", // Added padding to prevent text from touching edges
});

const Title = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  marginBottom: "1.5rem",
  "@media (max-width: 768px)": {
    fontSize: "2rem",
  },
  "@media (max-width: 480px)": {
    fontSize: "1.8rem",
    padding: "0 0.5rem", // Added padding for small screens
  },
});

const Divider = styled(Box)({
  width: "6rem",
  height: "0.25rem",
  margin: "0 auto 1rem",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #818cf8, #a78bfa)",
});

const Subtitle = styled(Typography)({
  color: "#9ca3af",
  fontSize: "1.125rem",
  padding: "0 0.5rem", // Added padding to prevent text from touching edges
  "@media (max-width: 480px)": {
    padding: "0 0.25rem",
  },
});

const FormContainer = styled(Box)(({ theme }) => ({
  background: "rgba(31, 41, 55, 0.6)",
  backdropFilter: "blur(10px)",
  borderRadius: "1.5rem",
  padding: "2.5rem",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
  width: "100%",
  maxWidth: "900px",
  boxSizing: "border-box",
  overflow: "hidden",
  margin: "0 0.5rem", // Added margin for better spacing
  [theme.breakpoints.down("md")]: {
    padding: "2rem 1.5rem", // Increased from (2, 1.5)
    margin: "0 0.75rem", // Added margin for medium screens
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem 1.25rem", // Increased from (1.5, 1.25)
    margin: "0 0.5rem", // Added margin for small screens
    borderRadius: "1rem", // Slightly reduce border radius for small screens
  },
  "@media (max-width: 360px)": {
    padding: "1.25rem 1rem", // Even more padding for very small screens
    margin: "0 0.25rem",
  },
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  width: "100%",
});

const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr",
  },
}));

const FormGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    background: "rgba(55, 65, 81, 0.6)",
    border: "1px solid rgba(148, 163, 184, 0.3)",
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    "&:hover": {
      borderColor: "rgba(99, 102, 241, 0.6)",
    },
    "&.Mui-focused": {
      borderColor: "rgba(99, 102, 241, 0.6)",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
    backgroundColor: "transparent",
  },
  "& .MuiInputLabel-root": {
    color: "#d1d5db",
    fontWeight: 500,
    fontSize: "0.875rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#d1d5db",
  },
});

const StyledTextArea = styled(StyledTextField)({
  "& .MuiOutlinedInput-root": {
    minHeight: "100px",
    alignItems: "flex-start",
  },
});

const SubmitButton = styled(Button)({
  padding: "1rem 2rem",
  background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
  color: "white",
  fontWeight: 600,
  border: "none",
  borderRadius: "1rem",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: "1rem",
  width: "100%",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)",
    background: "linear-gradient(45deg, #8b5cf6, #06b6d4)",
  },
  "&:disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
});

const LoadingSpinner = styled(Box)({
  width: "1.25rem",
  height: "1.25rem",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

const SuccessMessage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "3rem 2rem",
  "@media (max-width: 480px)": {
    padding: "2rem 1.5rem", // Adjusted padding for small screens
  },
});

const SuccessIcon = styled(CheckCircle)({
  width: "4rem",
  height: "4rem",
  color: "#34d399",
  marginBottom: "1.5rem",
  "@media (max-width: 480px)": {
    width: "3rem",
    height: "3rem",
    marginBottom: "1rem",
  },
});

const SuccessTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "0.5rem",
  "@media (max-width: 480px)": {
    fontSize: "1.25rem",
  },
});

const SuccessText = styled(Typography)({
  color: "#d1d5db",
  fontSize: "1.05rem",
  "@media (max-width: 480px)": {
    fontSize: "0.95rem",
  },
});

const HorizontalLine = styled("hr")({
  width: "90%",
  margin: "3rem auto 1.5rem auto",
  border: 0,
  height: "2px",
  background: "linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), transparent)",
  "@media (max-width: 480px)": {
    margin: "2.5rem auto 1.25rem auto", // Adjusted margin for small screens
  },
});

const Footer = styled(Box)({
  textAlign: "center",
  width: "100%",
  padding: "0 0.5rem", // Added padding to prevent text from touching edges
});

const FooterText = styled(Typography)({
  color: "#9ca3af",
  fontSize: "0.875rem",
  "@media (max-width: 480px)": {
    fontSize: "0.8rem", // Slightly smaller font for very small screens
  },
});

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
    <Container>
      {/* Background Elements */}
      <BackgroundLayer>
        <GridPattern />
        <AmbientLight1 />
        <AmbientLight2 />
      </BackgroundLayer>

      <ContentWrapper>
        {/* Section Header */}
        <SectionHeader>
          <IconWrapper>
            <MessageCircle style={{ width: "2rem", height: "2rem", color: "white" }} />
          </IconWrapper>
          <Title variant="h2">Get In Touch</Title>
          <Divider />
          <Subtitle variant="subtitle1">
            Send me a message and I'll get back to you soon!
          </Subtitle>
        </SectionHeader>

        {/* Contact Form */}
        <FormContainer>
          {isSubmitted ? (
            <SuccessMessage>
              <SuccessIcon />
              <SuccessTitle variant="h4">Message Sent!</SuccessTitle>
              <SuccessText variant="body1">
                Thank you for reaching out. I'll get back to you soon!
              </SuccessText>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="New Contact Form Submission"
              />
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
                tabIndex={-1}
                aria-hidden="true"
              />

              <FormGrid>
                <FormGroup>
                  <StyledTextField
                    label="Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    variant="outlined"
                  />
                </FormGroup>
                <FormGroup>
                  <StyledTextField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    variant="outlined"
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <StyledTextField
                  label="Subject"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                  variant="outlined"
                />
              </FormGroup>

              <FormGroup>
                <StyledTextArea
                  label="Message"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me more..."
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <LoadingSpinner />
                    Sending...
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Send style={{ width: "1.25rem", height: "1.25rem" }} />
                    Send Message
                  </Box>
                )}
              </SubmitButton>
            </Form>
          )}
        </FormContainer>

        {/* Horizontal Line */}
        <HorizontalLine />

        {/* Footer */}
        <Footer>
          <FooterText variant="body2">
            © 2025 Nishara Jayakody. Built with ❤️ using React, Vite
          </FooterText>
        </Footer>
      </ContentWrapper>
    </Container>
  );
};

export default Contact;