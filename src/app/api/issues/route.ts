import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@_prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  revalidatePath("/issues");

  return NextResponse.json(newIssue, { status: 201 });
}

// export async function GET(request: Request) {
//   const issues = await prisma.issue.findMany();

//   if (!issues) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(issues, { status: 200 });
// }
