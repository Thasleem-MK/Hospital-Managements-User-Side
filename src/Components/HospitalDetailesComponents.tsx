import { Calendar, Mail, MapPin, Phone, Send, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hospital, Review } from "../Redux/HospitalsData";

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
export const Info = ({ hospital }: { hospital: Hospital }) => {
  // const averageRating =
  //   reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        <span>{hospital?.address}</span>
      </div>
      <div className="flex items-center">
        <Phone className="h-5 w-5 text-green-600 mr-2" />
        <span> {hospital?.phone} </span>
      </div>
      <div className="flex items-center">
        <Mail className="h-5 w-5 text-green-600 mr-2" />
        <span>{hospital?.email}</span>
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
        <p className="text-green-600">{hospital?.about}</p>
      </div>
    </div>
  );
};

// Specialties window
export const Specialties = ({ hospital }: { hospital: Hospital }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hospital?.specialties.map((dept, index) => (
        <div
          key={index}
          className="border border-green-200 rounded-md p-4 hover:bg-green-50 transition-colors"
          onClick={() => {
            navigate(`/services/hospitals/${hospital?._id}/${dept.name}`);
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
export function convertTo12HourFormat(time24: string): string {
  let [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export const WorkingHours = ({ hospital }: { hospital: Hospital }) => {
  return (
    <div className="space-y-2">
      {hospital.working_hours.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-green-100 last:border-b-0"
        >
          <span className="font-medium text-green-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {day.day}
          </span>
          <span className="text-green-600">
            {day.is_holiday
              ? "Holiday"
              : `${convertTo12HourFormat(
                  day.opening_time
                )}${" - "}${convertTo12HourFormat(day.closing_time)}`}
          </span>
        </div>
      ))}
    </div>
  );
};

// Review windo
export const ReviewComponent = ({ hospital }: { hospital: Hospital }) => {
  // const [reviews, setReviews] = useState<Review[]>();
  const [newReview, setNewReview] = useState<Review>({
    user_name: "",
    rating: 0,
    comment: "",
    date: "",
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNewReview({ user_name: "", rating: 0, comment: "", date: "" });
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
            value={newReview.user_name}
            onChange={(e) =>
              setNewReview({ ...newReview, user_name: e.target.value })
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
        {hospital.reviews.map((review) => (
          <div key={review._id} className="border-b border-green-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-700">
                {review.user_name}
              </span>
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
