import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../../hooks/useFirebase";
import "./Review.css";
import { ToastContainer, toast } from "react-toastify";

const Review = () => {
  document.title = "DJI / Review";
  const { user } = useFirebase();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = user.email;
    data.name = user.displayName;
    // console.log(data);
    fetch("https://enigmatic-taiga-27234.herokuapp.com/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          toast.success("Thanks for your review");
          reset();
        }
      });
  };

  return (
    <div>
      <h2>Review form</h2>
      <form
        className="d-flex flex-column review-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          type="text"
          placeholder="Write your review"
          className="my-2"
          {...register("review", { required: true })}
        />
        {errors.review && (
          <span className="text-light">This field is required</span>
        )}
        <input
          type="number"
          placeholder="Rating out of 5"
          className="my-2"
          {...register("rating", { required: true, min: 0, max: 5 })}
        />
        {errors.rating && (
          <span className="text-light">
            Minimum rating can be 0 and maximum is 5
          </span>
        )}

        <input className="my-2" type="submit" />
        <ToastContainer />
      </form>
    </div>
  );
};

export default Review;
