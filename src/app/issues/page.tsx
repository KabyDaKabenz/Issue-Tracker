import Pagination from "@/components/Pagination";
import prisma from "@_prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import IssueToolbar from "./IssueToolbar";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const validatePage = (page: string, pageCount: number): number => {
    let validatedPage = parseInt(page);
    if (!validatedPage || validatedPage <= 0 || validatedPage > pageCount) {
      return 1;
    }

    return validatedPage;
  };

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const issueCount = await prisma.issue.count({ where });

  const sort = ["asc", "desc"].includes(searchParams.sort)
    ? searchParams.sort
    : "asc";

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sort }
    : undefined;

  const PAGE_SIZE = 10;
  const pageCount = Math.ceil(issueCount / PAGE_SIZE);
  let page = validatePage(searchParams.page, pageCount);

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          pageSize={PAGE_SIZE}
          itemCount={issueCount}
          currentPage={page}
        />
      </Flex>
    </Flex>
  );
};

export default IssuesPage;
