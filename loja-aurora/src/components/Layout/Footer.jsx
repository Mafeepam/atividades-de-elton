import './Layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Atividade React · Engenharia de Software · UCSAL · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
