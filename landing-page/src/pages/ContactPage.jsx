import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
