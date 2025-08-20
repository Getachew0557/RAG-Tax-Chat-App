function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Theme</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => setTheme('light')}
          className={`neumorphic-btn px-4 py-2 rounded-xl ${
            theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          aria-label="Switch to light theme"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`neumorphic-btn px-4 py-2 rounded-xl ${
            theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          aria-label="Switch to dark theme"
        >
          Dark
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
