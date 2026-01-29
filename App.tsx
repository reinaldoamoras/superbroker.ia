
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AdCreator } from './pages/AdCreator';
import { Chat } from './pages/Chat';
import { MarketSpy } from './pages/MarketSpy';
import { Financial } from './pages/Financial';
import { Contracts } from './pages/Contracts';
import { Integrations } from './pages/Integrations';
import { Training } from './pages/Training';
import { News } from './pages/News';
import { TeamManagement } from './pages/TeamManagement';
import { ReferralProgram } from './pages/ReferralProgram';
import { Accelerator } from './pages/Accelerator';
import { Property, Campaign, User, UserRole, AdCreationContext, CompetitorAnalysis } from './types';

const MOCK_BROKER_USER: User = {
  id: 'u1',
  name: 'Roberto Corretor',
  email: 'roberto@imob.com',
  role: UserRole.BROKER,
  credits: 2500,
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  trustScore: 75,
  trustLevel: 'Prata',
  referralCode: 'ROBERTO10',
  performance: { leads: 120, sales: 4, conversionRate: 3.3, avgCycleDays: 45 }
};

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Apartamento de Luxo no Jardins',
    description: 'Espetacular apartamento com 3 suítes e vista panorâmica.',
    price: 2500000,
    location: 'Jardins, São Paulo',
    type: 'Apartamento',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 4,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Piscina', 'Academia', 'Portaria 24h', 'Varanda Gourmet'],
    isPremium: true,
    integrations: ['zap', 'quintoandar']
  },
  {
    id: 'p2',
    title: 'Casa de Temporada em Ilhabela',
    description: 'Casa pé na areia com piscina e churrasqueira para famílias.',
    price: 1500,
    period: 'diária',
    location: 'Ilhabela, SP',
    type: 'Casa',
    listingType: 'vacation',
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Piscina', 'Wi-Fi', 'Ar Condicionado', 'Vista Mar'],
    integrations: ['airbnb', 'booking']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adCreationContext, setAdCreationContext] = useState<AdCreationContext | undefined>(undefined);

  useEffect(() => {
    const savedUser = localStorage.getItem('superbroker_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
       handleLogin(MOCK_BROKER_USER);
    }
  }, []);

  const handleLogin = (selectedUser: User) => {
    setUser(selectedUser);
    localStorage.setItem('superbroker_user', JSON.stringify(selectedUser));
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('superbroker_user');
    setUser(null);
    setActiveTab('home');
  };

  const handleUpdateCredits = (amount: number) => {
    if (!user) return;
    const updatedUser = { ...user, credits: user.credits + amount };
    setUser(updatedUser);
    localStorage.setItem('superbroker_user', JSON.stringify(updatedUser));
  };

  const handleCounterCampaign = (analysis: CompetitorAnalysis) => {
    setAdCreationContext({ competitorAnalysis: analysis });
    setActiveTab('superads');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <button onClick={() => handleLogin(MOCK_BROKER_USER)} className="bg-indigo-600 hover:bg-indigo-700 text-white p-10 rounded-3xl font-bold shadow-2xl transition-all hover:scale-105">
           Acessar SuperBroker IA
        </button>
      </div>
    );
  }

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      onLogout={handleLogout}
      user={user}
    >
      {activeTab === 'home' && (
        <Home properties={MOCK_PROPERTIES} onBoost={(p) => setActiveTab('superads')} />
      )}
      
      {activeTab === 'accelerator' && (
        <Accelerator properties={MOCK_PROPERTIES} user={user} />
      )}

      {activeTab === 'dashboard' && (
        <Dashboard campaigns={campaigns} properties={MOCK_PROPERTIES} />
      )}
      
      {activeTab === 'financial' && (
        <Financial user={user} onUpdateCredits={handleUpdateCredits} />
      )}

      {activeTab === 'integrations' && (
        <Integrations />
      )}

      {activeTab === 'contracts' && (
        <Contracts properties={MOCK_PROPERTIES} user={user} />
      )}
      
      {activeTab === 'superads' && (
        <AdCreator 
          properties={MOCK_PROPERTIES} 
          creationContext={adCreationContext}
          onCampaignCreated={(c) => {
            setCampaigns([c, ...campaigns]);
            handleUpdateCredits(-c.budget);
            setAdCreationContext(undefined);
          }}
          onCancel={() => {
            setAdCreationContext(undefined);
            setActiveTab('home');
          }}
          user={user}
        />
      )}

      {activeTab === 'spy' && (
        <MarketSpy onGenerateCounterCampaign={handleCounterCampaign} />
      )}

      {activeTab === 'referral' && (
        <ReferralProgram user={user} properties={MOCK_PROPERTIES} />
      )}
      
      {activeTab === 'training' && (
        <Training user={user} />
      )}
      
      {activeTab === 'news' && (
        <News user={user} />
      )}

      {activeTab === 'chat' && (
        <Chat />
      )}
    </Layout>
  );
}
