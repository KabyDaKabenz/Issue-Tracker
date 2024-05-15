import { Button, Card, Flex, Text } from "@radix-ui/themes";
import AddIssueButton from "./AddIssueButton";
import { Status } from "@prisma/client";
import { statusMap } from "./IssueStatusBadge";
import Link from "next/link";

const NoIssuesCard = ({ status }: { status?: Status }) => {
  return (
    <Card className="flex flex-col justify-center items-center gap-3 shadow-lg">
      {Object.keys(Status).includes(status || "") ? (
        <Flex gap="3" align="center">
          <Text size="5" weight="bold">
            No {statusMap[status!].label} Issues Yet.
          </Text>
          <Button>
            <Link href="/issues?status=all">See All Issues</Link>
          </Button>
          <Button variant="soft">
            <Link href="/">Go To Dashboard</Link>
          </Button>
        </Flex>
      ) : (
        <>
          <Text size="5" weight="bold">
            No Issues Yet. Add a new issue?
          </Text>
          <AddIssueButton />
        </>
      )}
    </Card>
  );
};

export default NoIssuesCard;
