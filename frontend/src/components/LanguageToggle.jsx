function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Language</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => setLanguage('en')}
          className={`neumorphic-btn px-4 py-2 rounded-xl ${
            language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          aria-label="Switch to English"
        >
          English
        </button>
        <button
          onClick={() => setLanguage('am')}
          className={`neumorphic-btn px-4 py-2 rounded-xl ${
            language === 'am' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          aria-label="Switch to Amharic"
        >
          አማርኛ
        </button>
      </div>
    </div>
  )
}

export default LanguageToggle
