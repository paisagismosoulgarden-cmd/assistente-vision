export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Página de Teste</h1>
      <p>Se você está vendo isto, o React está funcionando!</p>
      <button onClick={() => alert('Funcionando!')}>Clique para testar</button>
    </div>
  );
}