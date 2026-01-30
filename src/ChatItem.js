import React from 'react';

const ChatItem = ({ name, message, time, unread, online }) => (
  <div className="flex items-center p-4 border-b border-zinc-900 active:bg-zinc-900">
    <div className="relative">
      <div className={`w-14 h-14 rounded-full bg-zinc-800 border-2 ${online ? 'border-orange-500' : 'border-zinc-700'}`} />
      {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-black" />}
    </div>
    <div className="ml-4 flex-1">
      <div className="flex justify-between">
        <h3 className="text-white font-bold">{name}</h3>
        <span className="text-zinc-500 text-xs">{time}</span>
      </div>
      <p className="text-zinc-400 text-sm truncate">{message}</p>
    </div>
    {unread > 0 && (
      <div className="ml-2 bg-orange-500 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold">
        {unread}
      </div>
    )}
  </div>
);

export default ChatItem;
