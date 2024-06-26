"use client";

import { Skeleton } from "@/components";
import { Issue, User } from "@prisma/client";
import { Select, Text, Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const router = useRouter();

  if (error) return null;

  const assignUserToIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== "unassigned" ? userId : null,
      });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Text size="2" weight="bold" align="center">
        Assigned User
      </Text>
      {isLoading ? (
        <Skeleton height="1.8rem" />
      ) : (
        <Select.Root
          defaultValue={issue.assignedToUserId || "unassigned"}
          onValueChange={assignUserToIssue}
        >
          <Select.Trigger placeholder="Assign..." />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="unassigned">No User Assigned</Select.Item>
              {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      <Toaster />
    </Flex>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
  });

export default AssigneeSelect;
