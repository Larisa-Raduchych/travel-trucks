"use client";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import Filters, { FilterValues } from "@/components/Filters/Filters";
import css from "./catalogPage.module.css";

export default function CatalogPage() {

const [filters, setFilters] = useState<FilterValues>({
    location: "",
    form: "",
    transmission: "",
    engine: "",
  });

const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ["campers", filters],
      queryFn: ({ pageParam }) => getCampers({ page: pageParam, perPage: 4, ...filters }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];


  return (<div className={css.catalog}>
    <Filters onSearch={setFilters} />

    <div className={css.results}>
    {isError && <p>Не вдалося завантажити кемпери.</p>}

      {/* Список карток праворуч */}
      <ul className={css.list}>
        {campers.map((camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>

      {/* Кнопка Load More */}
      {hasNextPage && (
        <button
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetching ? <Loader /> : "Load more"}
        </button>
      )}
    </div>
    </div>);
}