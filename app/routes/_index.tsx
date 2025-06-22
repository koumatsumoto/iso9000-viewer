/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import data from "../data.json";

export const meta: MetaFunction = () => {
  return [
    { title: "ISO 9000:2015 用語集" },
    { name: "description", content: "ISO 9000:2015 品質マネジメントシステム用語集" },
  ];
};

interface Term {
  id: string;
  term: string;
  definition: string;
  englishTerm?: string;
  notes?: string[];
  examples?: string[];
  remark?: string;
}

export default function Index() {
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTerm(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const closeModal = () => setSelectedTerm(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{data.metadata.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {data.metadata.totalTerms}用語 / {data.metadata.totalCategories}カテゴリ
          </p>
        </header>

        {/* Categories */}
        <div className="space-y-12">
          {data.categories.map((category) => (
            <section key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                {category.id} {category.name}
              </h2>

              {/* Terms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.terms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => setSelectedTerm(term)}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-left w-full"
                  >
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{term.id}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{term.term}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{term.definition}</p>
                    {term.englishTerm && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{term.englishTerm}</p>
                    )}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Modal */}
        {selectedTerm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                closeModal();
              }
            }}
            aria-label="モーダルを閉じる"
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="document"
              tabIndex={-1}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                <div>
                  <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedTerm.term}
                  </h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{selectedTerm.id}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="モーダルを閉じる"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* English Term */}
                {selectedTerm.englishTerm && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">英語表記</h3>
                    <p className="text-gray-700 dark:text-gray-300 italic">{selectedTerm.englishTerm}</p>
                  </div>
                )}

                {/* Definition */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">定義</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedTerm.definition}</p>
                </div>

                {/* Notes */}
                {selectedTerm.notes && selectedTerm.notes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">備考</h3>
                    <ul className="space-y-2">
                      {selectedTerm.notes.map((note, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <span className="text-blue-600 dark:text-blue-400 font-medium mr-2">{index + 1}.</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Examples */}
                {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">例</h3>
                    <ul className="space-y-2">
                      {selectedTerm.examples.map((example, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <span className="text-green-600 dark:text-green-400 font-medium mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Remark */}
                {selectedTerm.remark && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">注記</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{selectedTerm.remark}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
