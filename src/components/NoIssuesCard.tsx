import { Card, Text } from "@radix-ui/themes";

const NoIssuesCard = () => {
  return (
    <Card className="table shadow-lg text-center">
      <Text size="5" weight="bold" className="table-cell align-middle ">
        No Issues Yet.
      </Text>
    </Card>
  );
};

export default NoIssuesCard;
