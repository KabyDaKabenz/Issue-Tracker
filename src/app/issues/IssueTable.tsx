import { IssueStatusBadge } from "@/components";
import NoIssuesCard from "@/components/NoIssuesCard";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sort: string;
  page: string;
}

interface IssueTableProps {
  issues: Issue[];
  searchParams: IssueQuery;
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  if (issues.length === 0) return <NoIssuesCard />;

  return (
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

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
