import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "John Smith",
    exp: 17,
    // amt: 2400,
  },
  {
    name: "Mohamed Naif",
    exp: 15,
    // amt: 2210,
  },
  {
    name: "kathryn murphy",
    exp: 13,
    // amt: 2290,
  },
  {
    name: "arlene McCoy",
    exp: 10,
    // amt: 2000,
  },
  {
    name: "Hanan abdulaha",
    exp: 5,
    // amt: 2181,
  },
];


function Chart() {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          // width={700}
          // height={250}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 10,
          }}
          barSize={15}
        >
          <defs>
            {/* Define gradient */}
            <linearGradient id="exp-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9E79DA" stopOpacity={1} />
              <stop offset="95%" stopColor="#74AAE5" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid />

          <XAxis
            dataKey="name"
            interval={0} // Show all labels
            textAnchor="middle" // Adjust text alignment
            dy={5} // Adjust label position vertically
            style={{ fontSize: "12px" }} // Adjust font size here
            axisLine={false} // Optional: remove axis line
            className="capitalize"
          />
          <YAxis
            axisLine={false} // Optional: remove axis line
          />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Bar dataKey="exp" fill="url(#exp-gradient)" radius={10}>
            <LabelList
              dataKey="exp"
              position="right" // Adjust label position as needed
              content={(props) => {
                const { x, y, value } = props;
                return (
                  <>
                  <text
                    x={x + 20} // Adjust the x position for label spacing
                    y={y} // Adjust the y position for vertical centering
                    dy={20} // Adjust dy for vertical alignment if needed
                    fontSize={14} // Custom font size
                    fill="#000" // Custom fill color
                    textAnchor="start" // Text alignment
                  >
                    +{value}
                  </text>
                  </>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
