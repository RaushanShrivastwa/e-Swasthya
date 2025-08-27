import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as THREE from "three";
import StatsSection from "./StatsSection";

export default function LandingPage() {
  const threeContainerRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const [registeredTotal, setRegisteredTotal] = useState(0);
  const [curedTotal, setCuredTotal] = useState(0);

  // demo data
  const demoLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const registered = [120, 220, 340, 460, 590, 720, 860, 1000, 1150, 1320, 1480, 1700];
  const cured = [30, 90, 150, 240, 320, 420, 560, 660, 820, 940, 1100, 1300];

  // Three.js setup
  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    // TorusKnot
    const geometry = new THREE.TorusKnotGeometry(0.9, 0.28, 180, 32);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.25, color: 0x3b82f6 });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Particles
    const pGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const pMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1e293b, metalness: 0.3, roughness: 0.7 });
    for (let i = 0; i < 60; i++) {
      const p = new THREE.Mesh(pGeo, pMat);
      p.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
      scene.add(p);
    }

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.01;
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.006;
      knot.position.y = Math.sin(t) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

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
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* HERO */}
      <header className="relative min-h-[86vh] grid place-items-center overflow-hidden bg-gradient-to-b from-[#eef6ff] to-white dark:from-gray-800 dark:to-gray-950">
        <div ref={threeContainerRef} className="absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl w-full p-4 md:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            <div className="col-span-1">
              <div className="p-4 sm:p-6 md:p-8 bg-white/85 dark:bg-gray-900/80 backdrop-blur-md border border-gray-900/10 dark:border-gray-100/10 shadow-xl rounded-2xl">
                <span className="bg-[#eaf2ff] dark:bg-gray-800 text-[#106eea] dark:text-blue-400 border border-[#d5e6ff] dark:border-gray-700 rounded-full px-3 py-1 inline-block mb-3 text-sm">
                  Digital Health Record System for Migrant Workers
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                  One ID. Portable Records. Better Care.
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Secure, multilingual, and accessible health records for migrant workers. Built for doctors and
                  departments to deliver care faster.
                </p>
                <div className="flex gap-2">
                  <a
                    href="#signin"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    <i className="bi bi-box-arrow-in-right mr-2" />
                    Sign in
                  </a>
                  <a
                    href="#stats"
                    className="bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    View stats
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-800 p-4 text-center rounded-xl shadow-md">
                    <div className="text-red-500 text-3xl sm:text-4xl font-extrabold">
                      {registeredTotal.toLocaleString()}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Registered</div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-800 p-4 text-center rounded-xl shadow-md">
                    <div className="text-green-500 text-3xl sm:text-4xl font-extrabold">
                      {curedTotal.toLocaleString()}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Cured</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <i className="bi bi-shield-lock text-3xl text-blue-600" />
                      <div>
                        <div className="font-semibold">Privacy-first</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Role-based access & consent-driven sharing
                        </div>
                      </div>
                    </div>
                    <hr className="my-3 border-gray-200 dark:border-gray-700" />
                    <div className="flex items-center gap-3">
                      <i className="bi bi-translate text-3xl text-blue-600" />
                      <div>
                        <div className="font-semibold">Multilingual</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Hindi • Bengali • Tamil • Malayalam • English
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <div className="col-span-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold">What you can do</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Scan a QR health ID, add visit records, update vaccinations, and view analytics. Built with React,
                Tailwind CSS, Chart.js & Three.js for a fast, responsive web experience.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-qr-code text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">QR Health Card</h5>
                <p className="text-gray-600 dark:text-gray-300">
                  Unique Migrant Health ID with quick access to records.
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-journal-medical text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">Visit & Treatment Logs</h5>
                <p className="text-gray-600 dark:text-gray-300">
                  Add diagnoses, medications, referrals, and vaccinations.
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-graph-up-arrow text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">Insights</h5>
                <p className="text-gray-600 dark:text-gray-300">
                  Track registered vs cured trends with simple analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & CHART */}
      <StatsSection />
      
    </div>
  );
}
