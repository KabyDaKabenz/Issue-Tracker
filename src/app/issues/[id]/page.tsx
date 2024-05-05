import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import prisma from "../../../../prisma/client";

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
    <>
      <Heading>{issue.title}</Heading>
      <div className="flex items-center gap-3 my-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetailPage;
