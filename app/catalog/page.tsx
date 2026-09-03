"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import css from "./page.module.css";

export default function CatalogPage() {
const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ["campers"],
      queryFn: ({ pageParam }) => getCampers({ page: pageParam, perPage: 4 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];


  return (<div className={css.catalog}>
    {isError && <p>Не вдалося завантажити кемпери.</p>}

      {/* Список карток */}
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
          {isFetching ? "Завантаження..." : "Load more"}
        </button>
      )}
    </div>);
}