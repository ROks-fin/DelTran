// Complete licensing data for all regions
export interface License {
  id: string;
  region: string;
  license: string;
  jurisdiction: string;
  coverage: string;
  countries: number;
  priority: 'foundation' | 'parallel' | 'expansion' | 'emerging';
  timeline: string;
  year: string;
  status: 'active' | 'planned' | 'future';
  details: string;
  specificCountries: string[];
}

export const licenses: License[] = [
  {
    id: 'adgm',
    region: 'ADGM (UAE)',
    license: 'FSRA (Providing Money Services + FRT)',
    jurisdiction: 'Abu Dhabi Global Market Financial Services Regulatory Authority',
    coverage: '20+ countries through MENA and partner banks',
    countries: 20,
    priority: 'foundation',
    timeline: '2025',
    year: '2025',
    status: 'active',
    details: 'Starting with ADGM RegBox regulatory sandbox. Covers UAE, Saudi Arabia, Bahrain, Qatar, Kuwait, Egypt, Jordan, Morocco, Turkey and more through MENA network.',
    specificCountries: [
      'UAE', 'Saudi Arabia', 'Bahrain', 'Qatar', 'Kuwait',
      'Egypt', 'Jordan', 'Morocco', 'Turkey', 'Oman',
      'Lebanon', 'Tunisia', 'Algeria', 'Iraq', 'Yemen',
      'Libya', 'Sudan', 'Syria', 'Palestine', 'Mauritania'
    ]
  },
  {
    id: 'cbuae',
    region: 'CBUAE / VARA (Mainland UAE)',
    license: 'RPSCS / SVF / VA',
    jurisdiction: 'Central Bank of UAE / Virtual Assets Regulatory Authority',
    coverage: 'Full UAE domestic settlement and Asia/India/Africa corridors',
    countries: 15,
    priority: 'foundation',
    timeline: '2025-2026',
    year: '2025-2026',
    status: 'planned',
    details: 'Comprehensive UAE mainland licensing for domestic and cross-border operations. Retail Payment Services and Card Schemes, Stored Value Facilities, Virtual Assets.',
    specificCountries: [
      'UAE', 'India', 'Pakistan', 'Bangladesh', 'Philippines',
      'Indonesia', 'Vietnam', 'Thailand', 'Kenya', 'Nigeria',
      'South Africa', 'Ethiopia', 'Tanzania', 'Uganda', 'Ghana'
    ]
  },
  {
    id: 'eu-emi',
    region: 'European Union',
    license: 'EMI + MiCA',
    jurisdiction: 'European Banking Authority (EBA passporting)',
    coverage: 'All EEA member states',
    countries: 30,
    priority: 'parallel',
    timeline: '2026',
    year: '2026',
    status: 'planned',
    details: 'Electronic Money Institution license with MiCA (Markets in Crypto-Assets) compliance enables passporting across entire European Economic Area.',
    specificCountries: [
      'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
      'Belgium', 'Austria', 'Portugal', 'Greece', 'Poland',
      'Czech Republic', 'Hungary', 'Romania', 'Sweden', 'Denmark',
      'Finland', 'Ireland', 'Luxembourg', 'Slovenia', 'Slovakia',
      'Croatia', 'Bulgaria', 'Lithuania', 'Latvia', 'Estonia',
      'Cyprus', 'Malta', 'Iceland', 'Norway', 'Liechtenstein'
    ]
  },
  {
    id: 'uk-fca',
    region: 'United Kingdom',
    license: 'FCA (EMR + PSR)',
    jurisdiction: 'Financial Conduct Authority',
    coverage: 'UK and dependent territories',
    countries: 8,
    priority: 'parallel',
    timeline: '2026',
    year: '2026',
    status: 'planned',
    details: 'FCA Electronic Money Regulations and Payment Services Regulations authorization. Coverage includes UK mainland and Crown dependencies.',
    specificCountries: [
      'England', 'Scotland', 'Wales', 'Northern Ireland',
      'Gibraltar', 'Jersey', 'Isle of Man', 'Guernsey'
    ]
  },
  {
    id: 'usa',
    region: 'United States',
    license: 'FinCEN + MTL + BitLicense',
    jurisdiction: 'Federal (FinCEN) + State-level Money Transmitter Licenses',
    coverage: '50 states and US territories',
    countries: 55,
    priority: 'parallel',
    timeline: '2026-2027',
    year: '2026-2027',
    status: 'planned',
    details: 'Federal FinCEN registration plus state-by-state Money Transmitter Licenses. Includes New York BitLicense for digital asset operations.',
    specificCountries: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
      'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
      'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      'Washington DC', 'Puerto Rico', 'Guam', 'US Virgin Islands', 'American Samoa'
    ]
  },
  {
    id: 'singapore',
    region: 'Singapore',
    license: 'MAS MPI',
    jurisdiction: 'Monetary Authority of Singapore',
    coverage: 'Southeast Asia through correspondent network',
    countries: 11,
    priority: 'expansion',
    timeline: '2026-2027',
    year: '2026-2027',
    status: 'planned',
    details: 'Major Payment Institution license provides foundation for Southeast Asian expansion through correspondent banking relationships.',
    specificCountries: [
      'Singapore', 'Indonesia', 'Malaysia', 'Philippines', 'Thailand',
      'Vietnam', 'Cambodia', 'Myanmar', 'Laos', 'Brunei', 'Timor-Leste'
    ]
  },
  {
    id: 'hongkong',
    region: 'Hong Kong',
    license: 'HKMA SVF + Stablecoin Issuer',
    jurisdiction: 'Hong Kong Monetary Authority',
    coverage: 'Greater China and Taiwan',
    countries: 3,
    priority: 'expansion',
    timeline: '2026-2027',
    year: '2026-2027',
    status: 'planned',
    details: 'Stored Value Facility and Stablecoin Issuer licenses enable access to Greater China market through UnionPay/Alipay corridors.',
    specificCountries: [
      'Hong Kong', 'Mainland China (via corridors)', 'Taiwan'
    ]
  },
  {
    id: 'gcc',
    region: 'GCC (Saudi, Bahrain, Qatar)',
    license: 'SAMA PSP/PSO + CBB PSP + QCB',
    jurisdiction: 'Saudi Arabian Monetary Authority, Central Bank of Bahrain, Qatar Central Bank',
    coverage: 'All Gulf Cooperation Council states',
    countries: 6,
    priority: 'expansion',
    timeline: '2026-2027',
    year: '2026-2027',
    status: 'planned',
    details: 'Payment Service Provider and Payment Service Operator licenses across GCC member states for comprehensive Gulf coverage.',
    specificCountries: [
      'Saudi Arabia', 'Bahrain', 'Qatar', 'Oman', 'Kuwait', 'UAE'
    ]
  },
  {
    id: 'latam',
    region: 'Latin America',
    license: 'Brazil PI + Mexico IFPE',
    jurisdiction: 'Banco Central do Brasil (BCB), Comisión Nacional Bancaria y de Valores (CNBV)',
    coverage: 'Latin American corridors',
    countries: 20,
    priority: 'emerging',
    timeline: '2027-2028',
    year: '2027-2028',
    status: 'future',
    details: 'Payment Institution (Brazil) and IFPE (Mexico) licenses anchor Latin American expansion with correspondent corridors.',
    specificCountries: [
      'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
      'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay',
      'Uruguay', 'Guyana', 'Suriname', 'French Guiana', 'Guatemala',
      'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama'
    ]
  }
];

// Regional groupings for visualization
export const regions = {
  mena: {
    name: 'MENA Hub',
    licenses: ['adgm', 'cbuae', 'gcc'],
    totalCountries: 41,
    color: '#D4AF37' // gold
  },
  europe: {
    name: 'European Corridor',
    licenses: ['eu-emi', 'uk-fca'],
    totalCountries: 38,
    color: '#4169E1' // royal blue
  },
  americas: {
    name: 'Americas',
    licenses: ['usa', 'latam'],
    totalCountries: 75,
    color: '#32CD32' // lime green
  },
  asia: {
    name: 'Asia-Pacific',
    licenses: ['singapore', 'hongkong'],
    totalCountries: 14,
    color: '#FF6347' // tomato
  }
};

// Get total global coverage
export const getTotalCoverage = (): number => {
  const uniqueCountries = new Set<string>();
  licenses.forEach(license => {
    license.specificCountries.forEach(country => {
      uniqueCountries.add(country);
    });
  });
  return uniqueCountries.size;
};

// Get licenses by status
export const getLicensesByStatus = (status: License['status']) => {
  return licenses.filter(l => l.status === status);
};

// Get licenses by priority
export const getLicensesByPriority = (priority: License['priority']) => {
  return licenses.filter(l => l.priority === priority);
};
