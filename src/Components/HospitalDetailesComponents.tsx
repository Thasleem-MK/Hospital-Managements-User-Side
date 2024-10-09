import { Calendar, Mail, MapPin, Phone, Send, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Button for Information, Specialties, Hours, Location, Review
export const Button = ({
  activeTab,
  purpose,
  content,
  OnClick,
}: {
  activeTab?: string;
  purpose?: string;
  content?: string;
  OnClick?: any;
}) => {
  return (
    <button
      className={`px-4 py-2 font-medium whitespace-nowrap ${
        activeTab === purpose
          ? "text-green-600 border-b-2 border-green-600"
          : "text-green-500"
      }`}
      onClick={OnClick}
    >
      {content}
    </button>
  );
};

// Information window
export const Info = () => {
  // const averageRating =
  //   reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        <span>123 Hospital Street, New York, NY 10001</span>
      </div>
      <div className="flex items-center">
        <Phone className="h-5 w-5 text-green-600 mr-2" />
        <span>(123) 456-7890</span>
      </div>
      <div className="flex items-center">
        <Mail className="h-5 w-5 text-green-600 mr-2" />
        <span>info@citygeneralhospital.com</span>
      </div>
      <div className="flex items-center">
        <Star className="h-5 w-5 text-green-600 mr-2" />
        <span>
          {/* averageRating.toFixed(1),(based on {reviews.length} reviews) */}
          {} out of 5 stars (based on 58 reviews)
        </span>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">About Us</h3>
        <p className="text-green-600">
          City General Hospital is a leading healthcare institution committed to
          providing exceptional medical care to our community. With
          state-of-the-art facilities and a team of dedicated healthcare
          professionals, we strive to deliver compassionate and comprehensive
          treatment to all our patients.
        </p>
      </div>
    </div>
  );
};

// Specialties window
export const Specialties = () => {
  const navigate = useNavigate();
  const specialties = [
    {
      name: "Orthopedics",
      description: "Specializes in musculoskeletal system",
    },
    {
      name: "General Medicine",
      description: "Provides primary healthcare services",
    },
    {
      name: "Cardiology",
      description: "Focuses on heart and cardiovascular system",
    },
    {
      name: "Pediatrics",
      description: "Specializes in medical care for children",
    },
    {
      name: "Neurology",
      description: "Deals with disorders of the nervous system",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {specialties.map((dept, index) => (
        <div
          key={index}
          className="border border-green-200 rounded-md p-4 hover:bg-green-50 transition-colors"
          onClick={() => {
            navigate(`/services/hospitals/3/Orthopedics`);
          }}
        >
          <h3 className="text-lg font-medium text-green-700">{dept.name}</h3>
          <p className="text-green-600">{dept.description}</p>
        </div>
      ))}
    </div>
  );
};

//Working Houres
export const WorkingHours = () => {
  const workingHours = [
    { day: "Monday", hours: "8:00 AM - 8:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 8:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 8:00 PM" },
    { day: "Friday", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className="space-y-2">
      {workingHours.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-green-100 last:border-b-0"
        >
          <span className="font-medium text-green-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {day.day}
          </span>
          <span className="text-green-600">{day.hours}</span>
        </div>
      ))}
    </div>
  );
};

// Review window
interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};
const initialReviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Excellent care and friendly staff!",
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Good experience overall, but wait times could be improved.",
    date: "2023-05-10",
  },
];
export const Review = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const newReviewWithId: Review = {
      ...newReview,
      id: reviews.length + 1,
      date: currentDate,
    };
    setReviews([newReviewWithId, ...reviews]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };
  return (
    <div>
      <h3 className="text-xl font-semibold text-green-700 mb-4">Reviews</h3>
      <form
        onSubmit={handleReviewSubmit}
        className="mb-6 bg-green-50 p-4 rounded-lg"
      >
        <h4 className="text-lg font-medium text-green-700 mb-2">
          Write a Review
        </h4>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 mb-1">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer ${
                  star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-green-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
            rows={3}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit Review
          <Send className="ml-2 h-4 w-4" />
        </button>
      </form>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-green-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-700">{review.name}</span>
              <span className="text-sm text-green-600">{review.date}</span>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-green-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
