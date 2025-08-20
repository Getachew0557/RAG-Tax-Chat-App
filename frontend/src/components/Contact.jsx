
function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl fade-in">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-4">
        Have questions or need support? Reach out to our team for assistance with the Tax Chat application.
      </p>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Email</h3>
          <p className="text-gray-700">support@taxchatapp.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
          <p className="text-gray-700">+251-123-456-789</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          <p className="text-gray-700">Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <p className="text-gray-600 mt-4 italic">
        Note: Contact form submission is not supported in this version.
      </p>
    </div>
  )
}

export default Contact
