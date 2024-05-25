import { Box, Button, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "@_prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import StatusSelect from "./StatusSelect";
import Link from "next/link";

interface IssueDetailProps {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: IssueDetailProps) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return (
    <Flex direction="column" gap="8">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <>
          <Box className="flex flex-col gap-4 [&>*]:flex-1 md:col-span-1 md:flex-row">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
          </Box>
          <Box className="flex flex-col gap-4 md:flex-row md:justify-between">
            <Box className="flex gap-4 [&>*]:flex-1 md:[&>*]:flex-none">
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Box>
            <Link href="/issues" className="inline-block">
              <Button variant="soft" className="w-full">
                Back to Issues
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Flex>
  );
};

export async function generateMetadata({ params }: IssueDetailProps) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    desccription: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
