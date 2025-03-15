
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CHART_DATA } from '@/lib/data';

const TaskChart: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Task Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={CHART_DATA}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="done" stackId="a" fill="#22C55E" />
            <Bar dataKey="inProgress" stackId="a" fill="#3F93FF" />
            <Bar dataKey="onHold" stackId="a" fill="#ef4444" />
            <Bar dataKey="pending" stackId="a" fill="#FFB951" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TaskChart;
