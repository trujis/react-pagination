import React, { useState } from 'react';
import { Pagination } from '../src';

const mockData = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const currentData = mockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            React Pagination Component
          </h1>
          <p className="text-gray-600">
            Usage examples for the pagination component
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2>Total Pages: {totalPages}</h2>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Example 1: Complete Pagination with Data
          </h2>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, mockData.length)} of {mockData.length} items
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentData.map(item => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="justify-center"
          />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Example 2: Simple Pagination
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Without first/last page buttons
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showFirstLast={false}
            className="justify-center"
          />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Example 3: Custom Styles
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            With custom CSS classes
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="justify-center"
            buttonClassName="rounded-full px-4 py-2 mx-1 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium"
            activeClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
            disabledClassName="opacity-40 cursor-not-allowed hover:bg-white hover:border-gray-300"
            previousLabel="◄"
            nextLabel="►"
            firstLabel="◄◄"
            lastLabel="►►"
          />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Example 4: Custom Rendering
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            With custom render function
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={15}
            onPageChange={setCurrentPage}
            className="justify-center"
            renderButton={({ isActive, isDisabled, onClick, children }) => (
              <button
                onClick={onClick}
                disabled={isDisabled}
                className={`
                  px-4 py-2 mx-1 rounded-lg font-semibold
                  transition-all duration-300 transform
                  ${isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110 shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }
                  ${isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-md hover:-translate-y-0.5'
                  }
                `}
              >
                {children}
              </button>
            )}
          />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Example 5: Custom Labels
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            With custom text labels
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            className="justify-center"
            previousLabel="Prev"
            nextLabel="Next"
            firstLabel="Start"
            lastLabel="End"
          />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Component Features
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Fully typed with TypeScript</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Customizable styles with TailwindCSS</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Smart calculation of visible pages</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Accessible with ARIA labels</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Support for custom rendering</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>No external dependencies</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Lightweight and performant</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
