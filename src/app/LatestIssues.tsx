import { IssueStatusBadge } from "@/components";
import prisma from "@_prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5" align="center">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Link key={issue.id} href={`/issues/${issue.id}`} legacyBehavior>
              <Table.Row className="hover:bg-gray-100 cursor-pointer [&>td]:last:shadow-none">
                <Table.Cell>
                  <Flex justify="between" align="center">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        size="2"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Link>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
