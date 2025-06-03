export function Header() {
  return (
    <header className = "fixed top-0 left-0 w-full h-16 flex shadow-md bg-white p-4 z-50">
      <h1 className = "text-2xl font-bold">StudySupport</h1>
      <nav className = "fixed right-0">
        <ul className = "flex space-x-8 mr-8 text-xl font-bold">
          <li><a href="/dashboard">アプリ</a></li>
        </ul>
      </nav>
    </header>
  );
}