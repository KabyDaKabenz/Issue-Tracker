import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@_prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { title, description, assignedToUserId, status } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  revalidatePath("/issues");
  revalidatePath("/");

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issueToDelete = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueToDelete) {
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: issueToDelete.id },
  });

  revalidatePath("/");

  return NextResponse.json(deletedIssue, { status: 200 });
}
