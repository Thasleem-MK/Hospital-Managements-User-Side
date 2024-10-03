import Navbar from "../Components/Navbar"
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Stethoscope,
  Ambulance,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          About Our Hospital
        </h1>

        <section className="mb-12">
          <p className="text-green-700 text-lg mb-4">
            Welcome to our state-of-the-art hospital, where we combine
            cutting-edge medical technology with compassionate care. Our mission
            is to provide the highest quality healthcare services to our
            community and beyond.
          </p>
          <p className="text-green-700 text-lg mb-4">
            With a team of dedicated professionals and a patient-first approach,
            we strive to make a positive impact on the lives of those we serve.
            Our hospital is committed to excellence in medical care, research,
            and education.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Key Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-green-700">
              <Clock className="h-6 w-6 mr-2" />
              <span>Open 24/7 for emergencies</span>
            </div>
            <div className="flex items-center text-green-700">
              <MapPin className="h-6 w-6 mr-2" />
              <span>123 Hospital Street, Healthville, HV 12345</span>
            </div>
            <div className="flex items-center text-green-700">
              <Phone className="h-6 w-6 mr-2" />
              <span>Emergency: 911 | General: (123) 456-7890</span>
            </div>
            <div className="flex items-center text-green-700">
              <Mail className="h-6 w-6 mr-2" />
              <span>info@ourhospital.com</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Top-Rated Hospital
              </h3>
              <p className="text-green-700 text-center">
                Recognized for excellence in patient care
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                500,000+ Patients Served
              </h3>
              <p className="text-green-700 text-center">
                Trusted by our community for over 50 years
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Stethoscope className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Cutting-Edge Technology
              </h3>
              <p className="text-green-700 text-center">
                Equipped with the latest medical advancements
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Ambulance className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 text-center mb-2">
                Rapid Emergency Response
              </h3>
              <p className="text-green-700 text-center">
                Average response time under 10 minutes
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Our Commitment
          </h2>
          <p className="text-green-700 text-lg mb-4">
            At our hospital, we are committed to:
          </p>
          <ul className="list-disc list-inside text-green-700 text-lg">
            <li>Providing patient-centered care with empathy and respect</li>
            <li>Continuously improving our services and medical practices</li>
            <li>Investing in our staff's professional development</li>
            <li>Engaging with and supporting our local community</li>
            <li>
              Maintaining the highest standards of medical ethics and integrity
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}