import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/ui/ContactForm";
import Map from "@/components/ui/Map";
import React from "react";

function Contact() {
  return (
    <div className="flex flex-col gap-16">
      <ContactHero />
      <Map />
      <ContactForm />
    </div>
  );
}

export default Contact;
