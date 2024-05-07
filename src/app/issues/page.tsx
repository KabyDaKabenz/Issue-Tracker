import { IssueStatusBadge } from "@/components";
import prisma from "@_prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssuesToolbar from "./IssuesToolbar";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export default IssuesPage;
