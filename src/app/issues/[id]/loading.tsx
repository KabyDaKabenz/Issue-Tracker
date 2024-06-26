import { Skeleton } from "@/components";
import { Box, Card } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <div className="flex items-center gap-3 my-3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
