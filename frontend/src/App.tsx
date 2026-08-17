import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [backendMessage, setBackendMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8080/api/test')
      setBackendMessage(response.data)
    } catch (error) {
      setBackendMessage('Lỗi kết nối tới Backend! Hãy chắc chắn Spring Boot đang chạy ở cổng 8080.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white shadow-sm border-b p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">FPMS</h1>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link></li>
            <li><Link to="/pitches" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pitches</Link></li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto p-6 mt-8 bg-white rounded-xl shadow-sm border border-slate-100">
        <Routes>
          <Route path="/" element={
            <div className="py-8 text-center flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-4 text-slate-800">Welcome to Football Pitch Management</h2>
              <p className="text-lg text-slate-500 mb-8">Find and book the best mini football pitches near you instantly.</p>
              
              <div className="flex space-x-4 mb-8">
                <Link to="/pitches" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
                  Browse Pitches
                </Link>
                <button 
                  onClick={testConnection}
                  disabled={loading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-md disabled:bg-emerald-400"
                >
                  {loading ? 'Đang thử kết nối...' : 'Test Backend Connection'}
                </button>
              </div>

              {backendMessage && (
                <div className={`p-4 rounded-lg font-medium shadow-sm ${backendMessage.includes('Lỗi') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                  {backendMessage}
                </div>
              )}
            </div>
          } />
          <Route path="/pitches" element={
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Available Pitches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for pitches */}
                <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-slate-200 h-40 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-lg">Pitch A (5v5)</h3>
                  <p className="text-slate-500 text-sm mb-4">Downtown Arena</p>
                  <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">Book Now</button>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
