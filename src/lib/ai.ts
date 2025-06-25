export const categorizetransaction=async(description:string)=>{
    try{
        const response=await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
            {
                method: 'POST',
                headers:{
                    'Authorization':`Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    inputs:description,
                    parameters:{
                        candidate_labels:[
                              'groceries', 'dining', 'entertainment', 
                              'utilities', 'transportation', 'shopping',
                              'salary', 'freelance', 'investment',
                              'rent', 'mortgage', 'insurance'
                        ]
                    }
                }),
            }
        );
        const data=await response.json();
        return data.labels[0] || 'Uncategorized';
    } catch(error){
        console.log('Ai categorization failed',error);
        return 'Categorized'
    }
};

export const generateFinancialInsights=async(transactions:any[])=>{
    try{
        //formating the data for ai response limiting to 20 transactions
        const transactionSummary=transactions
        .slice(0,20) //limiting to 20 transactions
        .map(t => `${new Date(t.DateTime).toISOString().split('T')[0]}: ${t.description} - $${t.amount} (${t.type})`)
        .join('\n');
        const prompt=`Analyze these financial transactions and provide personalized insights and recommendations:
    
    Transactions:
    ${transactionSummary}
    
    Key insights:
    `;
   const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    inputs: prompt,
    parameters: {
      max_new_tokens: 300,
      temperature: 0.7
    }
  })
});

;      
    const data=await response.json()
    return data[0].generated_text || "No insights generated.try adding more transactions."
    } catch(error){
        console.log('Ai insights generation failed:',error);
        return 'Failed to generated insights.Please try again later'
    }
};