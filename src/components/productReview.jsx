import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductReviews({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const cleanProductID = productID?.trim();

  // Fetch reviews
  useEffect(() => {
    if (!cleanProductID) return;

    const fetchReviews = async () => {
      setStatus("loading");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/products/${cleanProductID}/reviews`
        );
        setReviews(res.data);
        setStatus("success");
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setStatus("error");
      }
    };

    fetchReviews();
  }, [cleanProductID]);

  // Handle adding review
  const handleAddReview = async () => {
    if (!cleanProductID) return toast.error("Product ID not ready");
    if (!comment.trim()) return toast.error("Please write a comment");

    setIsPosting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/products/${cleanProductID}/reviews`,
        {
          userName: "Guest User", // Replace with logged-in user
          rating,
          comment,
        }
      );
      toast.success("Review added successfully!");
      setReviews([res.data, ...reviews]); // Optimistic update
      setComment("");
      setRating(5);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      {/* Review Status */}
      {status === "loading" && <p>Loading reviews...</p>}
      {status === "error" && <p className="text-red-500">Error loading reviews.</p>}

      {/* Reviews List */}
      {status === "success" && reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}

      {status === "success" && reviews.length > 0 && (
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
          disabled={isPosting}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
            isPosting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPosting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
