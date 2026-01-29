import React from 'react';

const LoginScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
    <h1 className="text-5xl font-black italic text-orange-500 mb-2">Clintzy</h1>
    <p className="text-zinc-500 text-xs tracking-widest uppercase mb-12">Next Gen Messaging</p>
    <div className="w-full space-y-4">
      <input type="text" placeholder="Phone Number" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-orange-500" />
      <button className="w-full bg-orange-500 p-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20">Get Started</button>
    </div>
  </div>
);

export default LoginScreen;
