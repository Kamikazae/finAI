import Link from "next/link";
import { buttonVariants } from "@/components/ui/buttons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 via-purple-100 to-gray-100 px-6">
      <h1 className="mb-12 text-center text-5xl font-extrabold text-purple-700">
        Welcome to <span className="text-purple-900">FinAI</span>
        <br />
        Your AI Financial Assistant
      </h1>

      <div className="flex space-x-6 mb-10">
        <Link href="/login" className={buttonVariants({ variant: "default", size: "lg" })}>
          Sign In
        </Link>

        <Link href="/signup" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Sign Up
        </Link>
      </div>

      <ul className="max-w-md list-disc space-y-3 text-gray-700 text-lg">
        <li>Analyze your income, expenses, and transactions automatically</li>
        <li>Receive personalized financial feedback and tips</li>
        <li>Track your spending habits with AI-powered insights</li>
      </ul>
    </main>
  );
}
