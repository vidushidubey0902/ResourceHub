import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import image from "../../assets/roadmap.jpg";
import { useParams } from "react-router-dom";
import { useGetRoadmapByIdQuery } from "../../slices/roadmapApiSlice";
import RoadmapSteps from "./StepCards";

const DisplayDetailedRoadmap: React.FC<any> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRoadmapByIdQuery(id);

  const [reviews, setReviews] = useState<any[]>(data?.ratings || []);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = { username: data?.authorName, rating, comment: review };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(0);
    setReview("");
  };

  const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <section className="bg-home-bg theme-transition mx-auto">
      {/* Header */}
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-home-text py-4 px-1 md:px-2">
        {data?.title}
      </h1>

      {/* Tags and Author */}
      <div className="flex justify-between items-center mb-4 px-1 md:px-2">
        <div className="flex gap-1 md:gap-2">
          {data?.tags?.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="bg-gradient-to-tr from-home-quaternary to-home-secondary px-3 py-1 rounded-full text-xs lg:text-sm text-home-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="italic text-home-text-secondary text-xs lg:text-sm">
          - By {data?.authorName}
        </div>
      </div>

      {/* Roadmap Description */}
      <div className="px-1 md:px-2">
        <div className="flex flex-col lg:flex-row items-start gap-6 bg-gradient-to-br from-home-secondary to-home-quaternary p-1 md:p-2 lg:p-3 rounded-lg shadow-md">
          <div className="w-full lg:w-1/3">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-md opacity-0.5"
              src={image}
              alt="Roadmap"
            />
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold mb-2 text-home-text">
              Roadmap Description
            </h2>
            <p className="text-home-text-secondary italic text-xs md:text-sm lg:text-base max-w-96 md:max-w-[30rem] lg:max-w-[40rem]">
              {data?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="px-1 md:px-2">
        <RoadmapSteps steps={data?.steps || []} />
      </div>

      {/* Ratings & Reviews */}
      <div className="mt-12 px-1 md:px-2 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-home-text">
            Ratings & Reviews
          </h3>
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-blue-500 hover:underline"
            >
              {showAllReviews ? "View Less" : "View All"}
            </button>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="text-home-text-secondary italic">(No ratings yet..)</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewsToDisplay.map((review, idx) => (
              <div
                key={idx}
                className="border border-gray-300 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.username}</span>
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add a Review */}
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-bold text-home-text-secondary">
              Leave a Review
            </h3>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  color={star <= rating ? "#ffc107" : "#d6d5d2"}
                  className="cursor-pointer transition-colors duration-200 hover:text-yellow-400"
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700"></label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-2 p-2 rounded-lg w-full resize-none bg-home-primary text-home-text text-xs md:text-sm"
                rows={4}
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-home-primary text-home-text rounded-lg hover:bg-home-quaternary theme-transition"
              >
                Submit Review
              </button>
              <button
                type="reset"
                className="px-6 py-2 bg-home-secondary text-home-text-secondary rounded-lg hover:bg-home-quaternary theme-transition"
                onClick={() => {
                  setRating(0);
                  setReview("");
                }}
              >
                Clear All
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DisplayDetailedRoadmap;
