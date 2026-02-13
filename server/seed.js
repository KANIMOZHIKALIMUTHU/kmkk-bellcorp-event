const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🌱 Seeding Bellcorp Events...');
    await Event.deleteMany({}); // Clear existing events
    
    const eventsData = [
      // Tech Events - Coimbatore
      {
        name: 'React Masterclass 2026',
        organizer: 'Bellcorp Studio',
        location: 'Coders Hub, Coimbatore',
        date: new Date('2026-03-15T18:00:00'),
        description: 'Advanced React Hooks, Context API, Performance optimization workshop',
        capacity: 35,
        category: 'Tech'
      },
      {
        name: 'Node.js Production Ready',
        organizer: 'Bellcorp Studio',
        location: 'RS Puram, Coimbatore',
        date: new Date('2026-04-10T10:00:00'),
        description: 'Scaling Node.js apps, clustering, microservices architecture',
        capacity: 50,
        category: 'Backend'
      },
      {
        name: 'MongoDB Atlas Masterclass',
        organizer: 'Bellcorp Tech',
        location: 'Gandhipuram, Coimbatore',
        date: new Date('2026-02-28T14:00:00'),
        description: 'Schema design, aggregation pipeline, Atlas deployment strategies',
        capacity: 25,
        category: 'Database'
      },

      // Music & Cultural Events
      {
        name: 'Carnatic Music Fusion Night',
        organizer: 'Coimbatore Arts Council',
        location: 'PSG Tech Auditorium, Coimbatore',
        date: new Date('2026-03-22T19:30:00'),
        description: 'Traditional Carnatic meets modern fusion with live orchestra',
        capacity: 200,
        category: 'Music'
      },
      {
        name: 'Kollywood Beats Live Concert',
        organizer: 'EventZone Entertainment',
        location: 'CODISSIA Trade Fair Complex',
        date: new Date('2026-04-05T20:00:00'),
        description: 'Top Tamil music artists performing live hits',
        capacity: 500,
        category: 'Music'
      },

      // Business & Professional
      {
        name: 'Startup Pitch Fest 2026',
        organizer: 'TiE Coimbatore',
        location: 'KG Choksi Hall, Coimbatore',
        date: new Date('2026-03-08T09:00:00'),
        description: '50+ startups pitching to investors and mentors',
        capacity: 150,
        category: 'Business'
      },
      {
        name: 'Digital Marketing Summit',
        organizer: 'Digital India Coimbatore',
        location: 'Hotel Le Meridien, Coimbatore',
        date: new Date('2026-04-20T09:30:00'),
        description: 'SEO, Social Media, AI Marketing strategies workshop',
        capacity: 100,
        category: 'Marketing'
      },

      // Sports & Fitness
      {
        name: 'Coimbatore Marathon 2026',
        organizer: 'Coimbatore Runners',
        location: 'Race Course, Coimbatore',
        date: new Date('2026-03-01T05:30:00'),
        description: '21K Half Marathon with medals and certificates',
        capacity: 800,
        category: 'Sports'
      },
      {
        name: 'Yoga Wellness Retreat',
        organizer: 'Art of Living Coimbatore',
        location: 'ISKCON Temple, Coimbatore',
        date: new Date('2026-02-25T06:00:00'),
        description: '3-day residential yoga and meditation retreat',
        capacity: 40,
        category: 'Fitness'
      },

      // Workshops & Training
      {
        name: 'Full Stack MERN Bootcamp',
        organizer: 'Bellcorp Academy',
        location: 'Online + Offline Hybrid',
        date: new Date('2026-03-20T09:00:00'),
        description: '5-day intensive MERN stack development training',
        capacity: 20,
        category: 'Training'
      },
      {
        name: 'AWS Cloud Practitioner',
        organizer: 'Cloud Academy Coimbatore',
        location: 'Ram Nagar, Coimbatore',
        date: new Date('2026-04-12T10:00:00'),
        description: 'AWS certification preparation workshop',
        capacity: 30,
        category: 'Cloud'
      },

      // Food & Culinary
      {
        name: 'Chettinad Food Festival',
        organizer: 'Coimbatore Foodies',
        location: 'UGS Race Course',
        date: new Date('2026-03-12T18:00:00'),
        description: 'Authentic Chettinad cuisine stalls and cooking demo',
        capacity: 300,
        category: 'Food'
      },
      {
        name: 'South Indian Dessert Workshop',
        organizer: 'Sweet Tooth Academy',
        location: 'RS Puram',
        date: new Date('2026-02-18T15:00:00'),
        description: 'Learn to make Mysore Pak, Laddu, Payasam',
        capacity: 15,
        category: 'Culinary'
      },

      // Kids & Family
      {
        name: 'Kids Coding Adventure Camp',
        organizer: 'CodeKids Coimbatore',
        location: 'Saibaba Colony',
        date: new Date('2026-04-01T09:00:00'),
        description: 'Scratch programming and robotics for ages 8-14',
        capacity: 25,
        category: 'Kids'
      },
      {
        name: 'Family Fun Fair 2026',
        organizer: 'Coimbatore Parents Association',
        location: 'VOC Park',
        date: new Date('2026-03-29T10:00:00'),
        description: 'Games, rides, food stalls, magic shows for families',
        capacity: 1000,
        category: 'Family'
      },

      // More Tech Events (Chennai)
      {
        name: 'DevOps Automation Summit',
        organizer: 'Bellcorp DevOps',
        location: 'Chennai Trade Centre',
        date: new Date('2026-04-25T09:00:00'),
        description: 'CI/CD pipelines, Docker, Kubernetes hands-on',
        capacity: 120,
        category: 'DevOps'
      },
      {
        name: 'Python Data Science Bootcamp',
        organizer: 'DataCamp India',
        location: 'Taramani, Chennai',
        date: new Date('2026-03-10T09:00:00'),
        description: 'Pandas, NumPy, Machine Learning with Python',
        capacity: 40,
        category: 'Data Science'
      },

      // Art & Photography
      {
        name: 'Street Photography Workshop',
        organizer: 'Coimbatore Photographers Club',
        location: 'RS Puram Streets',
        date: new Date('2026-02-22T07:00:00'),
        description: 'Urban photography field workshop',
        capacity: 12,
        category: 'Photography'
      },
      
      // Past Event (for dashboard testing)
      {
        name: 'New Year Tech Meetup 2026',
        organizer: 'Bellcorp',
        location: 'Coimbatore',
        date: new Date('2026-01-10T18:00:00'), // Past event
        description: 'New Year developer networking',
        capacity: 60,
        category: 'Networking'
      }
    ];

    const seededEvents = await Event.insertMany(eventsData);
    console.log(`✅ Successfully seeded ${seededEvents.length} events!`);
    console.log('🎉 Test these filters:');
    console.log('   - Tech events: /api/events?category=Tech');
    console.log('   - Coimbatore: /api/events?location=Coimbatore');
    console.log('   - Search React: /api/events?search=React');
    console.log('   - Upcoming: /api/events?dateFrom=2026-02-14');
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
