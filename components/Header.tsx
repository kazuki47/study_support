export function Header() {
  return (
    <header className = "h-16 flex shadow-md bg-white p-4">
      <h1 className = "text-2xl font-bold">StudySupport</h1>
      <nav className = "fixed right-0">
        <ul className = "flex space-x-8 mr-8 text-xl font-bold">
          <li><a href="/dashboard">アプリ</a></li>
        </ul>
      </nav>
    </header>
  );
}