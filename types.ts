
export enum UserRole {
  BROKER = 'Corretor',
  AGENCY = 'Imobiliária',
  BUYER = 'Comprador',
  INFLUENCER = 'Influencer'
}

export type ListingType = 'sale' | 'rent' | 'vacation';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  period?: 'mensal' | 'diária';
  location: string;
  type: string;
  listingType: ListingType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  features: string[];
  isPremium?: boolean;
  isDraft?: boolean;
  integrations?: ('airbnb' | 'booking' | 'zap' | 'olx' | 'quintoandar' | 'botconversa')[];
}

export interface FlowNode {
  id: string;
  type: 'start' | 'message' | 'condition' | 'action' | 'end';
  title: string;
  content: string;
  nextId?: string;
  meta?: {
    delay?: number;
    platform?: 'whatsapp' | 'instagram' | 'email';
  };
}

export type CampaignChannel = 'Meta' | 'Google' | 'TikTok' | 'Email' | 'WhatsApp' | 'LinkedIn' | 'Automation';

export interface Campaign {
  id: string;
  propertyId: string;
  platform: CampaignChannel;
  status: 'draft' | 'scheduled' | 'sending' | 'active' | 'completed' | 'paused' | 'reactivation';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  leads: number;
  openRate?: number;
  responseRate?: number;
  adCopy?: string;
  strategyContext?: string;
  paymentSource: 'broker_wallet' | 'agency_wallet';
  ownerId: string;
  audienceSize?: number;
  scheduledDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits: number;
  avatarUrl: string;
  agencyId?: string;
  trustScore: number;
  trustLevel: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';
  performance?: {
    leads: number;
    sales: number;
    conversionRate: number;
    avgCycleDays?: number;
  };
  referralCode?: string;
  partnerEarnings?: number;
  partnerTier?: 'Iniciante' | 'Embaixador' | 'Lenda';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  status: 'new' | 'contacted' | 'visit' | 'proposal' | 'sold' | 'lost' | 'dormant';
  origin: 'organic' | 'ads' | 'referral' | 'reactivation';
  createdAt: string;
  lastActivityAt?: string;
  value?: number;
  score?: number; // 0-100
  temperature?: 'cold' | 'warm' | 'hot' | 'burning';
  lastBehavior?: string;
}

export interface CompetitorAnalysis {
  competitorName: string;
  weaknesses: string[];
  opportunities: string[];
  suggestedAction: string;
}

export type ContractType = 'purchase_sale' | 'rental' | 'brokerage_exclusivity' | 'partnership_assoc';

export interface AdCreationContext {
  preSelectedProperty?: Property;
  competitorAnalysis?: CompetitorAnalysis;
}

export interface CommissionRule {
  id: string;
  name: string;
  brokerSplit: number;
  agencyFee: number;
  taxRate: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  method: 'pix' | 'card' | 'campaign_spend' | 'platform_fee';
  status: 'completed' | 'pending' | 'error';
}

export interface Contract {
  id: string;
  title: string;
  type: ContractType;
  parties: {
    partyA: string;
    partyAEmail?: string;
    partyB: string;
    partyBEmail?: string;
  };
  status: 'draft' | 'awaiting_signature' | 'signed';
  envelopeId?: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  targetRole: UserRole;
  lessonsCount: number;
  duration: string;
  thumbnailUrl: string;
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Corretor' | 'Gerente' | 'Captador';
  commissionSplit: number;
  creci?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  avatarUrl: string;
  performance: {
    activeLeads: number;
    salesThisMonth: number;
    conversionRate: number;
  };
}

export interface ReferralStat {
    id: string;
    type: 'property' | 'platform';
    name: string;
    clicks?: number;
    leads?: number;
    signups?: number;
    potentialCommission: number;
    status: 'active' | 'converted' | 'pending';
}
