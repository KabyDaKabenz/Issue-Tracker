import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "@_prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface IssueDetailProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: IssueDetailProps) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="flex flex-col gap-4">
          <AssigneeSelect />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
