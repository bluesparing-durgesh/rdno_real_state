"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { DollarSign, Percent, Calendar, Calculator } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface MortgageCalcProps {
  initialPrice?: number;
}

export function MortgageCalc({ initialPrice = 18500000 }: MortgageCalcProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(initialPrice * 0.2); // 20% default
  const [interestRate, setInterestRate] = useState(4.5); // 4.5% default
  const [term, setTerm] = useState(30); // 30 years default
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalInterest, setPrincipalInterest] = useState(0);

  // Property tax estimated at 1.2% annually
  const propertyTax = Math.round((price * 0.012) / 12);
  // Home insurance estimated at 0.15% annually
  const homeInsurance = Math.round((price * 0.0015) / 12);
  // HOA dues estimated monthly
  const hoaDues = 450;

  useEffect(() => {
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalPayments = term * 12;

    if (monthlyRate === 0) {
      const pi = loanAmount / totalPayments;
      setPrincipalInterest(Math.round(pi));
      setMonthlyPayment(Math.round(pi + propertyTax + homeInsurance + hoaDues));
      return;
    }

    const pi =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    setPrincipalInterest(Math.round(pi));
    setMonthlyPayment(Math.round(pi + propertyTax + homeInsurance + hoaDues));
  }, [price, downPayment, interestRate, term, propertyTax, homeInsurance]);

  const chartData = [
    { name: "Principal & Interest", value: principalInterest, color: "#0F766E" }, // secondary
    { name: "Property Taxes", value: propertyTax, color: "#D4AF37" }, // accent
    { name: "Home Insurance", value: homeInsurance, color: "#111827" }, // primary
    { name: "HOA Dues", value: hoaDues, color: "#6B7280" }, // gray
  ];

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-[#0F172A]/40 border border-black/[0.06] dark:border-white/[0.06] shadow-xl">
      <div className="flex items-center gap-2 mb-8">
        <Calculator className="text-secondary dark:text-accent" size={20} />
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          Mortgage Advisory Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Form */}
        <div className="space-y-6">
          {/* Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
              <span className="uppercase tracking-wider">Asset Valuation</span>
              <span className="text-zinc-900 dark:text-white font-bold">{formatPrice(price)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={price}
              onChange={(e) => {
                const newPrice = Number(e.target.value);
                setPrice(newPrice);
                setDownPayment(newPrice * 0.2); // Maintain 20% ratio initially
              }}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
              <span className="uppercase tracking-wider">Down Payment (20%)</span>
              <span className="text-zinc-900 dark:text-white font-bold">
                {formatPrice(downPayment)} ({Math.round((downPayment / price) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={price * 0.9}
              step={50000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
              <span className="uppercase tracking-wider">Interest Rate</span>
              <span className="text-zinc-900 dark:text-white font-bold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary dark:accent-accent"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Loan Term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    term === t
                      ? "bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white"
                      : "bg-transparent border-black/10 dark:border-white/10 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {t} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Chart & Totals */}
        <div className="flex flex-col items-center justify-center p-6 bg-zinc-50/50 dark:bg-white/[0.01] rounded-3xl border border-black/[0.04] dark:border-white/[0.04]">
          <div className="h-44 w-full relative flex items-center justify-center">
            {/* Center label */}
            <div className="absolute text-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                Monthly Est
              </p>
              <p className="text-2xl font-black tracking-tight text-secondary dark:text-accent">
                {formatPrice(monthlyPayment)}
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [formatPrice(value), ""]}
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "12px",
                    border: "none",
                    color: "white",
                    fontSize: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown labels */}
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            {chartData.map((item) => (
              <div key={item.name} className="flex gap-2 items-start">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-[10px] text-zinc-400 font-medium leading-none">{item.name}</p>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white mt-1">
                    {formatPrice(item.value)}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
