import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Math Blaster! 🚀</h1>
          <p>A fun and interactive math learning game</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div>
      <p>Welcome to Math Blaster! The game is coming soon.</p>
    </div>
  )
}

export default App
