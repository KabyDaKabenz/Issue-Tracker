import { Flex } from "@radix-ui/themes";
import { Skeleton } from "@/components/index";

const IssueToolbarSkeleton = () => {
  return (
    <Flex justify="between">
      <Skeleton width="4rem" height="2rem" />
      <Skeleton width="5rem" height="2rem" />
    </Flex>
  );
};

export default IssueToolbarSkeleton;
