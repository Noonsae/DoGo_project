// //사업자답변
// 'use client';
// import { useState } from 'react';

// const InquiryReply = ({ inquiryId, onReplySubmit }) => {
//   const [reply, setReply] = useState('');

//   const handleSubmit = () => {
//     onReplySubmit(inquiryId, reply);
//     setReply('');
//   };
//   //커밋용
//   return (
//     <div className="mt-4">
//       <textarea
//         placeholder="답변을 입력하세요"
//         value={reply}
//         onChange={(e) => setReply(e.target.value)}
//         className="border p-2 rounded w-full"
//       />

//       <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-2">
//         답변 등록
//       </button>
//     </div>
//   );
// };

// export default InquiryReply;
import React from 'react';

const InquiryReply = () => {
  return <div>InquiryReply</div>;
};

export default InquiryReply;
