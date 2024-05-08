import { IssueStatusBadge } from "@/components";
import prisma from "@_prisma/client";
import { Status, Issue } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssuesToolbar from "./IssuesToolbar";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/components/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: string;
    page: string;
  };
}) => {
  const validatePage = (page: string, pageCount: number): number => {
    let validatedPage = parseInt(page);
    if (!validatedPage || validatedPage <= 0 || validatedPage > pageCount) {
      return 1;
    }

    return validatedPage;
  };

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const issueCount = await prisma.issue.count({ where });

  const sort = ["asc", "desc"].includes(searchParams.sort)
    ? searchParams.sort
    : "asc";

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sort }
    : undefined;

  const PAGE_SIZE = 10;
  const pageCount = Math.ceil(issueCount / PAGE_SIZE);
  let page = validatePage(searchParams.page, pageCount);

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sort: searchParams.sort === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowIcon sort={searchParams.sort} />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Link key={issue.id} href={`/issues/${issue.id}`} legacyBehavior>
              <Table.Row className="hover:bg-gray-100 cursor-pointer">
                <Table.ColumnHeaderCell>
                  {issue.title}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Link>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify="center" mt="3">
        <Pagination
          pageSize={PAGE_SIZE}
          itemCount={issueCount}
          currentPage={page}
        />
      </Flex>
    </div>
  );
};

const ArrowIcon = ({ sort }: { sort: string }) => {
  return (
    <>
      {sort === "desc" ? (
        <ArrowDownIcon className="inline" />
      ) : (
        <ArrowUpIcon className="inline" />
      )}
    </>
  );
};

export default IssuesPage;
