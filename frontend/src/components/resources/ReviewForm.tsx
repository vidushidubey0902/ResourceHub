import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { reviewSchema } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError, ReviewFormFields } from "../../utils/types";
import { useForm } from "react-hook-form";
import {
  useAddResourceRatingMutation,
  useGetUserReviewQuery,
} from "../../slices/resourcesApiSlice";
import { toast } from "react-toastify";

const ReviewForm = ({ id }: { id: string }) => {
  const { data: userReview, isLoading: reviewLoading } =
    useGetUserReviewQuery(id);
  const [ratingValue, setRatingValue] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ReviewFormFields>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  useEffect(() => {
    if (userReview) {
      setValue("comment", userReview.comment);
      setValue("rating", userReview.rating);
      setRatingValue(userReview.rating);
    }
  }, [userReview, setValue]);

  const [addResourceRating] = useAddResourceRatingMutation();

  const handleRatingChange = (rating: number) => {
    if (!userReview) {
      setRatingValue(rating);
      setValue("rating", rating);
    }
  };

  const onSubmit = async (formData: ReviewFormFields) => {
    const finalData = {
      id,
      rating: getValues("rating"),
      comment: formData.comment,
    };

    try {
      await addResourceRating(finalData).unwrap();
      toast.success("Review submitted");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-[0.8rem] md:text-sm lg:text-base xl:text-xl font-medium md:tracking-wide text-home-text theme-transition">
        Leave a review
      </h2>

      {reviewLoading ? (
        <div className="animate-pulse grid gap-2">
          <div className="bg-gradient-to-r w-1/3 h-5 rounded-xl from-gray-800 to-gray-500"></div>
          <div className="bg-gradient-to-r w-2/3 h-5 rounded-lg from-gray-500 to-gray-800"></div>
          <div className="bg-gradient-to-r w-4/5 h-5 rounded-lg from-gray-950 to-gray-600"></div>
        </div>
      ) : (
        <div className="p-0.5 md:pt-1 xl:pt-2 px-1 md:px-2">
          <div className="pt-1 md:pt-2 flex flex-col gap-1 md:gap-2">
            <div className="bg-home-accent theme-transition rounded-xl w-4/5 sm:w-1/2 p-1.5 md:p-2 xl:p-2.5 flex justify-between items-center">
              <div className="flex text-xs">
                {[...Array(5)].map((_, index) => {
                  const rating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        className="hidden"
                        disabled={!!userReview}
                      />
                      <FaStar
                        className={`cursor-pointer transition-colors duration-300 hover:text-yellow-300 ${
                          rating <= ratingValue
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(rating)}
                      />
                    </label>
                  );
                })}
              </div>
              <button
                type="submit"
                className="text-home-text-link text-[0.55rem] sm:text-[0.65rem] md:text-[0.7rem] xl:text-sm font-medium disabled:text-home-text-secondary"
                disabled={!!userReview}
              >
                Submit
              </button>
            </div>

            <textarea
              {...register("comment")}
              className="bg-home-accent theme-transition font-medium rounded-xl w-full p-2 xl:p-2.5 resize-none focus:outline-none text-[0.6rem] md:text-xs text-home-text tracking-wide scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-slate-300/20"
              disabled={!!userReview}
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-xs">{errors.comment.message}</p>
            )}
            {errors.rating && (
              <p className="text-red-500 text-xs">{errors.rating.message}</p>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
