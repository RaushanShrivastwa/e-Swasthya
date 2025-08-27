import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const StatsSection = () => {
  const chartCanvasRef = useRef(null);
  const [registeredTotal, setRegisteredTotal] = useState(0);
  const [curedTotal, setCuredTotal] = useState(0);

  // demo data
  const demoLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const registered = [120, 220, 340, 460, 590, 720, 860, 1000, 1150, 1320, 1480, 1700];
  const cured = [30, 90, 150, 240, 320, 420, 560, 660, 820, 940, 1100, 1300];

  // Chart.js setup
  useEffect(() => {
    const ctx = chartCanvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: demoLabels,
        datasets: [
          {
            label: "Registered",
            data: registered,
            tension: 0.35,
            borderColor: "rgba(239,68,68,1)",
            backgroundColor: "rgba(239,68,68,.12)",
            fill: true,
            pointRadius: 3,
          },
          {
            label: "Cured",
            data: cured,
            tension: 0.35,
            borderColor: "rgba(34,197,94,1)",
            backgroundColor: "rgba(34,197,94,.12)",
            fill: true,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: "top" }, tooltip: { mode: "index", intersect: false } },
      },
    });

    return () => chart.destroy();
  }, []);

  // animate counters
  useEffect(() => {
    const totalReg = registered[registered.length - 1];
    const totalCure = cured[cured.length - 1];

    const duration = 900;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setRegisteredTotal(Math.floor(totalReg * eased));
      setCuredTotal(Math.floor(totalCure * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, []);

  const cureRate = registeredTotal === 0 ? 0 : Math.round((curedTotal / registeredTotal) * 100);
  const activeCases = Math.max(0, registeredTotal - curedTotal);

  return (
    <section id="stats" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Chart */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">Registered vs Cured</h4>
                <div className="text-sm text-gray-500 dark:text-gray-400">(Demo Data)</div>
              </div>
              <div className="h-80">
                <canvas
                  ref={chartCanvasRef}
                  className="w-full h-full"
                  aria-label="Chart of Registered vs Cured"
                  role="img"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
              <div className="flex items-center gap-4 mb-4">
                <i className="bi bi-people-fill text-4xl text-red-500" />
                <div>
                  <div className="font-semibold">Total Registered</div>
                  <div className="text-3xl font-bold text-red-500">{registeredTotal.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <i className="bi bi-heart-pulse text-4xl text-green-500" />
                <div>
                  <div className="font-semibold">Total Cured</div>
                  <div className="text-3xl font-bold text-green-500">{curedTotal.toLocaleString()}</div>
                </div>
              </div>

              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-2xl text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Cure Rate</div>
                    <div className="text-2xl font-bold">{isNaN(cureRate) ? "0%" : cureRate + "%"}</div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-2xl text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Active Cases</div>
                    <div className="text-2xl font-bold">{activeCases.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                * Demo values – connect to your API to make these live.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
