import {getServerSession} from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import {prisma} from '@/lib/db';
import { generateFinancialInsights } from '@/lib/ai';
import InsightCard from '@/components/insights/InsightCard';

export default async function InsightsPage(){
    const session=await getServerSession(authOptions);
    if(!session?.user?.email) return null;
    const user=await prisma.user.findUnique({
        where:{email:session.user.email},
        include:{transactions:true},
    });
    if(!user) return null;

    const insights=await generateFinancialInsights(user.transactions);
    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className='font-bold text-2xl mb-6'>
            AI financial Insights
            </h1>
            <InsightCard insights={insights} />
            <div className='mt-8 bg-white p-6 rounded-lg shadow'>
            <h2 className='text-black-600'>How it works</h2>
            <p>
                Our Ai analyzes your transaction patterns to provide personalized finacial insights.
                It identifies spending trends,suggests budget optimization, and helps you make smarter financial decisions.
            </p>
            <ul className='list-disc pl-5 space-y-5 space-y-2 text-gray-600'>
                <li> Identifies recurring expenses and potential savings</li>
                <li>Highlights unusual spending patterns</li>
                <li>Suggests budget adjusments based on your income</li>
                <li>Provides personalized financial advice</li>
            </ul>
            </div>
        </div>
    );
}