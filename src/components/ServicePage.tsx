import React, { useState, ChangeEvent } from 'react';
import { Upload, FileText, Loader, X, Copy, Check } from 'lucide-react';

interface Line {
    text: string;
}

interface TranslationResponse {
    fullText: string;
    lines?: Line[];
}

const ServicePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [translatedText, setTranslatedText] = useState<string>('');
    const [sentences, setSentences] = useState<Line[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [copiedIndex, setCopiedIndex] = useState<number | 'full' | null>(null);
    const [useIndividualLines, setUseIndividualLines] = useState<boolean>(false);
    
    const validateFile = (file: File): string | null => {
        // Check if the file is an image
        if (!file.type.startsWith('image/')) {
            return 'Please select an image file (PNG, JPG, GIF, etc.).';
        }

        // Check if the file size is within the limit (10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            return 'File size exceeds 10MB. Please choose a smaller file.';
        }

        return null; // File is valid
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const errorMessage = validateFile(file);

            if (errorMessage) {
                alert(errorMessage);
                event.target.value = ''; // Reset the file input
            } else {
                setSelectedFile(file);
            }
        }
    };


    const handleTranslate = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('useIndividualLines', useIndividualLines.toString());

        try {
            const response = await fetch('https://general-tatip-be.tu4rl4.easypanel.host/translate-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to translate image');
            }

            const data: TranslationResponse = await response.json();
            setTranslatedText(data.fullText);
            setSentences(data.lines || []);
        } catch (error) {
            console.error('Error processing file:', error);
            alert('An error occurred while processing the image.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setTranslatedText('');
        setSentences([]);
    };

    const copyToClipboard = (text: string, index: number | 'full') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-2">TATIP</h1>
                            <p className="text-lg sm:text-xl text-indigo-600 font-semibold">Text Analysis and Translation from Image Platform</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm text-gray-600">Created by</p>
                            <p className="text-base sm:text-lg font-semibold text-indigo-700">Beer Do-San</p>
                        </div>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="relative">
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label
                                htmlFor="file-upload"
                                className={`flex items-center justify-center w-full h-40 sm:h-56 rounded-2xl border-3 border-dashed transition-all duration-300 ease-in-out cursor-pointer ${selectedFile
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50'
                                    }`}
                            >
                                {selectedFile ? (
                                    <div className="text-center">
                                        <FileText className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 mb-2 sm:mb-3" />
                                        <p className="text-base sm:text-lg font-medium text-indigo-700">{selectedFile.name}</p>
                                        <p className="text-xs sm:text-sm text-indigo-500 mt-1 sm:mt-2">Click to change file</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-indigo-400 mb-2 sm:mb-3" />
                                        <p className="text-base sm:text-lg font-medium text-indigo-900">Click to upload an image</p>
                                        <p className="text-xs sm:text-sm text-indigo-500 mt-1 sm:mt-2">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )}
                            </label>
                            {selectedFile && (
                                <button
                                    onClick={clearFile}
                                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-1.5 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 shadow-md"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="useIndividualLines"
                                    checked={useIndividualLines}
                                    onChange={(e) => setUseIndividualLines(e.target.checked)}
                                    className="mr-3 h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="useIndividualLines" className="text-base sm:text-lg text-indigo-900 font-medium">
                                    Use Individual Lines
                                </label>
                            </div>
                            <button
                                onClick={handleTranslate}
                                disabled={!selectedFile || isLoading}
                                className="w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-6 flex items-center justify-center text-white bg-indigo-600 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                ) : (
                                    <FileText className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                )}
                                {isLoading ? 'Processing...' : 'Extract and Analyze Text'}
                            </button>
                        </div>
                    </div>

                    {translatedText && (
                        <div className="mt-8 sm:mt-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 sm:mb-6">Extracted Text Analysis</h2>
                            <div className="bg-indigo-50 rounded-2xl p-4 sm:p-8 shadow-inner">
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2 sm:mb-3">Full Text:</h3>
                                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm relative">
                                        <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">{translatedText}</p>
                                        <button
                                            onClick={() => copyToClipboard(translatedText, 'full')}
                                            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                        >
                                            {copiedIndex === 'full' ? (
                                                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {useIndividualLines && sentences.length > 0 && (
                                    <div className="border-t-2 border-indigo-200 pt-4 sm:pt-6">
                                        <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2 sm:mb-3">Individual Lines:</h3>
                                        <ul className="space-y-2 sm:space-y-3">
                                            {sentences.map((line, index) => (
                                                <li key={index} className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                                                    <span className="text-gray-800 text-sm sm:text-base">{line.text}</span>
                                                    <button
                                                        onClick={() => copyToClipboard(line.text, index)}
                                                        className="ml-2 sm:ml-3 p-1.5 sm:p-2 rounded-full text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                                    >
                                                        {copiedIndex === index ? (
                                                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                                                        ) : (
                                                            <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        )}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-4 sm:mt-6 bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                                    <h4 className="text-base sm:text-lg font-semibold text-indigo-900 mb-1 sm:mb-2">Analysis Summary:</h4>
                                    <p className="text-sm sm:text-base text-indigo-700">
                                        Total words: <span className="font-semibold">{translatedText.split(/\s+/).length}</span>
                                    </p>
                                    {useIndividualLines && sentences.length > 0 && (
                                        <p className="text-sm sm:text-base text-indigo-700">
                                            Total lines: <span className="font-semibold">{sentences.length}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicePage;