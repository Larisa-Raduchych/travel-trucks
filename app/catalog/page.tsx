"use client";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import Filters, { FilterValues } from "@/components/Filters/Filters";
import { LuX } from "react-icons/lu";
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
      queryFn: ({ pageParam }) =>
        getCampers({ page: pageParam, perPage: 4, ...filters }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div className={css.catalog}>
      <Filters onSearch={setFilters} />

      <div className={css.results}>
        {isError && <p>Something went wrong.</p>}

{!isError && campers.length === 0 && (
  <div className={css.emptyState}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/NoCampers.png" alt="No campers found" className={css.emptyImage} />
    <h2 className={css.emptyTitle}>No campers found</h2>
    <p className={css.emptyText}>
      We couldn&apos;t find any campers that match your filters. Try adjusting your search or clearing some filters.
    </p>
    <div className={css.emptyButtons}>
      <button className={css.clearBtn} onClick={() => setFilters({ location: "", form: "", transmission: "", engine: "" })}>
        <LuX className={css.clearIcon}/>
        Clear filters
      </button>
      <button className={css.viewAllBtn} onClick={() => setFilters({ location: "", form: "", transmission: "", engine: "" })}>
        View all campers
      </button>
    </div>
  </div>
)}

{campers.length > 0 && (

        <ul className={css.list}>
          {campers.map((camper) => (
            <li key={camper.id}>
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>
        )}
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
    </div>
  );
}
