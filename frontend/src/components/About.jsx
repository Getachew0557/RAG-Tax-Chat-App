
function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl fade-in">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">About Tax Chat</h2>
      <p className="text-gray-700 mb-4">
        Tax Chat is a multilingual chatbot designed to assist users in navigating Ethiopia's legal taxing system. Supporting both Amharic and English, it leverages Retrieval-Augmented Generation (RAG) technology to provide accurate and relevant answers to your tax-related questions.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to make tax information accessible and user-friendly, empowering individuals and businesses to understand their tax obligations with ease.
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Multilingual support for Amharic and English</li>
        <li>Powered by advanced AI and a comprehensive tax knowledge base</li>
        <li>Designed for both individuals and businesses</li>
      </ul>
    </div>
  )
}

export default About
