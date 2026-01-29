import React from 'react';

const StatusRow = ({ users }) => {
  return (
    <div className="flex overflow-x-auto py-4 bg-black no-scrollbar border-b border-zinc-900">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col items-center mx-3 min-w-[70px]">
          <div className={`p-[2px] rounded-full border-2 ${user.hasNew ? 'border-orange-500 shadow-[0_0_8px_#F57C00]' : 'border-zinc-800'}`}>
            <img src={user.avatar} className="w-14 h-14 rounded-full" alt={user.name} />
          </div>
          <span className="text-white text-[10px] mt-1 italic truncate w-16 text-center">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusRow;
