export default function ServiceCard({ title, description, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="p-6">
        <div className="w-12 h-12 bg-primary-main bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-main" />
        </div>
        <h3 className="text-xl font-semibold text-secondary-main mb-2">
          {title}
        </h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
