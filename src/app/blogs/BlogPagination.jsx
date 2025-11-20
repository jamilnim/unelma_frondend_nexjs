"use client";

export default function BlogPagination({ page, pageCount, setPage }) {
  return (
    <div className="flex justify-center gap-4 mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 dark:border-neutral-700"
      >
        Previous
      </button>

      <button
        disabled={page === pageCount}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 dark:border-neutral-700"
      >
        Next
      </button>
    </div>
  );
}
