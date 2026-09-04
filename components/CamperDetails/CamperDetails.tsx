"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamperById, getCamperReviews } from "@/lib/api";
import Gallery from "@/components/Gallery/Gallery";
import { FaStar } from "react-icons/fa";
import BookingForm from "@/components/BookingForm/BookingForm";
// import Loader from "@/components/Loader/Loader";  
import css from "./CamperDetails.module.css";

interface CamperDetailsProps {
  camperId: string;
}

export default function CamperDetails({ camperId }: CamperDetailsProps) {
  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
  });

  const { data: reviews } = useQuery({
  queryKey: ["reviews", camperId],
  queryFn: () => getCamperReviews(camperId),
});

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i <= rating ? css.starFull : css.starEmpty}
      />
    );
  }
  return stars;
};

  if (isLoading) return <p>Завантаження...</p>;
  if (isError || !camper) return <p>Не вдалося завантажити кемпер.</p>;

  return (
    <div className={css.details}>
        {/* Галерея */}
    <Gallery images={camper.gallery} name={camper.name} />
      {/* Інформація */}
      <h1 className={css.name}>{camper.name}</h1>
      <div className={css.meta}>
        <span>⭐ {camper.rating} ({camper.totalReviews} Reviews)</span>
        <span>📍 {camper.location}</span>
      </div>
      <p className={css.price}>€{camper.price.toFixed(2)}</p>
      <p className={css.description}>{camper.description}</p>

      {/* далі — галерея, характеристики, відгуки, форма (додамо) */}
      {/* Теги (feature chips) */}
<ul className={css.features}>
  <li className={css.feature}>{camper.transmission}</li>
  <li className={css.feature}>{camper.engine}</li>
  {camper.amenities.map((item) => (
    <li key={item} className={css.feature}>{item}</li>
  ))}
</ul>

{/* Таблиця характеристик */}
<div className={css.vehicleDetails}>
  <h3 className={css.subtitle}>Vehicle details</h3>
  <ul className={css.specs}>
    <li className={css.spec}>
      <span>Form</span>
      <span>{camper.form}</span>
    </li>
    <li className={css.spec}>
      <span>Length</span>
      <span>{camper.length}</span>
    </li>
    <li className={css.spec}>
      <span>Width</span>
      <span>{camper.width}</span>
    </li>
    <li className={css.spec}>
      <span>Height</span>
      <span>{camper.height}</span>
    </li>
    <li className={css.spec}>
      <span>Tank</span>
      <span>{camper.tank}</span>
    </li>
    <li className={css.spec}>
      <span>Consumption</span>
      <span>{camper.consumption}</span>
    </li>
  </ul>
</div>

{/* Відгуки */}
<div className={css.reviews}>
  <h3 className={css.subtitle}>Reviews</h3>
  <ul className={css.reviewsList}>
    {reviews?.map((review) => (
      <li key={review.id} className={css.review}>
        <div className={css.reviewHeader}>
          {/* Аватар з першою літерою */}
          <div className={css.avatar}>
            {review.reviewer_name.charAt(0)}
          </div>
          <div>
            <p className={css.reviewerName}>{review.reviewer_name}</p>
            {/* Зірки */}
            <div className={css.stars}>
              {renderStars(review.reviewer_rating)}
            </div>
          </div>
        </div>
        <p className={css.reviewText}>{review.comment}</p>
      </li>
    ))}
  </ul>
</div>
<BookingForm camperId={camper.id} />
    </div>
  );
}