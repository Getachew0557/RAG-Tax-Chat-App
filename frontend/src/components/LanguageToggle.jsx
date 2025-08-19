
function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-lg ${
          language === 'en' ? 'bg-white text-blue-600' : 'bg-blue-800 text-white'
        } hover:bg-white hover:text-blue-600 transition`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('am')}
        className={`px-3 py-1 rounded-lg ${
          language === 'am' ? 'bg-white text-blue-600' : 'bg-blue-800 text-white'
        } hover:bg-white hover:text-blue-600 transition`}
      >
        አማርኛ
      </button>
    </div>
  )
}

export default LanguageToggle
