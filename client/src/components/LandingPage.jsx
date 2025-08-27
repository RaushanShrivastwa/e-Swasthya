// E-Swastya landing page initial code:
import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import * as THREE from "three";
// import CustomNavbar from "./NavBar";

// Full landing page as a single React component.
// Drop this file into your React app (e.g. src/components/LandingPage.jsx)
// Install dependencies first: npm i chart.js three tailwindcss

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

    // TorusKnot (stylized emblem)
    const geometry = new THREE.TorusKnotGeometry(0.9, 0.28, 180, 32);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.25, color: 0x3b82f6 });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Particles
    const pGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const pMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x1e293b, metalness: .3, roughness: .7 });
    const particles = [];
    for (let i = 0; i < 60; i++) {
      const p = new THREE.Mesh(pGeo, pMat);
      p.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
      scene.add(p);
      particles.push(p);
    }

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.01;
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.006;
      knot.position.y = Math.sin(t) * 0.06;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      // dispose objects
      renderer.dispose();
      container.removeChild(renderer.domElement);
    }
  }, []);

  // Chart.js setup
  useEffect(() => {
    const ctx = chartCanvasRef.current?.getContext('2d');
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: demoLabels,
        datasets: [
          {
            label: 'Registered',
            data: registered,
            tension: 0.35,
            borderColor: 'rgba(239,68,68,1)',
            backgroundColor: 'rgba(239,68,68,.12)',
            fill: true,
            pointRadius: 3
          },
          {
            label: 'Cured',
            data: cured,
            tension: 0.35,
            borderColor: 'rgba(34,197,94,1)',
            backgroundColor: 'rgba(34,197,94,.12)',
            fill: true,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } }
      }
    });

    return () => chart.destroy();
  }, []);

  // animate counters (simple)
  useEffect(() => {
    const totalReg = registered[registered.length - 1];
    const totalCure = cured[cured.length - 1];

    // animate to value
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
    <div className="bg-white text-gray-900 font-sans">
     

      {/* HERO */}
      <header className="relative min-h-[86vh] grid place-items-center overflow-hidden bg-gradient-to-b from-[#eef6ff] to-white">
        <div ref={threeContainerRef} className="absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl w-full p-4 md:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            <div className="col-span-1">
              <div className="p-4 sm:p-6 md:p-8 bg-white/85 backdrop-blur-md border border-gray-900/10 shadow-xl rounded-2xl">
                <span className="bg-[#eaf2ff] text-[#106eea] border border-[#d5e6ff] rounded-full px-3 py-1 inline-block mb-3 text-sm">Digital Health Record System for Migrant Workers</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">One ID. Portable Records. Better Care.</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6">Secure, multilingual, and accessible health records for migrant workers. Built for doctors and departments to deliver care faster.</p>
                <div className="flex gap-2">
                  <a href="#signin" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                    <i className="bi bi-box-arrow-in-right mr-2" />Sign in
                  </a>
                  <a href="#stats" className="bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors">View stats</a>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1">
                  <div className="bg-white p-4 text-center rounded-xl shadow-md">
                    <div className="text-red-500 text-3xl sm:text-4xl font-extrabold">{registeredTotal.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Registered</div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="bg-white p-4 text-center rounded-xl shadow-md">
                    <div className="text-green-500 text-3xl sm:text-4xl font-extrabold">{curedTotal.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Cured</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <i className="bi bi-shield-lock text-3xl text-blue-600" />
                      <div>
                        <div className="font-semibold">Privacy-first</div>
                        <div className="text-gray-500 text-sm">Role-based access & consent-driven sharing</div>
                      </div>
                    </div>
                    <hr className="my-3 border-gray-200" />
                    <div className="flex items-center gap-3">
                      <i className="bi bi-translate text-3xl text-blue-600" />
                      <div>
                        <div className="font-semibold">Multilingual</div>
                        <div className="text-gray-500 text-sm">Hindi • Bengali • Tamil • Malayalam • English</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      ---
      {/* FEATURES */}
      <section id="features" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <div className="col-span-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold">What you can do</h2>
              <p className="text-gray-600 mt-2">Scan a QR health ID, add visit records, update vaccinations, and view analytics. Built with React, Tailwind CSS, Chart.js & Three.js for a fast, responsive web experience.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-qr-code text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">QR Health Card</h5>
                <p className="text-gray-600">Unique Migrant Health ID with quick access to records.</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-journal-medical text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">Visit & Treatment Logs</h5>
                <p className="text-gray-600">Add diagnoses, medications, referrals, and vaccinations.</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
                <i className="bi bi-graph-up-arrow text-5xl mb-4 text-blue-600" />
                <h5 className="font-bold text-xl mb-2">Insights</h5>
                <p className="text-gray-600">Track registered vs cured trends with simple analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      ---
      {/* STATS & CHART */}
      <section id="stats" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">Registered vs Cured</h4>
                  <div className="text-sm text-gray-500">(Demo Data)</div>
                </div>
                <div className="h-80">
                  <canvas ref={chartCanvasRef} className="w-full h-full" aria-label="Chart of Registered vs Cured" role="img" />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
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

                <hr className="my-4 border-gray-200" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="p-4 border border-gray-200 rounded-2xl text-center">
                      <div className="text-sm text-gray-500">Cure Rate</div>
                      <div className="text-2xl font-bold">{isNaN(cureRate) ? '0%' : cureRate + '%'}</div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="p-4 border border-gray-200 rounded-2xl text-center">
                      <div className="text-sm text-gray-500">Active Cases</div>
                      <div className="text-2xl font-bold">{activeCases.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-3">* Demo values – connect to your API to make these live.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ---
      {/* SIGN-IN */}
      {/* <section id="signin" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <div className="col-span-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Sign in</h2>
              <p className="text-gray-600">Choose your role to continue.</p>
            </div>
          </div> */}
          {/* <div className="grid md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full cursor-pointer" data-bs-toggle="modal" data-bs-target="#doctorModal">
                <div className="flex items-center gap-4">
                  <i className="bi bi-person-vcard text-5xl text-blue-600" />
                  <div>
                    <h5 className="text-xl font-bold mb-1">Doctor / Health Worker</h5>
                    <div className="text-gray-600 text-sm">Access dashboard, add visit records, update vaccinations</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">Sign in as Doctor</button>
                  <button className="bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors">More info</button>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md h-full cursor-pointer" data-bs-toggle="modal" data-bs-target="#migrantModal">
                <div className="flex items-center gap-4">
                  <i className="bi bi-briefcase-fill text-5xl text-green-600" />
                  <div>
                    <h5 className="text-xl font-bold mb-1">Migrant Worker</h5>
                    <div className="text-gray-600 text-sm">View your health card and visit history</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">Sign in as Worker</button>
                  <button className="bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors">More info</button>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div>
      </section> */}
      ---
      {/* FOOTER */}
      <footer className="py-12 mt-8 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <i className="bi bi-heart-pulse-fill text-red-500 text-2xl" />
                <strong className="text-xl">Migrant Health</strong>
              </div>
              <p className="text-sm mb-1">© {new Date().getFullYear()} Migrant Health. All rights reserved.</p>
              <p className="text-sm mb-0">Built with React, Tailwind CSS, Chart.js & Three.js.</p>
            </div>
            <div className="col-span-1 text-left md:text-right">
              <a href="#features" className="mr-4 hover:text-white transition-colors">Features</a>
              <a href="#stats" className="mr-4 hover:text-white transition-colors">Stats</a>
              <a href="#signin" className="hover:text-white transition-colors">Sign in</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Doctor Modal */}
      
    </div>
  );
}