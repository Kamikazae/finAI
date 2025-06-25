import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await getCurrentUser(session.user.email);

  if (!user) {
    redirect('/login');
  }

  // Calculate financial metrics
  const totalIncome = user.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = user.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard 
          title="Total Balance" 
          value={netBalance} 
          type="balance"
        />
        <SummaryCard 
          title="Total Income" 
          value={totalIncome} 
          type="income"
        />
        <SummaryCard 
          title="Total Expenses" 
          value={totalExpenses} 
          type="expense"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {user.transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.DateTime).toLocaleDateString()} • {transaction.category}
                </p>
              </div>
              <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}