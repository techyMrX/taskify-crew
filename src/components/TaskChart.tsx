
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_DATA } from '@/lib/data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-sm font-medium">{label}</p>
        <div className="mt-2">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="mr-2">{entry.name}:</span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const TaskChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[350px]">
      <h3 className="text-lg font-medium text-gray-800 mb-5">Last 6 Days Task Summary</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={CHART_DATA}
          margin={{
            top: 5,
            right: 5,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          <Bar name="Done" dataKey="done" stackId="a" fill="#22C55E" radius={[4, 4, 0, 0]} />
          <Bar name="In Progress" dataKey="inProgress" stackId="a" fill="#3F93FF" radius={[4, 4, 0, 0]} />
          <Bar name="On Hold" dataKey="onHold" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar name="Pending" dataKey="pending" stackId="a" fill="#FFB951" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
