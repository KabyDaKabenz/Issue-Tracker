import Pagination from "@/components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemCount={20}
      currentPage={parseInt(searchParams.page) || 1}
      pageSize={5}
    />
  );
}
