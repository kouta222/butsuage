import React from "react";

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#f2f0e7]">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center">
          <div className="text-black text-7xl leading-[150%] tracking-[0.04em] text-center">404</div>
          <div className="text-4xl leading-[150%] tracking-[0.04em] text-center">ページが見つかりません</div>
        </div>
        <div className="text-black text-lg leading-[180%] tracking-[0.04em] text-center">お探しのページは存在しないか、URLが間違っている可能性があります。</div>
      </div>
    </div>
  );
};

export default NotFound;
