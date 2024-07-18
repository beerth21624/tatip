import React from 'react';
import { FileText, Globe, Zap, Check } from 'lucide-react';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-start p-8 bg-gray-900 rounded-3xl transition-all duration-300 hover:bg-gray-800">
        <div className="p-3 bg-gray-800 rounded-2xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
);

interface PricingTierProps {
    title: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, price, features, isPopular = false }) => (
    <div className={`flex flex-col p-8 bg-gray-900 rounded-3xl ${isPopular ? 'ring-2 ring-indigo-500' : ''}`}>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
            ${price}<span className="text-xl font-normal text-gray-400">/month</span>
        </p>
        <ul className="mb-8 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-indigo-400 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition duration-300 ease-in-out ${isPopular
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}>
            Choose Plan
        </button>
    </div>
);

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <header className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 mb-6">
                    TATIP
                </h1>
                <p className="text-3xl text-gray-300 mb-8">Text Analysis and Translation from Image Platform</p>
                <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
                    Extract, analyze, and translate text from images with unparalleled accuracy using our cutting-edge AI technology.
                </p>
                <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold py-4 px-10 rounded-full text-lg hover:from-indigo-600 hover:to-cyan-600 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
                    Try TATIP for Free
                </button>
            </header>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-24">
                <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-16">
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <Feature
                        icon={<FileText className="h-8 w-8 text-indigo-400" />}
                        title="Advanced OCR"
                        description="Extract text from images with high accuracy using cutting-edge OCR technology"
                    />
                    <Feature
                        icon={<Globe className="h-8 w-8 text-indigo-400" />}
                        title="Multi-language Support"
                        description="Analyze and translate text in over 100 languages with ease"
                    />
                    <Feature
                        icon={<Zap className="h-8 w-8 text-indigo-400" />}
                        title="Fast Processing"
                        description="Get results in seconds, no matter the complexity of your image"
                    />
                </div>
            </section>

            {/* Pricing Section */}
            <section className="container mx-auto px-4 py-24">
                <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-16">
                    Pricing Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingTier
                        title="Basic"
                        price={9.99}
                        features={[
                            "100 images/month",
                            "Basic OCR",
                            "5 languages",
                            "Email support"
                        ]}
                    />
                    <PricingTier
                        title="Pro"
                        price={29.99}
                        features={[
                            "1000 images/month",
                            "Advanced OCR",
                            "50 languages",
                            "Priority support"
                        ]}
                        isPopular={true}
                    />
                    <PricingTier
                        title="Enterprise"
                        price={99.99}
                        features={[
                            "Unlimited images",
                            "Premium OCR",
                            "All languages",
                            "24/7 dedicated support"
                        ]}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Join thousands of satisfied users and revolutionize your text extraction workflow today.
                    </p>
                    <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold py-4 px-10 rounded-full text-lg hover:from-indigo-600 hover:to-cyan-600 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
                        Start Your Free Trial
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2024 TATIP. All rights reserved. Created by Beer Do-San</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;