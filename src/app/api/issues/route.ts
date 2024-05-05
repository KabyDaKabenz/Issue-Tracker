import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@_prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

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
