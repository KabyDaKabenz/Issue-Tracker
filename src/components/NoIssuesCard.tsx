import { Card, Text } from "@radix-ui/themes";
import AddIssueButton from "./AddIssueButton";

const NoIssuesCard = () => {
  return (
    <Card className="flex flex-col justify-center items-center gap-3">
      <Text size="5" weight="bold">
        No Issues Yet. Add a new issue?
      </Text>
      <AddIssueButton />
    </Card>
  );
};

export default NoIssuesCard;
