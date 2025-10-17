import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create comprehensive clubs data for FootyMapz - A-League and NPL only
 */
function createSampleClubs() {
  const sampleClubs = [
    // A-League Men Clubs
    {
      id: 'Q123456',
      name: 'Sydney FC',
      leagueId: 'Q789012',
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
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
      league: 'A-League',
      leagueLevel: 1,
      stadium: 'Sky Stadium',
      state: 'NSW', // Note: Wellington is in NZ but included for demo
      lat: -41.2731,
      lng: 174.7779,
      competition: 'ALM'
    },
    {
      id: 'Q111111',
      name: 'Macarthur FC',
      leagueId: 'Q789012',
      league: 'A-League',
      leagueLevel: 1,
      stadium: 'Campbelltown Stadium',
      state: 'NSW',
      lat: -34.0667,
      lng: 150.8167,
      competition: 'ALM'
    },
    {
      id: 'Q222222',
      name: 'Western United',
      leagueId: 'Q789012',
      league: 'A-League',
      leagueLevel: 1,
      stadium: 'GMHBA Stadium',
      state: 'VIC',
      lat: -38.1500,
      lng: 144.3500,
      competition: 'ALM'
    },
    // NPL NSW Clubs
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
      name: 'Sydney United 58',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Sydney United Sports Centre',
      state: 'NSW',
      lat: -33.9000,
      lng: 151.1000,
      competition: 'NPL'
    },
    {
      id: 'Q303030',
      name: 'APIA Leichhardt',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Lambert Park',
      state: 'NSW',
      lat: -33.8800,
      lng: 151.1500,
      competition: 'NPL'
    },
    {
      id: 'Q404040',
      name: 'Blacktown City',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Lily Homes Stadium',
      state: 'NSW',
      lat: -33.7700,
      lng: 150.9000,
      competition: 'NPL'
    },
    {
      id: 'Q505050',
      name: 'Manly United',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Cromer Park',
      state: 'NSW',
      lat: -33.8000,
      lng: 151.3000,
      competition: 'NPL'
    },
    {
      id: 'Q606060',
      name: 'Rockdale City Suns',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'Ilinden Sports Centre',
      state: 'NSW',
      lat: -33.9500,
      lng: 151.1000,
      competition: 'NPL'
    },
    {
      id: 'Q707070',
      name: 'Wollongong Wolves',
      leagueId: 'Q202020',
      league: 'NPL NSW',
      leagueLevel: 2,
      stadium: 'WIN Stadium',
      state: 'NSW',
      lat: -34.4000,
      lng: 150.9000,
      competition: 'NPL'
    },
    // NPL Victoria Clubs
    {
      id: 'Q808080',
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
      id: 'Q909090',
      name: 'South Melbourne',
      leagueId: 'Q303030',
      league: 'NPL Victoria',
      leagueLevel: 2,
      stadium: 'Lakeside Stadium',
      state: 'VIC',
      lat: -37.8500,
      lng: 144.9500,
      competition: 'NPL'
    },
    {
      id: 'Q010101',
      name: 'Heidelberg United',
      leagueId: 'Q303030',
      league: 'NPL Victoria',
      leagueLevel: 2,
      stadium: 'Olympic Village',
      state: 'VIC',
      lat: -37.7500,
      lng: 145.0500,
      competition: 'NPL'
    },
    {
      id: 'Q121212',
      name: 'Bentleigh Greens',
      leagueId: 'Q303030',
      league: 'NPL Victoria',
      leagueLevel: 2,
      stadium: 'Kingston Heath Soccer Complex',
      state: 'VIC',
      lat: -37.9000,
      lng: 145.1000,
      competition: 'NPL'
    },
    {
      id: 'Q232323',
      name: 'Oakleigh Cannons',
      leagueId: 'Q303030',
      league: 'NPL Victoria',
      leagueLevel: 2,
      stadium: 'Jack Edwards Reserve',
      state: 'VIC',
      lat: -37.9000,
      lng: 145.0000,
      competition: 'NPL'
    },
    // NPL Queensland Clubs
    {
      id: 'Q343434',
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
      id: 'Q454545',
      name: 'Gold Coast United',
      leagueId: 'Q404040',
      league: 'NPL Queensland',
      leagueLevel: 2,
      stadium: 'Robina Stadium',
      state: 'QLD',
      lat: -28.0000,
      lng: 153.4000,
      competition: 'NPL'
    },
    {
      id: 'Q565656',
      name: 'Lions FC',
      leagueId: 'Q404040',
      league: 'NPL Queensland',
      leagueLevel: 2,
      stadium: 'Lions Stadium',
      state: 'QLD',
      lat: -27.5000,
      lng: 153.1000,
      competition: 'NPL'
    },
    {
      id: 'Q676767',
      name: 'Olympic FC',
      leagueId: 'Q404040',
      league: 'NPL Queensland',
      leagueLevel: 2,
      stadium: 'Goodwin Park',
      state: 'QLD',
      lat: -27.5000,
      lng: 153.0000,
      competition: 'NPL'
    },
    // NPL South Australia Clubs
    {
      id: 'Q787878',
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
      id: 'Q898989',
      name: 'Adelaide Comets',
      leagueId: 'Q505050',
      league: 'NPL South Australia',
      leagueLevel: 2,
      stadium: 'Adelaide City Park',
      state: 'SA',
      lat: -34.9500,
      lng: 138.5500,
      competition: 'NPL'
    },
    {
      id: 'Q909090',
      name: 'Campbelltown City',
      leagueId: 'Q505050',
      league: 'NPL South Australia',
      leagueLevel: 2,
      stadium: 'Steve Woodcock Sports Centre',
      state: 'SA',
      lat: -34.8500,
      lng: 138.6500,
      competition: 'NPL'
    },
    // NPL Western Australia Clubs
    {
      id: 'Q010101',
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
      id: 'Q121212',
      name: 'Floreat Athena',
      leagueId: 'Q606060',
      league: 'NPL Western Australia',
      leagueLevel: 2,
      stadium: 'E&D Litis Stadium',
      state: 'WA',
      lat: -31.9500,
      lng: 115.8500,
      competition: 'NPL'
    },
    {
      id: 'Q232323',
      name: 'Bayswater City',
      leagueId: 'Q606060',
      league: 'NPL Western Australia',
      leagueLevel: 2,
      stadium: 'Frank Drago Reserve',
      state: 'WA',
      lat: -31.8500,
      lng: 115.9000,
      competition: 'NPL'
    },
    // NPL Tasmania Clubs
    {
      id: 'Q343434',
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
      id: 'Q454545',
      name: 'South Hobart',
      leagueId: 'Q707070',
      league: 'NPL Tasmania',
      leagueLevel: 2,
      stadium: 'South Hobart Oval',
      state: 'TAS',
      lat: -42.9000,
      lng: 147.3000,
      competition: 'NPL'
    },
    // NPL Capital Football Clubs
    {
      id: 'Q565656',
      name: 'Canberra Olympic',
      leagueId: 'Q808080',
      league: 'NPL Capital Football',
      leagueLevel: 2,
      stadium: 'O\'Connor Enclosed',
      state: 'ACT',
      lat: -35.2000,
      lng: 149.1000,
      competition: 'NPL'
    },
    {
      id: 'Q676767',
      name: 'Gungahlin United',
      leagueId: 'Q808080',
      league: 'NPL Capital Football',
      leagueLevel: 2,
      stadium: 'Gungahlin Enclosed',
      state: 'ACT',
      lat: -35.1500,
      lng: 149.1500,
      competition: 'NPL'
    },
    // NPL Northern Territory Clubs
    {
      id: 'Q787878',
      name: 'Darwin Olympic',
      leagueId: 'Q909090',
      league: 'NPL Northern Territory',
      leagueLevel: 2,
      stadium: 'Darwin Football Stadium',
      state: 'NT',
      lat: -12.4000,
      lng: 130.8000,
      competition: 'NPL'
    },
    {
      id: 'Q898989',
      name: 'Darwin Hearts',
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