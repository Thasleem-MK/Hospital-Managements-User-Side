import Navbar from "../Components/Navbar";

import { useState } from "react";
import {
  Send,
  Star,
  Phone,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { apiClient } from "../Components/Axios";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    await apiClient
      .post("/api/email", {
        from: email,
        to: "hostahealthcare@gmail.com",
        subject: `Review from: ${email}`,
        text: `Rating:${rating} Opinion:${opinion}`,
      })
      .then(() => {
        setSubmitStatus("success");
        setEmail("");
        setOpinion("");
        setRating(0);
      })
      .catch((err) => {
        console.log(err);
        setSubmitStatus("error");
      });

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Contact Us</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="opinion"
                  className="block text-sm font-medium text-green-700"
                >
                  Your Opinion
                </label>
                <textarea
                  id="opinion"
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Rate Our Application
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>

            {submitStatus === "success" && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
                Thank you for your feedback! We've received your message.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
                There was an error submitting your message. Please try again
                later, Thank you.
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-green-700">Phone: 8714412090</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-green-700">
                  Email: hostahealthcare@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 text-green-600 mr-2" />
                <a
                  href="https://wa.me/918714412090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-800 cursor-pointer"
                >
                  WhatsApp: 8714412090
                </a>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61566955145072&mibextid=LQQJ4d&rdid=rUkuyexGh2CyFoDD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CL6WSxXSq%2F%3Fmibextid%3DLQQJ4d#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/hosta_healthcare/?igsh=MnR6d3h0YTJlbXEy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a href=""></a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
