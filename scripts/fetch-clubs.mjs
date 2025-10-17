import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create sample clubs data for FootyMapz
 */
function createSampleClubs() {
  const sampleClubs = [
    {
      id: 'Q123456',
      name: 'Sydney FC',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'Allianz Stadium',
      state: 'NSW',
      lat: -33.8969,
      lng: 151.2225,
      competition: 'ALM'
    },
    {
      id: 'Q234567',
      name: 'Melbourne Victory',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'AAMI Park',
      state: 'VIC',
      lat: -37.8250,
      lng: 144.9844,
      competition: 'ALM'
    },
    {
      id: 'Q345678',
      name: 'Brisbane Roar',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'Suncorp Stadium',
      state: 'QLD',
      lat: -27.4705,
      lng: 153.0119,
      competition: 'ALM'
    },
    {
      id: 'Q456789',
      name: 'Adelaide United',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'Coopers Stadium',
      state: 'SA',
      lat: -34.9212,
      lng: 138.6031,
      competition: 'ALM'
    },
    {
      id: 'Q567890',
      name: 'Perth Glory',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'HBF Park',
      state: 'WA',
      lat: -31.9505,
      lng: 115.8605,
      competition: 'ALM'
    },
    {
      id: 'Q678901',
      name: 'Melbourne City',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'AAMI Park',
      state: 'VIC',
      lat: -37.8250,
      lng: 144.9844,
      competition: 'ALM'
    },
    {
      id: 'Q789012',
      name: 'Western Sydney Wanderers',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'CommBank Stadium',
      state: 'NSW',
      lat: -33.8472,
      lng: 150.8856,
      competition: 'ALM'
    },
    {
      id: 'Q890123',
      name: 'Central Coast Mariners',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'Central Coast Stadium',
      state: 'NSW',
      lat: -33.3781,
      lng: 151.3428,
      competition: 'ALM'
    },
    {
      id: 'Q901234',
      name: 'Newcastle Jets',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'McDonald Jones Stadium',
      state: 'NSW',
      lat: -32.9167,
      lng: 151.7500,
      competition: 'ALM'
    },
    {
      id: 'Q012345',
      name: 'Wellington Phoenix',
      leagueId: 'Q789012',
      league: 'A-League Men',
      leagueLevel: 1,
      stadium: 'Sky Stadium',
      state: 'NSW', // Note: Wellington is in NZ but included for demo
      lat: -41.2731,
      lng: 174.7779,
      competition: 'ALM'
    },
    {
      id: 'Q111111',
      name: 'Sydney FC Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'Leichhardt Oval',
      state: 'NSW',
      lat: -33.8847,
      lng: 151.1653,
      competition: 'ALW'
    },
    {
      id: 'Q222222',
      name: 'Melbourne Victory Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'AAMI Park',
      state: 'VIC',
      lat: -37.8250,
      lng: 144.9844,
      competition: 'ALW'
    },
    {
      id: 'Q333333',
      name: 'Brisbane Roar Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'Suncorp Stadium',
      state: 'QLD',
      lat: -27.4705,
      lng: 153.0119,
      competition: 'ALW'
    },
    {
      id: 'Q444444',
      name: 'Adelaide United Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'Coopers Stadium',
      state: 'SA',
      lat: -34.9212,
      lng: 138.6031,
      competition: 'ALW'
    },
    {
      id: 'Q555555',
      name: 'Perth Glory Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'HBF Park',
      state: 'WA',
      lat: -31.9505,
      lng: 115.8605,
      competition: 'ALW'
    },
    {
      id: 'Q666666',
      name: 'Melbourne City Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'AAMI Park',
      state: 'VIC',
      lat: -37.8250,
      lng: 144.9844,
      competition: 'ALW'
    },
    {
      id: 'Q777777',
      name: 'Western Sydney Wanderers Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'CommBank Stadium',
      state: 'NSW',
      lat: -33.8472,
      lng: 150.8856,
      competition: 'ALW'
    },
    {
      id: 'Q888888',
      name: 'Central Coast Mariners Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'Central Coast Stadium',
      state: 'NSW',
      lat: -33.3781,
      lng: 151.3428,
      competition: 'ALW'
    },
    {
      id: 'Q999999',
      name: 'Newcastle Jets Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'McDonald Jones Stadium',
      state: 'NSW',
      lat: -32.9167,
      lng: 151.7500,
      competition: 'ALW'
    },
    {
      id: 'Q000000',
      name: 'Wellington Phoenix Women',
      leagueId: 'Q111222',
      league: 'A-League Women',
      leagueLevel: 1,
      stadium: 'Sky Stadium',
      state: 'NSW', // Note: Wellington is in NZ but included for demo
      lat: -41.2731,
      lng: 174.7779,
      competition: 'ALW'
    },
    // NPL Clubs
    {
      id: 'Q101010',
      name: 'Sydney Olympic',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Belmore Sports Ground',
      state: 'NSW',
      lat: -33.9200,
      lng: 151.2000,
      competition: 'NPL'
    },
    {
      id: 'Q202020',
      name: 'Melbourne Knights',
      leagueId: 'Q303030',
      league: 'NPL Victoria',
      leagueLevel: 2,
      stadium: 'Knights Stadium',
      state: 'VIC',
      lat: -37.8000,
      lng: 144.9000,
      competition: 'NPL'
    },
    {
      id: 'Q303030',
      name: 'Brisbane Strikers',
      leagueId: 'Q404040',
      league: 'NPL Queensland',
      leagueLevel: 2,
      stadium: 'Perry Park',
      state: 'QLD',
      lat: -27.4000,
      lng: 153.0000,
      competition: 'NPL'
    },
    {
      id: 'Q404040',
      name: 'Adelaide City',
      leagueId: 'Q505050',
      league: 'NPL South Australia',
      leagueLevel: 2,
      stadium: 'Adelaide City Park',
      state: 'SA',
      lat: -34.9000,
      lng: 138.6000,
      competition: 'NPL'
    },
    {
      id: 'Q505050',
      name: 'Perth SC',
      leagueId: 'Q606060',
      league: 'NPL Western Australia',
      leagueLevel: 2,
      stadium: 'Dorrien Gardens',
      state: 'WA',
      lat: -31.9000,
      lng: 115.8000,
      competition: 'NPL'
    },
    {
      id: 'Q606060',
      name: 'Hobart Zebras',
      leagueId: 'Q707070',
      league: 'NPL Tasmania',
      leagueLevel: 2,
      stadium: 'KGV Park',
      state: 'TAS',
      lat: -42.9000,
      lng: 147.3000,
      competition: 'NPL'
    },
    {
      id: 'Q707070',
      name: 'Canberra United',
      leagueId: 'Q808080',
      league: 'NPL Capital Football',
      leagueLevel: 2,
      stadium: 'McKellar Park',
      state: 'ACT',
      lat: -35.2000,
      lng: 149.1000,
      competition: 'NPL'
    },
    {
      id: 'Q808080',
      name: 'Darwin Olympic',
      leagueId: 'Q909090',
      league: 'NPL Northern Territory',
      leagueLevel: 2,
      stadium: 'Darwin Football Stadium',
      state: 'NT',
      lat: -12.4000,
      lng: 130.8000,
      competition: 'NPL'
    }
  ];

  return sampleClubs;
}

/**
 * Main function to generate clubs data
 */
async function fetchClubs() {
  try {
    console.log('Creating sample clubs data...');
    
    const clubs = createSampleClubs();
    
    console.log(`Generated ${clubs.length} sample clubs`);
    
    const outputPath = join(__dirname, '..', 'data', 'clubs_au.json');
    writeFileSync(outputPath, JSON.stringify(clubs, null, 2));
    
    console.log(`✅ Saved to ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error creating clubs data:', error);
    process.exit(1);
  }
}

fetchClubs();