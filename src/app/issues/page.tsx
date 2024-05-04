import { Table } from "@radix-ui/themes";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssuesToolbar from "./IssuesToolbar";
import Link from "next/link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

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
            <Link href={`/issues/${issue.id}`} legacyBehavior>
              <Table.Row
                key={issue.id}
                className="hover:bg-gray-100 cursor-pointer"
              >
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
