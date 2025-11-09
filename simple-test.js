// Teste super simples sem JSX
console.log('🚀 Script carregado!');

const root = document.getElementById('root');
if (root) {
  root.innerHTML = `
    <div style="
      padding: 20px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
    ">
      <h1>🎉 Site Funcionando!</h1>
      <h2>Mota Barbosa Serviços</h2>
      <p>GitHub Pages está carregando corretamente!</p>
      <p>Timestamp: ${new Date().toLocaleString()}</p>
      <div style="
        margin-top: 20px; 
        padding: 20px; 
        background: rgba(255,255,255,0.2); 
        border-radius: 10px;
        display: inline-block;
      ">
        <h3>✅ Diagnóstico</h3>
        <p>JavaScript executando normalmente</p>
        <p>DOM manipulation funcionando</p>
        <p>Build process OK</p>
      </div>
    </div>
  `;
  console.log('✅ DOM atualizado com sucesso!');
} else {
  console.error('❌ Elemento root não encontrado!');
  document.body.innerHTML = '<h1 style="color: red; padding: 20px;">ERRO: Elemento root não encontrado!</h1>';
}