import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import Map from "@/components/ui/Map";

export default function ContactSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-main sm:text-4xl">
            Contactez-nous
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Nous sommes là pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-main" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary-main">
                    Adresse
                  </h3>
                  <p className="mt-1 text-gray-500">
                    123 Rue Example
                    <br />
                    75000 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-main" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary-main">
                    Téléphone
                  </h3>
                  <p className="mt-1 text-gray-500">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-main" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary-main">
                    Email
                  </h3>
                  <p className="mt-1 text-gray-500">contact@companyviene.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Map />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
