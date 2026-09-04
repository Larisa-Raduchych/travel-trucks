"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { CamperImage } from "@/types/camper";
import css from "./Gallery.module.css";

import "swiper/css";
import "swiper/css/thumbs";

interface GalleryProps {
  images: CamperImage[];
  name: string;
}

export default function Gallery({ images, name }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={css.gallery}>
      {/* Головний слайдер (велике фото) */}
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className={css.main}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.original} alt={name} className={css.mainImage} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Мініатюри */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={16}
        watchSlidesProgress
        className={css.thumbs}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.thumb} alt={name} className={css.thumbImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}