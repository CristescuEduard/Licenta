import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./Statistics.css";
var data = [];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`} - {data[index].name}
        </text>
    );
};

function Statistics() {
    const [products, setProducts] = useState({});
    var sumaBauturi = 0;
    var sumaDesert = 0;
    var sumaGarnituri = 0;
    var sumaMainCourse = 0;
    var sumaGrill = 0;
    var sumaVin = 0;
    var sumaBere = 0;
    useEffect(() => {
        try {
            axios.get("http://localhost:8080/getProducts").then((res) => {
                const productsDB = res.data;
                setProducts(productsDB);
            });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    Array.from(products).forEach((product) => {
        if (product.subCategory === "bauturi")
            sumaBauturi += product.price * product.totalQuantity;
        else if (product.subCategory === "Garnituri")
            sumaGarnituri += product.price * product.totalQuantity;
        else if (product.subCategory === "Desert")
            sumaDesert += product.price * product.totalQuantity;
    });

    data = [
        { name: "Bauturi", value: sumaBauturi },
        { name: "Desert", value: sumaDesert },
        { name: "Garnituri", value: sumaGarnituri },
    ];

    data.copyWithin(data);

    return (
        <div className="class">
            <PieChart height={500} width={500}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default Statistics;
