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
    license: 'Money Services',
    jurisdiction: 'Abu Dhabi Global Market Financial Services Regulatory Authority',
    coverage: 'UAE and GCC through partner banks',
    countries: 7,
    priority: 'foundation',
    timeline: '2025',
    year: '2025',
    status: 'active',
    details: 'Financial Services Permission for Providing Money Services. Foundation hub for Gulf corridors covering UAE and GCC region through established banking partnerships.',
    specificCountries: [
      'UAE', 'Saudi Arabia', 'Bahrain', 'Qatar', 'Kuwait', 'Oman', 'Jordan'
    ]
  },
  {
    id: 'eu-pi',
    region: 'European Union (Lithuania)',
    license: 'Payment Institution (PI)',
    jurisdiction: 'European Banking Authority (EBA passporting)',
    coverage: 'All 27 EEA member states',
    countries: 27,
    priority: 'parallel',
    timeline: '2026',
    year: '2026',
    status: 'planned',
    details: 'Payment Institution licence with passporting rights across entire European Economic Area. PSD2-compliant payment services without e-money issuance.',
    specificCountries: [
      'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
      'Belgium', 'Austria', 'Portugal', 'Greece', 'Poland',
      'Czech Republic', 'Hungary', 'Romania', 'Sweden', 'Denmark',
      'Finland', 'Ireland', 'Luxembourg', 'Slovenia', 'Slovakia',
      'Croatia', 'Bulgaria', 'Lithuania', 'Latvia', 'Estonia',
      'Cyprus', 'Malta'
    ]
  },
  {
    id: 'uk-fca',
    region: 'United Kingdom',
    license: 'Payment Institution (Authorized)',
    jurisdiction: 'Financial Conduct Authority',
    coverage: 'UK and dependent territories',
    countries: 5,
    priority: 'parallel',
    timeline: '2026',
    year: '2026',
    status: 'planned',
    details: 'FCA Authorised Payment Institution under Payment Services Regulations. Coverage includes UK mainland and Crown dependencies.',
    specificCountries: [
      'England', 'Scotland', 'Wales', 'Northern Ireland', 'Gibraltar'
    ]
  },
  {
    id: 'cbuae',
    region: 'UAE Mainland',
    license: 'CBUAE Retail Payment Services',
    jurisdiction: 'Central Bank of UAE',
    coverage: 'UAE domestic settlement',
    countries: 1,
    priority: 'expansion',
    timeline: '2027',
    year: '2027',
    status: 'planned',
    details: 'Retail Payment Services and Card Schemes (RPSCS) licence for comprehensive UAE domestic operations and local settlement.',
    specificCountries: [
      'UAE'
    ]
  },
  {
    id: 'singapore',
    region: 'Singapore',
    license: 'MPI (Major Payment Institution)',
    jurisdiction: 'Monetary Authority of Singapore',
    coverage: 'Singapore and APAC corridors',
    countries: 11,
    priority: 'expansion',
    timeline: '2027',
    year: '2027',
    status: 'planned',
    details: 'Major Payment Institution licence under the Payment Services Act. Foundation for Asia-Pacific expansion through correspondent banking relationships.',
    specificCountries: [
      'Singapore', 'Indonesia', 'Malaysia', 'Philippines', 'Thailand',
      'Vietnam', 'Cambodia', 'Myanmar', 'Laos', 'Brunei', 'Timor-Leste'
    ]
  },
  {
    id: 'usa',
    region: 'United States',
    license: 'FinCEN MSB + State MTLs',
    jurisdiction: 'Federal (FinCEN) + State-level Money Transmitter Licenses',
    coverage: '50 states and US territories',
    countries: 55,
    priority: 'expansion',
    timeline: '2028',
    year: '2028',
    status: 'future',
    details: 'Federal FinCEN Money Services Business registration plus state-by-state Money Transmitter Licenses. Phased rollout based on corridor priority.',
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
    id: 'latam',
    region: 'Latin America',
    license: 'Brazil PI + Mexico IFPE',
    jurisdiction: 'Banco Central do Brasil (BCB), Comisión Nacional Bancaria y de Valores (CNBV)',
    coverage: 'Latin American corridors',
    countries: 20,
    priority: 'emerging',
    timeline: '2028+',
    year: '2028+',
    status: 'future',
    details: 'Payment Institution (Brazil) and IFPE (Mexico) licenses anchor Latin American expansion with correspondent corridors for remittances and B2B flows.',
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
    licenses: ['adgm', 'cbuae'],
    totalCountries: 8,
    color: '#D4AF37' // gold
  },
  europe: {
    name: 'European Corridor',
    licenses: ['eu-pi', 'uk-fca'],
    totalCountries: 32,
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
    licenses: ['singapore'],
    totalCountries: 11,
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
