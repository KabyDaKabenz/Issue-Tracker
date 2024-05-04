import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";

interface IssueDetailProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: IssueDetailProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex items-center gap-3 my-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
