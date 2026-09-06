import Link from "next/link";
import { CamperListItem } from "@/types/camper";
import { FaStar } from "react-icons/fa";
import { LuMap } from "react-icons/lu";
import css from "./CamperCard.module.css";

interface CamperCardProps {
  camper: CamperListItem;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <div className={css.card}>
       {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={camper.coverImage}
        alt={camper.name}
        className={css.image}
      />

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.name}>{camper.name}</h3>
          <span className={css.price}>€{camper.price.toFixed(2)}</span>
        </div>

        <div className={css.meta}>
          <span className={css.rating}>
            <FaStar /> {camper.rating} ({camper.totalReviews} Reviews)
          </span>
          <span className={css.location}><LuMap />
             {camper.location}</span>
        </div>

        <p className={css.description}>
          {camper.description.slice(0, 60)}...
        </p>

        <ul className={css.features}>
          <li className={css.feature}>{camper.transmission}</li>
          <li className={css.feature}>{camper.engine}</li>
          <li className={css.feature}>{camper.form}</li>
          {/* + amenities за потреби */}
        </ul>

        <Link href={`/catalog/${camper.id}`} target="_blank" className={css.button}>
          Show more
        </Link>
      </div>
    </div>
  );
}