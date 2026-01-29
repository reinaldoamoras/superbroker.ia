
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
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(MOCK_BROKER_USER);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adCreationContext, setAdCreationContext] = useState<AdCreationContext | undefined>(undefined);

  const handleUpdateCredits = (amount: number) => {
    if (!user) return;
    setUser({ ...user, credits: user.credits + amount });
  };

  const handleCounterCampaign = (analysis: CompetitorAnalysis) => {
    setAdCreationContext({ competitorAnalysis: analysis });
    setActiveTab('superads');
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      onLogout={() => setUser(null)}
      user={user || MOCK_BROKER_USER}
    >
      {activeTab === 'home' && <Home properties={MOCK_PROPERTIES} onBoost={() => setActiveTab('superads')} />}
      {activeTab === 'accelerator' && <Accelerator properties={MOCK_PROPERTIES} user={user || MOCK_BROKER_USER} />}
      {activeTab === 'dashboard' && <Dashboard campaigns={campaigns} properties={MOCK_PROPERTIES} />}
      {activeTab === 'financial' && <Financial user={user || MOCK_BROKER_USER} onUpdateCredits={handleUpdateCredits} />}
      {activeTab === 'integrations' && <Integrations />}
      {activeTab === 'contracts' && <Contracts properties={MOCK_PROPERTIES} user={user || MOCK_BROKER_USER} />}
      {activeTab === 'superads' && <AdCreator properties={MOCK_PROPERTIES} user={user || MOCK_BROKER_USER} onCampaignCreated={(c) => setCampaigns([c, ...campaigns])} onCancel={() => setActiveTab('home')} />}
      {activeTab === 'spy' && <MarketSpy onGenerateCounterCampaign={handleCounterCampaign} />}
      {activeTab === 'referral' && <ReferralProgram user={user || MOCK_BROKER_USER} properties={MOCK_PROPERTIES} />}
      {activeTab === 'training' && <Training user={user || MOCK_BROKER_USER} />}
      {activeTab === 'news' && <News user={user || MOCK_BROKER_USER} />}
      {activeTab === 'chat' && <Chat />}
    </Layout>
  );
}
