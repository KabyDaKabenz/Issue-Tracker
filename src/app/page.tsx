import prisma from "@_prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issueCountProps = {
    open: openCount,
    inProgress: inProgressCount,
    closed: closedCount,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4" justify="between">
        <IssueSummary {...issueCountProps} />
        <IssueChart {...issueCountProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
