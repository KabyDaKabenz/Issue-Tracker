import Pagination from "@/components/Pagination";

export default function Home() {
  return <Pagination itemCount={20} currentPage={3} pageSize={5} />;
}
