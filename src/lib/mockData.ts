// Mock data for the Digital SACCO prototype

export type TxType = 'deposit' | 'withdrawal' | 'transfer' | 'loan_disbursement' | 'loan_repayment' | 'share_purchase' | 'dividend' | 'fee';
export type TxStatus = 'completed' | 'pending' | 'failed';
export type SavingsType = 'Main' | 'School Fees' | 'Emergency' | 'Business' | 'House' | 'Car' | 'Child';
export type LoanStatus = 'submitted' | 'guarantor_approval' | 'officer_review' | 'accountant_review' | 'manager_approval' | 'disbursed' | 'active' | 'rejected';
export type KYCStatus = 'pending' | 'approved' | 'rejected';

export interface Transaction {
  id: string;
  type: TxType;
  title: string;
  amount: number;
  fee: number;
  date: string;
  status: TxStatus;
  reference: string;
  counterparty?: string;
}

export interface SavingsAccount {
  id: string;
  name: string;
  type: SavingsType;
  balance: number;
  interestAccrued: number;
  interestRate: number;
  history: Transaction[];
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  targetDate: string;
  contributionAmount: number;
  frequency: 'Weekly' | 'Monthly';
}

export interface FixedDeposit {
  id: string;
  amount: number;
  termYears: number;
  rate: number;
  startDate: string;
  maturityDate: string;
  maturityValue: number;
}

export interface Loan {
  id: string;
  product: string;
  amount: number;
  outstanding: number;
  termMonths: number;
  monthlyPayment: number;
  nextDueDate: string;
  status: LoanStatus;
  purpose: string;
  progress?: number;
  appliedDate?: string;
  rate: number;
}

export interface ShareTransaction {
  id: string;
  type: 'purchase' | 'transfer_in' | 'transfer_out' | 'dividend';
  quantity: number;
  pricePerShare: number;
  date: string;
}

export interface GuarantorRequest {
  id: string;
  applicantName: string;
  applicantNumber: string;
  amount: number;
  exposure: number;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Notification {
  id: string;
  category: 'transactions' | 'loans' | 'security' | 'dividends';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AdminMember {
  id: string;
  name: string;
  memberNumber: string;
  phone: string;
  email: string;
  joinedDate: string;
  kycStatus: KYCStatus;
  totalSavings: number;
  totalShares: number;
  activeLoans: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AdminLoanApplication {
  id: string;
  applicantName: string;
  memberNumber: string;
  amount: number;
  product: string;
  termMonths: number;
  riskScore: number;
  status: LoanStatus;
  appliedDate: string;
  guarantors: { name: string; status: 'pending' | 'accepted' | 'declined' }[];
  purpose: string;
}

export interface ApprovalStep {
  role: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

// === MEMBER DATA ===

export const memberTransactions: Transaction[] = [
  { id: 'TX001', type: 'deposit', title: 'Mobile Money Deposit', amount: 250000, fee: 1500, date: '2026-08-17T09:30:00', status: 'completed', reference: 'MM-8847291', counterparty: 'MTN MoMo' },
  { id: 'TX002', type: 'transfer', title: 'Transfer to Sarah Namutebi', amount: 50000, fee: 500, date: '2026-08-16T14:22:00', status: 'completed', reference: 'TR-9920344', counterparty: 'Sarah Namutebi' },
  { id: 'TX003', type: 'loan_repayment', title: 'Loan Repayment', amount: 185000, fee: 0, date: '2026-08-15T11:00:00', status: 'completed', reference: 'LR-4477102', counterparty: 'Emergency Loan' },
  { id: 'TX004', type: 'withdrawal', title: 'Withdrawal to Bank', amount: 100000, fee: 2000, date: '2026-08-14T16:45:00', status: 'completed', reference: 'WD-5582910', counterparty: 'Stanbic Bank' },
  { id: 'TX005', type: 'dividend', title: 'Q2 Dividend Payout', amount: 32500, fee: 0, date: '2026-08-10T08:00:00', status: 'completed', reference: 'DV-2200117' },
  { id: 'TX006', type: 'share_purchase', title: 'Share Purchase (10 units)', amount: 50000, fee: 0, date: '2026-08-05T10:15:00', status: 'completed', reference: 'SH-7783001' },
  { id: 'TX007', type: 'deposit', title: 'Mobile Money Deposit', amount: 100000, fee: 1000, date: '2026-08-03T13:20:00', status: 'completed', reference: 'MM-8847200', counterparty: 'Airtel Money' },
  { id: 'TX008', type: 'transfer', title: 'Transfer to John Okello', amount: 75000, fee: 500, date: '2026-07-28T17:30:00', status: 'failed', reference: 'TR-9920288', counterparty: 'John Okello' },
];

export const savingsAccounts: SavingsAccount[] = [
  {
    id: 'SA001', name: 'Main Savings', type: 'Main', balance: 1850000, interestAccrued: 46250, interestRate: 5,
    history: [
      { id: 'TX001', type: 'deposit', title: 'Mobile Money Deposit', amount: 250000, fee: 1500, date: '2026-08-17T09:30:00', status: 'completed', reference: 'MM-8847291' },
      { id: 'TX002', type: 'transfer', title: 'Transfer to Sarah Namutebi', amount: 50000, fee: 500, date: '2026-08-16T14:22:00', status: 'completed', reference: 'TR-9920344' },
      { id: 'TX004', type: 'withdrawal', title: 'Withdrawal to Bank', amount: 100000, fee: 2000, date: '2026-08-14T16:45:00', status: 'completed', reference: 'WD-5582910' },
    ],
  },
  {
    id: 'SA002', name: 'School Fees', type: 'School Fees', balance: 920000, interestAccrued: 18400, interestRate: 4,
    history: [
      { id: 'TX010', type: 'deposit', title: 'Mobile Money Deposit', amount: 200000, fee: 1500, date: '2026-08-01T09:00:00', status: 'completed', reference: 'MM-8847100' },
    ],
  },
  {
    id: 'SA003', name: 'Emergency Fund', type: 'Emergency', balance: 650000, interestAccrued: 13000, interestRate: 4,
    history: [
      { id: 'TX011', type: 'deposit', title: 'Mobile Money Deposit', amount: 100000, fee: 1000, date: '2026-07-15T10:00:00', status: 'completed', reference: 'MM-8846900' },
    ],
  },
  {
    id: 'SA004', name: 'Business Capital', type: 'Business', balance: 2300000, interestAccrued: 57500, interestRate: 5,
    history: [
      { id: 'TX012', type: 'deposit', title: 'Bank Transfer', amount: 500000, fee: 0, date: '2026-07-20T11:30:00', status: 'completed', reference: 'BK-6612001' },
    ],
  },
];

export const goals: Goal[] = [
  { id: 'G001', name: 'New Car', target: 15000000, saved: 4200000, targetDate: '2027-06-30', contributionAmount: 500000, frequency: 'Monthly' },
  { id: 'G002', name: 'Family Holiday', target: 3000000, saved: 1800000, targetDate: '2026-12-15', contributionAmount: 200000, frequency: 'Monthly' },
  { id: 'G003', name: 'Home Extension', target: 8000000, saved: 1200000, targetDate: '2027-12-31', contributionAmount: 300000, frequency: 'Monthly' },
];

export const fixedDeposits: FixedDeposit[] = [
  { id: 'FD001', amount: 1000000, termYears: 2, rate: 8, startDate: '2026-01-15', maturityDate: '2028-01-15', maturityValue: 1166400 },
  { id: 'FD002', amount: 500000, termYears: 1, rate: 6.5, startDate: '2026-03-01', maturityDate: '2027-03-01', maturityValue: 532500 },
];

export const fixedTermProducts = [
  { term: '1 year', rate: 6.5, minAmount: 100000 },
  { term: '2 years', rate: 8.0, minAmount: 100000 },
  { term: '3 years', rate: 9.0, minAmount: 250000 },
  { term: '5 years', rate: 10.5, minAmount: 500000 },
  { term: '7 years', rate: 11.0, minAmount: 500000 },
  { term: '10 years', rate: 12.0, minAmount: 1000000 },
];

export const activeLoan: Loan = {
  id: 'LN001', product: 'Emergency Loan', amount: 5000000, outstanding: 2960000,
  termMonths: 12, monthlyPayment: 467000, nextDueDate: '2026-09-01',
  status: 'active', purpose: 'Medical emergency', rate: 12,
};

export const loanApplications: Loan[] = [
  {
    id: 'LA001', product: 'Development Loan', amount: 15000000, outstanding: 15000000,
    termMonths: 24, monthlyPayment: 725000, nextDueDate: '', status: 'officer_review',
    purpose: 'Business expansion — opening second shop', rate: 14, progress: 40,
    appliedDate: '2026-08-10',
  },
];

export const loanProducts = [
  { name: 'Emergency Loan', maxAmount: 5000000, maxTerm: 12, rate: 12, description: 'Quick access for urgent needs' },
  { name: 'Development Loan', maxAmount: 50000000, maxTerm: 36, rate: 14, description: 'For business and investment' },
  { name: 'School Fees Loan', maxAmount: 10000000, maxTerm: 12, rate: 10, description: 'Cover education costs' },
  { name: 'Asset Finance Loan', maxAmount: 30000000, maxTerm: 48, rate: 15, description: 'Vehicle, equipment, machinery' },
  { name: 'Salary Loan', maxAmount: 15000000, maxTerm: 18, rate: 11, description: 'Short-term salary advance' },
];

export const shares = {
  unitsOwned: 150,
  pricePerShare: 5000,
  currentValue: 750000,
  ownershipPct: 0.038,
  totalAuthorized: 400000,
  totalIssued: 200000,
};

export const shareTransactions: ShareTransaction[] = [
  { id: 'SH001', type: 'purchase', quantity: 10, pricePerShare: 5000, date: '2026-08-05T10:15:00' },
  { id: 'SH002', type: 'dividend', quantity: 140, pricePerShare: 232, date: '2026-08-10T08:00:00' },
  { id: 'SH003', type: 'purchase', quantity: 50, pricePerShare: 4800, date: '2026-06-01T09:00:00' },
  { id: 'SH004', type: 'purchase', quantity: 90, pricePerShare: 4500, date: '2026-01-15T14:30:00' },
];

export const dividendInfo = {
  currentQuarter: 'Q3 2026',
  status: 'pending' as 'pending' | 'declared' | 'paid',
  estimatedAmount: 34800,
  eligibleShares: 150,
  history: [
    { id: 'DV001', period: 'Q2 2026', amount: 32500, shares: 140, date: '2026-08-10', status: 'paid' as const },
    { id: 'DV002', period: 'Q1 2026', amount: 30200, shares: 140, date: '2026-05-10', status: 'paid' as const },
    { id: 'DV003', period: 'Q4 2025', amount: 28000, shares: 140, date: '2026-02-10', status: 'paid' as const },
  ],
};

export const guarantorRequests: GuarantorRequest[] = [
  { id: 'GR001', applicantName: 'Sarah Namutebi', applicantNumber: 'M-2047', amount: 8000000, exposure: 8000000, date: '2026-08-15', status: 'pending' },
  { id: 'GR002', applicantName: 'David Mukasa', applicantNumber: 'M-3102', amount: 5000000, exposure: 5000000, date: '2026-08-12', status: 'pending' },
];

export const notifications: Notification[] = [
  { id: 'N001', category: 'transactions', title: 'Deposit Successful', message: 'UGX 250,000 has been credited to your Main Savings.', date: '2026-08-17T09:31:00', read: false },
  { id: 'N002', category: 'loans', title: 'Loan Application Update', message: 'Your Development Loan application is now under officer review.', date: '2026-08-16T15:00:00', read: false },
  { id: 'N003', category: 'security', title: 'New Device Login', message: 'A new device logged into your account from Kampala.', date: '2026-08-14T18:00:00', read: true },
  { id: 'N004', category: 'dividends', title: 'Dividend Paid', message: 'Q2 dividend of UGX 32,500 has been credited to your Main Savings.', date: '2026-08-10T08:01:00', read: true },
  { id: 'N005', category: 'transactions', title: 'Transfer Failed', message: 'Your transfer of UGX 75,000 to John Okello failed. Please retry.', date: '2026-07-28T17:31:00', read: true },
];

// === ADMIN DATA ===

export const adminStats = {
  totalMembers: 3427,
  activeMembers: 3104,
  pendingKYC: 38,
  totalSavings: 845000000,
  totalShares: 1000000000,
  loansOutstanding: 423000000,
  loansInArrears: 18700000,
  todayDeposits: 12450000,
  todayWithdrawals: 6200000,
  todayTransfers: 3100000,
  pendingApprovals: 12,
  feeRevenue: 4520000,
  suspiciousAlerts: 3,
};

export const adminMembers: AdminMember[] = [
  { id: 'M-2047', name: 'Sarah Namutebi', memberNumber: 'M-2047', phone: '+256 772 100 204', email: 'sarah.n@email.com', joinedDate: '2024-03-15', kycStatus: 'approved', totalSavings: 3400000, totalShares: 200000, activeLoans: 1, status: 'active' },
  { id: 'M-3102', name: 'David Mukasa', memberNumber: 'M-3102', phone: '+256 703 411 310', email: 'd.mukasa@email.com', joinedDate: '2024-07-22', kycStatus: 'approved', totalSavings: 1850000, totalShares: 100000, activeLoans: 0, status: 'active' },
  { id: 'M-3450', name: 'Grace Atim', memberNumber: 'M-3450', phone: '+256 772 900 345', email: 'grace.atim@email.com', joinedDate: '2025-01-10', kycStatus: 'pending', totalSavings: 500000, totalShares: 0, activeLoans: 0, status: 'active' },
  { id: 'M-3201', name: 'Emmanuel Okello', memberNumber: 'M-3201', phone: '+256 782 300 201', email: 'e.okello@email.com', joinedDate: '2024-09-05', kycStatus: 'approved', totalSavings: 5600000, totalShares: 350000, activeLoans: 2, status: 'active' },
  { id: 'M-3580', name: 'Patricia Nankinga', memberNumber: 'M-3580', phone: '+256 759 200 580', email: 'p.nankinga@email.com', joinedDate: '2025-02-18', kycStatus: 'pending', totalSavings: 250000, totalShares: 0, activeLoans: 0, status: 'active' },
  { id: 'M-2900', name: 'Joseph Ssebunya', memberNumber: 'M-2900', phone: '+256 772 800 290', email: 'j.ssebunya@email.com', joinedDate: '2023-11-30', kycStatus: 'approved', totalSavings: 8900000, totalShares: 500000, activeLoans: 1, status: 'active' },
  { id: 'M-3650', name: 'Mary Akello', memberNumber: 'M-3650', phone: '+256 772 500 650', email: 'm.akello@email.com', joinedDate: '2025-03-01', kycStatus: 'rejected', totalSavings: 0, totalShares: 0, activeLoans: 0, status: 'inactive' },
  { id: 'M-2750', name: 'Robert Tumusiime', memberNumber: 'M-2750', phone: '+256 703 100 750', email: 'r.tumusiime@email.com', joinedDate: '2023-08-14', kycStatus: 'approved', totalSavings: 12300000, totalShares: 750000, activeLoans: 1, status: 'suspended' },
];

export const adminLoanApplications: AdminLoanApplication[] = [
  {
    id: 'LA001', applicantName: 'Joseph Ssebunya', memberNumber: 'M-2900', amount: 15000000,
    product: 'Development Loan', termMonths: 24, riskScore: 72, status: 'officer_review',
    appliedDate: '2026-08-10', purpose: 'Business expansion — opening second shop',
    guarantors: [{ name: 'Sarah Namutebi', status: 'accepted' }, { name: 'David Mukasa', status: 'pending' }],
  },
  {
    id: 'LA002', applicantName: 'Emmanuel Okello', memberNumber: 'M-3201', amount: 8000000,
    product: 'Asset Finance Loan', termMonths: 36, riskScore: 85, status: 'accountant_review',
    appliedDate: '2026-08-08', purpose: 'Purchase delivery vehicle',
    guarantors: [{ name: 'Joseph Ssebunya', status: 'accepted' }],
  },
  {
    id: 'LA003', applicantName: 'Grace Atim', memberNumber: 'M-3450', amount: 3000000,
    product: 'Emergency Loan', termMonths: 6, riskScore: 55, status: 'guarantor_approval',
    appliedDate: '2026-08-14', purpose: 'Medical bills',
    guarantors: [{ name: 'Patricia Nankinga', status: 'pending' }],
  },
  {
    id: 'LA004', applicantName: 'Robert Tumusiime', memberNumber: 'M-2750', amount: 25000000,
    product: 'Development Loan', termMonths: 36, riskScore: 92, status: 'manager_approval',
    appliedDate: '2026-08-05', purpose: 'Real estate investment',
    guarantors: [{ name: 'Emmanuel Okello', status: 'accepted' }, { name: 'Joseph Ssebunya', status: 'accepted' }],
  },
];

export const approvalChain: ApprovalStep[] = [
  { role: 'Loans Officer', name: 'Jane Kato', status: 'completed', date: '2026-08-11' },
  { role: 'Accountant', name: 'Mike Lubega', status: 'completed', date: '2026-08-13' },
  { role: 'Manager', name: 'Alice Nakato', status: 'current' },
  { role: 'Disbursement', name: 'System', status: 'pending' },
];

export const kycReviewQueue = [
  { id: 'KYC001', memberName: 'Grace Atim', memberNumber: 'M-3450', submittedDate: '2026-08-15', docType: 'National ID', riskLevel: 'low' as const },
  { id: 'KYC002', memberName: 'Patricia Nankinga', memberNumber: 'M-3580', submittedDate: '2026-08-14', docType: 'Passport', riskLevel: 'medium' as const },
  { id: 'KYC003', memberName: 'Samuel Kiggundu', memberNumber: 'M-3690', submittedDate: '2026-08-13', docType: 'Driver Licence', riskLevel: 'low' as const },
];

export const adminDepositsFeed = [
  { id: 'DP001', member: 'Sarah Namutebi', amount: 250000, method: 'MTN MoMo', time: '2026-08-17T09:30:00', status: 'completed' as const },
  { id: 'DP002', member: 'Emmanuel Okello', amount: 500000, method: 'Bank Transfer', time: '2026-08-17T09:15:00', status: 'completed' as const },
  { id: 'DP003', member: 'David Mukasa', amount: 100000, method: 'Airtel Money', time: '2026-08-17T08:50:00', status: 'completed' as const },
  { id: 'DP004', member: 'Joseph Ssebunya', amount: 1200000, method: 'Bank Transfer', time: '2026-08-17T08:30:00', status: 'pending' as const },
  { id: 'DP005', member: 'Grace Atim', amount: 50000, method: 'MTN MoMo', time: '2026-08-17T08:10:00', status: 'completed' as const },
];

export const adminWithdrawalsQueue = [
  { id: 'WD001', member: 'Robert Tumusiime', amount: 2000000, method: 'Bank Transfer', time: '2026-08-17T07:45:00', status: 'pending' as const },
  { id: 'WD002', member: 'Emmanuel Okello', amount: 500000, method: 'MTN MoMo', time: '2026-08-17T07:20:00', status: 'pending' as const },
  { id: 'WD003', member: 'Sarah Namutebi', amount: 300000, method: 'Airtel Money', time: '2026-08-16T18:00:00', status: 'pending' as const },
];

export const riskAlerts = [
  { id: 'RA001', member: 'Robert Tumusiime', alert: 'Multiple large withdrawals', score: 88, time: '2026-08-17T07:46:00', severity: 'high' as const },
  { id: 'RA002', member: 'Mary Akello', alert: 'Failed KYC — account activity', score: 75, time: '2026-08-16T22:00:00', severity: 'medium' as const },
  { id: 'RA003', member: 'Unknown', alert: 'Unusual login pattern from new IP', score: 62, time: '2026-08-16T15:30:00', severity: 'low' as const },
];

export const feeRules = [
  { id: 'FR001', type: 'transaction', name: 'Mobile Money Deposit Fee', structure: '0.6%', amount: null, status: 'active' as const },
  { id: 'FR002', type: 'transaction', name: 'Withdrawal Fee (Bank)', structure: 'Fixed', amount: 2000, status: 'active' as const },
  { id: 'FR003', type: 'transaction', name: 'Transfer Fee', structure: 'Fixed', amount: 500, status: 'active' as const },
  { id: 'FR004', type: 'loan', name: 'Loan Processing Fee', structure: '1.5%', amount: null, status: 'active' as const },
  { id: 'FR005', type: 'account', name: 'Monthly Maintenance', structure: 'Fixed', amount: 5000, status: 'active' as const },
  { id: 'FR006', type: 'transaction', name: 'Failed Transaction Fee', structure: 'Fixed', amount: 1000, status: 'inactive' as const },
];
