import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductReviews({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [reviewStatus, setReviewStatus] = useState("loading");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Trim productID to avoid newline issues (%0A)
  const cleanProductID = productID?.trim();

  // Fetch reviews when component mounts or productID changes
  useEffect(() => {
    if (!cleanProductID) return;

    const url = `${import.meta.env.VITE_BACKEND_URL}/reviews/products/${cleanProductID}/reviews`;
    console.log("Fetching reviews from:", url);

    setReviewStatus("loading");
    axios
      .get(url)
      .then((res) => {
        setReviews(res.data);
        setReviewStatus("success");
      })
      .catch(() => setReviewStatus("error"));
  }, [cleanProductID]);

  // Handle adding a new review
  const handleAddReview = () => {
    if (!cleanProductID) {
      toast.error("Product ID not ready");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/reviews/products/${cleanProductID}/reviews`;
    console.log("Posting review to:", url);

    axios
      .post(url, {
        userName: "Guest User", // Replace with logged-in user
        rating,
        comment,
      })
      .then((res) => {
        toast.success("Review added successfully!");
        setReviews([res.data, ...reviews]); // Add new review on top
        setComment("");
        setRating(5);
      })
      .catch(() => toast.error("Failed to add review"));
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      {/* Review Status */}
      {reviewStatus === "loading" && <p>Loading reviews...</p>}
      {reviewStatus === "error" && <p>Error loading reviews.</p>}

      {/* Reviews List */}
      {reviewStatus === "success" && reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}
      {reviewStatus === "success" && reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded">
              <div className="flex justify-between">
                <h4 className="font-semibold">{review.userName}</h4>
                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Form */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded w-full mb-3"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={handleAddReview}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
