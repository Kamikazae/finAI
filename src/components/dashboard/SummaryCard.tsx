import React from "react";

interface SummaryCardProps {
    title:string;
    value:number;
    type:'balance' | 'income' | 'expense';
}

export default function SummaryCard({title,value,type}: SummaryCardProps){
    const getColorClass=()=>{
        switch(type){
            case 'income':return 'text-green-600';
            case 'expense': return 'text-red-600';
            default:return 'text-gray-600'
        }
    };
    const getIcon=()=>{
        switch(type){
            case 'income':return '↑'
            case 'expense':return '↓'
            default: return '↔'
        }
    };
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
            {title}
            </h3>
            <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                    ${value.toFixed(2)}
                </span>
                <span className={`text-xl ${getColorClass()}`}>
                    {getIcon()}
                </span>
            </div>
        </div>
    );
}