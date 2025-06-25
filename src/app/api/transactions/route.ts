import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import { categorizetransaction } from "@/lib/ai";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { DateTime: "desc" },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const data = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Auto categorize using AI if category not provided
    let category = data.category;
    if (!category && data.description) {
      category = await categorizetransaction(data.description);
    }

    const transaction = await prisma.transactions.create({
      data: {
        amount: data.amount,
        type: data.type,
        description: data.description,
        category: category || "Uncategorized",
        DateTime: new Date(data.date),
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const transaction = await prisma.transactions.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== user?.id) {
      return NextResponse.json({ error: "Not authorized or transaction not found" }, { status: 403 });
    }

    await prisma.transactions.delete({ where: { id } });

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
