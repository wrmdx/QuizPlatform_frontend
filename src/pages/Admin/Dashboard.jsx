import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import {
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetUsersTotalByTypeQuery } from "@/features/stats/statsApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";

export default function Dashboard() {
 const { data: stats = {}, isLoading, isError } = useGetUsersTotalByTypeQuery();

 let currentDate = new Date().toJSON().slice(0, 10);
 const chartData = [
  { type: "dev", count: stats.dev, fill: "hsl(var(--chart-1))" },
  { type: "manager", count: stats.manager, fill: "hsl(var(--chart-2))" },
  { type: "admin", count: stats.admin, fill: "hsl(var(--chart-3))" },
 ];

 const totalUsers =
     (stats.dev || 0) + (stats.manager || 0) + (stats.admin || 0);

 const chartConfig = {
  visitors: {
   label: "Total Users",
  },
  dev: {
   label: "Developers",
   color: "hsl(var(--chart-1))",
  },
  manager: {
   label: "Managers",
   color: "hsl(var(--chart-2))",
  },
  admin: {
   label: "Admins",
   color: "hsl(var(--chart-3))",
  },
 };

 return (

     <Card className="flex flex-col w-screen">
      <CardHeader className="items-center pb-0">
       <CardTitle>Pie Chart - Users by Role</CardTitle>
       <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
         {isLoading ? (
             <div className="flex w-full justify-center items-center">
                 <Spinner />
             </div>
         ) : isError ? (
             <div className="text-red-500">Failed to load Data.</div>
         ) : (
      <CardContent className="flex-1 flex pb-0 justify-center items-center">
          <ChartContainer
              config={chartConfig}
              className="mx-auto w-full max-h-[250px]"
          >
             <PieChart>
             <ChartTooltip
             cursor={false}
             content={<ChartTooltipContent hideLabel />}
             />
                    <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="type"
                    innerRadius={60}
                    strokeWidth={5}
                    >
                          <Label
                              content={({ viewBox }) => {
                               if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                     <tspan
                                         x={viewBox.cx}
                                         y={viewBox.cy}
                                         className="fill-foreground text-3xl font-bold"
                                     >
                                      {totalUsers.toLocaleString()}
                                     </tspan>
                                     <tspan
                                         x={viewBox.cx}
                                         y={(viewBox.cy || 0) + 24}
                                         className="fill-muted-foreground"
                                     >
                                      Users
                                     </tspan>
                                    </text>
                                );
                               }
                               return null;
                              }}
                          />
                    </Pie>
             </PieChart>
          </ChartContainer>
      </CardContent>
             )}
      <CardFooter className="flex-col gap-2 text-sm">
       <div className="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
       </div>
       <div className="leading-none text-muted-foreground">
        Showing total users for the last 6 months
       </div>
      </CardFooter>
     </Card>
 );
}
