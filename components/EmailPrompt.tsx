import { useState } from 'react';

export default function EmailPrompt() {
  const [email, setEmail] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : ''
  );
  const [show, setShow] = useState(() =>
    typeof window !== 'undefined' ? !localStorage.getItem('userEmail') : false
  );

  const handleSave = () => {
    if (email && email.includes('@')) {
      localStorage.setItem('userEmail', email);
      setShow(false);
    } else {
      alert('Please enter a valid email.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Enter your email</h2>
        <p className="mb-4 text-sm text-gray-600">
          We will notify the relevant team when you submit feedback.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}