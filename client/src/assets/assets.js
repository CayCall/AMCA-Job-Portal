import logo from "./Logo_Small.png";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import profile_img from "./profile_img.png";
import app_main_img from "./app_main_img.png";
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import profile_upload_icon from './profile_upload_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import resume_download_icon from './resume_download_icon.svg'
import delete_icon from './delete_icon.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import fakeCompanyOne from './fakeCompany1.jpeg'
import fakeCompanyTwo from './fakeCompany2.jpeg'
import fakeCompanyThree from './fakeCompany3.png'
import hide from './hide.png'
import show from './show.png'

export const assets = {
    logo,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    app_main_img,
    play_store,
    app_store,
    back_arrow_icon,
    left_arrow_icon,
    right_arrow_icon,
    location_icon,
    money_icon,
    suitcase_icon,
    person_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    home_icon,
    add_icon,
    person_tick_icon,
    resume_download_icon,
    profile_img,
    delete_icon,
    profile_upload_icon,
    email_icon,
    lock_icon,
    fakeCompanyOne,
    fakeCompanyTwo,
    fakeCompanyThree,
    hide,
    show
}
export const JobCategories = [
    // Core trades
    "Construction", "Plumbing", "Electrical", "Carpentry",
    "Painting", "Welding",

    // Domestic & service
    "Housekeeper", "Nanny / Childminder", "Gardener",
    "Cook / Home Chef", "Driver", "Handyman", "Cleaner",

    // Home & repair
    "Security Guard", "Appliance Repair", "Pest Control"
];


export const JobLocations = [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "Polokwane",
    "Nelspruit",
    "Kimberley",
    "East London"
];


// Sample data for Manage Jobs Page
export const manageJobsData = [
    { _id: 1, title: "Construction Worker", date: 1729102298497, location: "Johannesburg", applicants: 12 },
    { _id: 2, title: "Electrician", date: 1729102298497, location: "Cape Town", applicants: 8 },
    { _id: 3, title: "Plumber", date: 1729102298497, location: "Durban", applicants: 5 },
    { _id: 4, title: "Welder", date: 1729102298497, location: "Pretoria", applicants: 10 }
];

// Sample data for Profile Page
export const jobsApplied = [
    {
        company: 'Murray & Roberts',
        title: 'Construction Worker',
        location: 'Cape Town',
        date: '22 Aug, 2024',
        status: 'Pending',
        logo: company_icon,
    },
    {
        company: 'Eskom',
        title: 'Electrician',
        location: 'Johannesburg',
        date: '22 Aug, 2024',
        status: 'Rejected',
        logo: company_icon,
    },
    {
        company: 'AfriSam',
        title: 'Welder',
        location: 'Durban',
        date: '25 Sep, 2024',
        status: 'Accepted',
        logo: company_icon,
    },
    {
        company: 'Transnet',
        title: 'Plumber',
        location: 'Port Elizabeth',
        date: '15 Oct, 2024',
        status: 'Pending',
        logo: company_icon,
    },
    {
        company: 'Sasol',
        title: 'HVAC Technician',
        location: 'Pretoria',
        date: '25 Sep, 2024',
        status: 'Accepted',
        logo: company_icon,
    },
];

export const viewApplicationsPageData = [
    { _id: 1, name: "Sipho Dlamini", jobTitle: "Construction Worker", location: "Johannesburg", imgSrc: profile_img },
    { _id: 2, name: "Thabo Mokoena", jobTitle: "Electrician", location: "Cape Town", imgSrc: profile_img },
    { _id: 3, name: "Ayanda Nkosi", jobTitle: "Welder", location: "Durban", imgSrc: profile_img },
    { _id: 4, name: "Lerato Molefe", jobTitle: "Plumber", location: "Port Elizabeth", imgSrc: profile_img },
    { _id: 5, name: "Mpho Khumalo", jobTitle: "HVAC Technician", location: "Pretoria", imgSrc: profile_img },
    { _id: 6, name: "Nomvula Ndlovu", jobTitle: "Painter", location: "Bloemfontein", imgSrc: profile_img },
    { _id: 7, name: "Tshepo Mahlangu", jobTitle: "Mason", location: "East London", imgSrc: profile_img },
];


export const jobsData = [
    {
        _id: '1',
        title: "Construction Worker",
        location: "Durban",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0001-0000-0000-000000000001",
            name: "Mzansi Builders Ltd",
            email: "hr@mzansibuildersltd.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
      <p>We are hiring a dedicated Construction Worker to join our team in Durban. This role requires a dependable and skilled individual that is able to work in a fast-paced environment.<!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Perform assigned construction tasks safely and efficiently.</li>
          <li>Work collaboratively with other team members and supervisors.</li>
          <li>Ensure adherence to health and safety standards at all times.</li>
          <li>Report on daily progress and site conditions.</li>
          <li>Maintain tools and equipment in good working condition.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in construction or related field.</li>
          <li>Physical fitness and ability to handle tools/materials.</li>
          <li>Attention to detail and commitment to quality.</li>
          <li>Strong work ethic and reliability.</li>
          <li>Ability to follow instructions and work under supervision.</li>
      </ol>
    `,
        salary: 28000,
        date: 1729580000000,
        category: "Construction",
    },
    {
        _id: '2',
        title: "Electrician",
        location: "Johannesburg",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0002-0000-0000-000000000002",
            name: "Eskom Holdings",
            email: "hr@eskomholdings.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
      <p>We are hiring a dedicated Electrician to join our team in Johannesburg. This role requires a dependable and skilled individual capable of delivering high-quality work in a fast-paced environment. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Install, maintain and repair electrical systems.</li>
          <li>Work collaboratively with other team members and supervisors.</li>
          <li>Ensure adherence to health and safety standards at all times.</li>
          <li>Diagnose electrical problems and provide solutions.</li>
          <li>Maintain tools and equipment in good working condition.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Valid electrician certification.</li>
          <li>Experience in electrical installation and repair.</li>
          <li>Attention to detail and commitment to safety.</li>
          <li>Strong work ethic and reliability.</li>
          <li>Ability to read technical diagrams and blueprints.</li>
      </ol>
    `,
        salary: 23000,
        date: 1729650000000,
        category: "Electrical",
    },
    {
        _id: '3',
        title: "Plumber",
        location: "Cape Town",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0003-0000-0000-000000000003",
            name: "Cape Plumbing Services",
            email: "hr@capeplumbing.co.za",
            image: "company_icon",
        },
        description: `
      <p>We are hiring a dedicated Plumber to join our team in Cape Town. This role requires a dependable and skilled individual capable of delivering high-quality work in a fast-paced environment. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Install and repair plumbing systems.</li>
          <li>Work collaboratively with other team members and supervisors.</li>
          <li>Ensure adherence to health and safety standards at all times.</li>
          <li>Diagnose plumbing issues and provide solutions.</li>
          <li>Maintain tools and equipment in good working condition.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Valid plumbing certification or apprenticeship.</li>
          <li>Basic experience with plumbing tools and systems.</li>
          <li>Attention to detail and commitment to safety.</li>
          <li>Strong work ethic and reliability.</li>
          <li>Ability to follow technical instructions.</li>
      </ol>
    `,
        salary: 19000,
        date: 1729600000000,
        category: "Plumbing",
    },
    {
        _id: '4',
        title: "Welder",
        location: "Port Elizabeth",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0004-0000-0000-000000000004",
            name: "PE Welding Co.",
            email: "hr@pewelding.co.za",
            image: "company_icon",
        },
        description: `
      <p>Seeking a skilled Welder for our Port Elizabeth branch. Candidate must be proficient with various welding techniques and safety procedures. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Perform welding tasks according to specifications.</li>
          <li>Inspect and maintain welding equipment.</li>
          <li>Ensure compliance with safety standards.</li>
          <li>Collaborate with team members on projects.</li>
          <li>Report on daily progress and any issues.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Certification in welding techniques.</li>
          <li>Experience with MIG, TIG, and ARC welding.</li>
          <li>Strong attention to safety and detail.</li>
          <li>Physical stamina and manual dexterity.</li>
          <li>Ability to read blueprints and technical drawings.</li>
      </ol>
    `,
        salary: 25000,
        date: 1729670000000,
        category: "Welding",
    },
    {
        _id: '5',
        title: "Carpenter",
        location: "Bloemfontein",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0005-0000-0000-000000000005",
            name: "Free State Carpentry",
            email: "hr@freestatecarpentry.co.za",
            image: "fakeCompanyOne",
        },
        description: `
      <p>Experienced Carpenter needed for residential and commercial projects in Bloemfontein. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Measure, cut, and assemble wood materials.</li>
          <li>Construct frameworks, partitions, and furniture.</li>
          <li>Follow blueprints and design plans.</li>
          <li>Maintain tools and job site safety.</li>
          <li>Collaborate with clients and contractors.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Proven carpentry experience.</li>
          <li>Knowledge of woodworking tools and materials.</li>
          <li>Strong attention to detail.</li>
          <li>Ability to read technical drawings.</li>
          <li>Physical stamina and problem-solving skills.</li>
      </ol>
    `,
        salary: 27000,
        date: 1729680000000,
        category: "Carpentry",
    },
    {
        _id: '6',
        title: "Landscaper",
        location: "Pretoria",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0006-0000-0000-000000000006",
            name: "Pretoria Gardens",
            email: "hr@pretoriagardens.co.za",
            image: "company_icon",
        },
        description: `
      <p>We are looking for a passionate Landscaper to help maintain and beautify outdoor spaces in Pretoria. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Plant, prune, and maintain shrubs, flowers, and trees.</li>
          <li>Operate gardening equipment safely.</li>
          <li>Maintain irrigation systems.</li>
          <li>Follow landscape plans and instructions.</li>
          <li>Maintain cleanliness and orderliness of work areas.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Basic knowledge of horticulture.</li>
          <li>Physical fitness and stamina.</li>
          <li>Attention to detail and creativity.</li>
          <li>Ability to work outdoors in various weather conditions.</li>
          <li>Team player with good communication skills.</li>
      </ol>
    `,
        salary: 16000,
        date: 1729620000000,
        category: "Landscaping",
    },
    {
        _id: '7',
        title: "Factory Worker",
        location: "East London",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0007-0000-0000-000000000007",
            name: "East London Manufacturing",
            email: "hr@elm.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
      <p>Join our manufacturing team as a Factory Worker in East London. Responsible for assembly line and quality checks. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Operate machinery and perform assembly tasks.</li>
          <li>Conduct quality control inspections.</li>
          <li>Maintain a clean and safe work environment.</li>
          <li>Report defects or issues promptly.</li>
          <li>Collaborate with team to meet production goals.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in factory or assembly line work preferred.</li>
          <li>Good attention to detail.</li>
          <li>Ability to work on feet for extended periods.</li>
          <li>Strong teamwork and communication skills.</li>
          <li>Willingness to follow safety protocols.</li>
      </ol>
    `,
        salary: 18000,
        date: 1729630000000,
        category: "Manufacturing",
    },
    {
        _id: '8',
        title: "Truck Driver",
        location: "Polokwane",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0008-0000-0000-000000000008",
            name: "Limpopo Logistics",
            email: "hr@limpopologistics.co.za",
            image: "fakeCompanyOne",
        },
        description: `
      <p>Experienced Truck Driver needed for local and long-distance deliveries in Limpopo province. <!-- more --></p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Transport goods safely and on time.</li>
          <li>Perform vehicle inspections and maintenance checks.</li>
          <li>Ensure compliance with transport regulations.</li>
          <li>Maintain delivery logs and documentation.</li>
          <li>Communicate effectively with dispatch and clients.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Valid heavy vehicle driver’s license.</li>
          <li>Proven driving experience.</li>
          <li>Knowledge of road safety rules.</li>
          <li>Good communication and time management skills.</li>
          <li>Ability to handle stressful driving conditions.</li>
      </ol>
    `,
        salary: 26000,
        date: 1729690000000,
        category: "Logistics",
    },
    {
        _id: '9',
        title: "Painter",
        location: "Kimberley",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0009-0000-0000-000000000009",
            name: "Northern Cape Painters",
            email: "hr@ncpainters.co.za",
            image: "fakeCompanyOne",
        },
        description: `
      <p>Looking for a skilled Painter to work on residential and commercial projects in Kimberley. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Prepare surfaces for painting.</li>
          <li>Apply paints, varnishes, and stains.</li>
          <li>Maintain painting equipment.</li>
          <li>Ensure quality finishes and attention to detail.</li>
          <li>Follow health and safety regulations.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in painting and surface preparation.</li>
          <li>Steady hand and eye for detail.</li>
          <li>Knowledge of different paint types and applications.</li>
          <li>Ability to work on ladders and scaffolding.</li>
          <li>Good communication skills.</li>
      </ol>
    `,
        salary: 21000,
        date: 1729700000000,
        category: "Painting",
    },
    {
        _id: '10',
        title: "Roofer",
        location: "Nelspruit",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0010-0000-0000-000000000010",
            name: "Mpumalanga Roofing",
            email: "hr@mpumalangaroofing.co.za",
            image: "fakeCompanyOne",
        },
        description: `
      <p>Entry-level Roofer wanted for residential roofing projects in Nelspruit. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Assist in installation and repair of roofs.</li>
          <li>Handle roofing materials and tools safely.</li>
          <li>Follow supervisors' instructions carefully.</li>
          <li>Maintain clean work sites.</li>
          <li>Report any hazards or issues immediately.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Willingness to learn and work at heights.</li>
          <li>Basic knowledge of roofing materials preferred.</li>
          <li>Physical fitness and stamina.</li>
          <li>Good teamwork skills.</li>
          <li>Commitment to safety procedures.</li>
      </ol>
    `,
        salary: 17000,
        date: 1729710000000,
        category: "Roofing",
    },
    {
        _id: '11',
        title: "    ",
        location: "East Rand",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0011-0000-0000-000000000011",
            name: "Rand Labor Services",
            email: "hr@randlaborservices.co.za",
            image: "company_icon",
        },
        description: `
      <p>General laborer needed to assist in various manual tasks on construction and industrial sites in East Rand. <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Load and unload materials.</li>
          <li>Assist skilled workers as needed.</li>
          <li>Maintain clean and safe work areas.</li>
          <li>Follow all health and safety guidelines.</li>
          <li>Report any incidents or safety concerns.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Physical fitness and ability to work long hours.</li>
          <li>Reliability and punctuality.</li>
          <li>Good communication skills.</li>
          <li>Team player attitude.</li>
          <li>Basic understanding of safety practices.</li>
      </ol>
    `,
        salary: 15000,
        date: 1729720000000,
        category: "General Labor",
    },
    {
        _id: '12',
        title: "Mason",
        location: "George",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0012-0000-0000-000000000012",
            name: "Garden Route Masons",
            email: "hr@gardenroutemasons.co.za",
            image: "fakeCompanyThree",
        },
        description: `
      <p>Seeking a Mason with experience in bricklaying and concrete work in George.  <!-- more --> </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Build and repair walls, foundations, and other structures.</li>
          <li>Mix and apply mortar.</li>
          <li>Follow blueprints and specifications.</li>
          <li>Maintain tools and job site safety.</li>
          <li>Work collaboratively with other tradespeople.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in masonry work.</li>
          <li>Attention to detail and precision.</li>
          <li>Physical strength and stamina.</li>
          <li>Ability to read technical drawings.</li>
          <li>Strong work ethic.</li>
      </ol>
    `,
        salary: 24000,
        date: 1729730000000,
        category: "Masonry",
    },
    {
        _id: '13',
        title: "Heavy Equipment Operator",
        location: "Welkom",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0013-0000-0000-000000000013",
            name: "Goldfields Equipment",
            email: "hr@goldfieldsequipment.co.za",
            image: "company_icon",
        },
        description: `
      <p>Experienced Heavy Equipment Operator required for mining and construction projects in Welkom.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Operate bulldozers, excavators, and other heavy machinery.</li>
          <li>Perform routine maintenance checks.</li>
          <li>Follow safety protocols and company procedures.</li>
          <li>Communicate with site supervisors effectively.</li>
          <li>Ensure efficient and safe operation of equipment.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Valid heavy equipment operator certification.</li>
          <li>Experience operating heavy machinery.</li>
          <li>Good mechanical knowledge.</li>
          <li>Strong focus on safety.</li>
          <li>Ability to work independently and in teams.</li>
      </ol>
    `,
        salary: 30000,
        date: 1729740000000,
        category: "Heavy Machinery",
    },
    {
        _id: '14',
        title: "Bricklayer",
        location: "Pietermaritzburg",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0014-0000-0000-000000000014",
            name: "KZN Bricklayers",
            email: "hr@kznbricklayers.co.za",
            image: "company_icon",
        },
        description: `
      <p>Looking for a skilled Bricklayer for residential construction projects in Pietermaritzburg.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Lay bricks and blocks according to plans.</li>
          <li>Mix mortar and apply to bricks.</li>
          <li>Ensure work quality and safety standards.</li>
          <li>Maintain tools and equipment.</li>
          <li>Collaborate with other tradesmen on site.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Proven experience in bricklaying.</li>
          <li>Strong attention to detail.</li>
          <li>Physical fitness and stamina.</li>
          <li>Ability to read technical drawings.</li>
          <li>Commitment to safety procedures.</li>
      </ol>
    `,
        salary: 22000,
        date: 1729750000000,
        category: "Bricklaying",
    },
    {
        _id: '15',
        title: "Ironworker",
        location: "Mthatha",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0015-0000-0000-000000000015",
            name: "Eastern Cape Ironworks",
            email: "hr@ecironworks.co.za",
            image: "fakeCompanyThree",
        },
        description: `
      <p>Ironworker needed for structural steel installation projects in Mthatha.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Cut, shape, and install steel components.</li>
          <li>Operate ironworking tools and machinery.</li>
          <li>Follow blueprints and specifications.</li>
          <li>Maintain safety and equipment standards.</li>
          <li>Collaborate with construction teams.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in ironworking or structural steel work.</li>
          <li>Physical strength and dexterity.</li>
          <li>Knowledge of safety standards.</li>
          <li>Ability to read blueprints.</li>
          <li>Strong work ethic and reliability.</li>
      </ol>
    `,
        salary: 28000,
        date: 1729760000000,
        category: "Ironwork",
    },
    {
        _id: '16',
        title: "Scaffolder",
        location: "Kimberley",
        level: "Intermediate Level",
        companyId: {
            _id: "1a2b3c4d-0016-0000-0000-000000000016",
            name: "Northern Cape Scaffolders",
            email: "hr@northerncapescaffolders.co.za",
            image: "company_icon",
        },
        description: `
      <p>Skilled Scaffolder required for construction projects in Kimberley.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Assemble and dismantle scaffolding structures.</li>
          <li>Inspect scaffolding for safety compliance.</li>
          <li>Work at heights with proper safety gear.</li>
          <li>Communicate with site managers and workers.</li>
          <li>Maintain equipment and tools.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Certification in scaffolding.</li>
          <li>Experience with scaffolding assembly.</li>
          <li>Good balance and physical fitness.</li>
          <li>Knowledge of safety protocols.</li>
          <li>Teamwork and communication skills.</li>
      </ol>
    `,
        salary: 22000,
        date: 1729770000000,
        category: "Scaffolding",
    },
    {
        _id: '17',
        title: "Drywall Installer",
        location: "Johannesburg",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0017-0000-0000-000000000017",
            name: "Joburg Interiors",
            email: "hr@joburginteriors.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
      <p>Looking for an entry-level Drywall Installer to assist on commercial and residential projects.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Install drywall panels as directed.</li>
          <li>Assist with measuring and cutting drywall.</li>
          <li>Maintain clean work areas.</li>
          <li>Follow safety guidelines at all times.</li>
          <li>Work under supervision and complete tasks timely.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Willingness to learn drywall installation.</li>
          <li>Basic manual dexterity.</li>
          <li>Physical stamina.</li>
          <li>Good communication and teamwork skills.</li>
          <li>Commitment to workplace safety.</li>
      </ol>
    `,
        salary: 17000,
        date: 1729780000000,
        category: "Drywall Installation",
    },
    {
        _id: '18',
        title: "Roof Installer",
        location: "Cape Town",
        level: "Senior Level",
        companyId: {
            _id: "1a2b3c4d-0018-0000-0000-000000000018",
            name: "Cape Roofers",
            email: "hr@caperoofers.co.za",
            image: "fakeCompanyOne",
        },
        description: `
      <p>Experienced Roof Installer needed for high-end residential projects in Cape Town.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Install roofing materials to specifications.</li>
          <li>Ensure all installations comply with safety standards.</li>
          <li>Maintain tools and equipment.</li>
          <li>Inspect roofs for damage and perform repairs.</li>
          <li>Work collaboratively with project managers.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Proven experience in roof installation.</li>
          <li>Strong understanding of roofing materials and techniques.</li>
          <li>Excellent safety record.</li>
          <li>Good physical condition and stamina.</li>
          <li>Ability to work at heights and in various weather conditions.</li>
      </ol>
    `,
        salary: 29000,
        date: 1729790000000,
        category: "Roofing",
    },
    {
        _id: '19',
        title: "Industrial Cleaner",
        location: "Durban",
        level: "Beginner Level",
        companyId: {
            _id: "1a2b3c4d-0019-0000-0000-000000000019",
            name: "Durban Industrial Cleaning",
            email: "hr@durbancleaning.co.za",
            image: "fakeCompanyThree",
        },
        description: `
      <p>Seeking an Industrial Cleaner for factory and construction site cleaning.  <!-- more -->  </p>
      <h2><strong>Key Responsibilities</strong></h2>
      <ol>
          <li>Clean industrial equipment and work areas.</li>
          <li>Dispose of waste safely and according to guidelines.</li>
          <li>Maintain cleaning supplies and equipment.</li>
          <li>Follow safety protocols at all times.</li>
          <li>Report any maintenance issues or hazards.</li>
      </ol>
      <h2><strong>Skills Required</strong></h2>
      <ol>
          <li>Experience in industrial cleaning preferred.</li>
          <li>Physical fitness.</li>
          <li>Attention to detail.</li>
          <li>Ability to work independently and in teams.</li>
          <li>Commitment to health and safety standards.</li>
      </ol>
    `,
        salary: 15000,
        date: 1729800000000,
        category: "Cleaning",
    },
    {
        _id: '20',
        title: "Tile Installer",
        location: "Bloemfontein",
        level: "Intermediate Level",
        companyId: {
            _id: "671a9e45cf7c3a9e2bf367d4",
            name: "Free State Tiling",
            email: "info@freestatetiling.co.za",
            image: "fakeCompanyThree",
        },
        description: `
    <p>Install ceramic, porcelain, and natural stone tiles for residential and commercial projects.  <!-- more -->  </p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
      <li>Prepare surfaces for tile installation.</li>
      <li>Cut and fit tiles according to specifications.</li>
      <li>Apply adhesives and grout to secure tiles.</li>
      <li>Ensure all work meets safety and quality standards.</li>
      <li>Maintain clean and organized work sites.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
      <li>Experience with tile cutting tools and techniques.</li>
      <li>Attention to detail and precision.</li>
      <li>Good physical stamina.</li>
      <li>Ability to read blueprints and plans.</li>
      <li>Commitment to workplace safety.</li>
    </ol>
  `,
        salary: 18000,
        date: 1729800000000,
        category: "Tiling",
    },
    {
        _id: '21',
        title: "Welding Technician",
        location: "East London",
        level: "Senior Level",
        companyId: {
            _id: "671a9e45cf7c3a9e2bf367d5",
            name: "Eastern Cape Welders",
            email: "contact@ecwelders.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
    <p>Perform welding operations on metal structures, machinery, and equipment following safety protocols.  <!-- more -->  </p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
      <li>Read and interpret welding blueprints and schematics.</li>
      <li>Operate welding machines and tools safely.</li>
      <li>Inspect welded joints for quality assurance.</li>
      <li>Maintain welding equipment and tools.</li>
      <li>Ensure compliance with safety regulations.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
      <li>Certified welder with experience in MIG, TIG, and arc welding.</li>
      <li>Strong attention to detail and quality control.</li>
      <li>Ability to work in confined spaces and at heights.</li>
      <li>Good physical fitness.</li>
      <li>Knowledge of safety standards and PPE usage.</li>
    </ol>
  `,
        salary: 28000,
        date: 1729800000000,
        category: "Welding",
    },
    {
        _id: '22',
        title: "Crane Operator",
        location: "Durban",
        level: "Senior Level",
        companyId: {
            _id: "671a9e45cf7c3a9e2bf367d6",
            name: "Durban Heavy Lifting",
            email: "info@durbanhl.co.za",
            image: "fakeCompanyOne",
        },
        description: `
    <p>Operate cranes to lift, move, and position heavy materials and equipment safely on construction sites.  <!-- more -->  </p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
      <li>Inspect crane before operation to ensure safety and functionality.</li>
      <li>Coordinate with site supervisors and workers to move loads.</li>
      <li>Maintain logs of crane usage and maintenance.</li>
      <li>Follow all safety guidelines and procedures.</li>
      <li>Assist in rigging and signaling during lifting operations.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
      <li>Certified crane operator license.</li>
      <li>Strong attention to safety procedures.</li>
      <li>Excellent hand-eye coordination and spatial awareness.</li>
      <li>Ability to work under pressure in outdoor conditions.</li>
      <li>Good communication skills.</li>
    </ol>
  `,
        salary: 32000,
        date: 1729800000000,
        category: "Heavy Machinery",
    },
    {
        _id: '23',
        title: "Electrician",
        location: "Pretoria",
        level: "Intermediate Level",
        companyId: {
            _id: "671a9e45cf7c3a9e2bf367d7",
            name: "Pretoria Electricals",
            email: "contact@pretoriaelectricals.co.za",
            image: "fakeCompanyTwo",
        },
        description: `
    <p>Install, maintain, and repair electrical wiring, equipment, and fixtures in residential and commercial buildings.  <!-- more -->  </p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
      <li>Inspect electrical systems to identify hazards and malfunctions.</li>
      <li>Install wiring and electrical fixtures according to building codes.</li>
      <li>Test electrical systems and continuity of circuits.</li>
      <li>Follow all safety standards and regulations.</li>
      <li>Maintain documentation of electrical work performed.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
      <li>Certified electrician with practical experience.</li>
      <li>Good knowledge of electrical codes and standards.</li>
      <li>Strong problem-solving skills.</li>
      <li>Ability to work independently and in teams.</li>
      <li>Commitment to health and safety standards.</li>
    </ol>
  `,
        salary: 23000,
        date: 1729800000000,
        category: "Electrical",
    },
];





























