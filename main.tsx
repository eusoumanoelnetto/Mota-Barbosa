import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Componente de teste simples
const TestApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🚀 Site Funcionando!</h1>
      <p>GitHub Pages está carregando corretamente.</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
      <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
        <h2>Mota Barbosa Serviços</h2>
        <p>Site em desenvolvimento - versão de teste</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<TestApp />);