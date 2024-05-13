import { Card, Flex, Text } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "@/components";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Link
          className="text-sm font-medium w-full"
          href={`/issues?status=${container.status}`}
          key={container.label}
        >
          <Card className="shadow-lg">
            <Flex direction="column" gap="1" align="center">
              <IssueStatusBadge status={container.status} />
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
