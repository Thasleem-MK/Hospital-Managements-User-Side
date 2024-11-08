import Navbar from "../Components/Navbar";
import {
  Ambulance,
  Search,
  Calendar,
  Clipboard,
  UserPlus,
  Clock4,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          About Our Hospital Finder
        </h1>

        <section className="mb-12">
          <p className="text-green-700 text-lg mb-4">
            Welcome to our innovative hospital finder platform, where we connect
            patients with nearby hospitals and doctors. Our mission is to
            simplify healthcare access and improve the overall patient
            experience.
          </p>
          <p className="text-green-700 text-lg mb-4">
            With our user-friendly interface, you can easily find hospitals,
            book appointments, and even access emergency ambulance services. For
            healthcare providers, we offer a seamless registration process to
            showcase your facilities and specialties.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Search className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Find Nearby Hospitals
              </h3>
              <p className="text-green-700 text-center">
                Easily locate hospitals and clinics in your area
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Book Appointments
              </h3>
              <p className="text-green-700 text-center">
                Schedule consultations with doctors at your convenience
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Ambulance className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Emergency Services
              </h3>
              <p className="text-green-700 text-center">
                Quick access to nearby ambulance services
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <UserPlus className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Hospital Registration
              </h3>
              <p className="text-green-700 text-center">
                Easy sign-up process for healthcare providers
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clipboard className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Specialties & Doctors
              </h3>
              <p className="text-green-700 text-center">
                Browse hospitals by specialties and find the right doctor
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock4 className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Working Hours
              </h3>
              <p className="text-green-700 text-center">
                View hospital and doctor availability in real-time
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Find Hospitals Near You
          </h2>
          <p className="text-green-700 text-lg">
            Use our search feature to find hospitals and doctors in your area.
            Simply enter your location to get started.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            For Hospitals
          </h2>
          <p className="text-green-700 text-lg mb-4">
            Are you a healthcare provider? Join our platform to:
          </p>
          <ul className="list-disc list-inside text-green-700 text-lg mb-4">
            <li>Showcase your facilities and specialties</li>
            <li>Manage appointments and patient bookings</li>
            <li>List your doctors and their availability</li>
            <li>Provide real-time updates on working hours</li>
          </ul>
          <p className="text-green-700 text-lg">
            Contact us to learn more about registering your hospital on our
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Our Commitment
          </h2>
          <p className="text-green-700 text-lg mb-4">
            At our Hospital Finder platform, we are committed to:
          </p>
          <ul className="list-disc list-inside text-green-700 text-lg">
            <li>Simplifying access to quality healthcare services</li>
            <li>Providing accurate and up-to-date information</li>
            <li>
              Ensuring a seamless experience for patients and healthcare
              providers
            </li>
            <li>Continuously improving our platform based on user feedback</li>
            <li>
              Maintaining the highest standards of data privacy and security
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}