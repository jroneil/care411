
import { PrismaClient, EventCategory, ContactStatus, PaymentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create additional admin user as requested
  const hashedPassword2 = await bcrypt.hash('CaresMV2024!', 10)
  const mainAdmin = await prisma.user.upsert({
    where: { email: 'admin@411caresmerrimackvalley.org' },
    update: {},
    create: {
      email: 'admin@411caresmerrimackvalley.org',
      password: hashedPassword2,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created main admin user:', mainAdmin.email)

  // Create sample events
  const events = [
    {
      title: 'Community Food Distribution',
      description: 'Monthly food distribution event helping families in need. Volunteers will help sort, pack, and distribute food items to community members.',
      location: 'Haverhill Community Center',
      address: '35 Winter St, Haverhill, MA 01830',
      startDate: new Date('2024-12-15T09:00:00'),
      endDate: new Date('2024-12-15T12:00:00'),
      startTime: '9:00 AM',
      endTime: '12:00 PM',
      category: EventCategory.FOOD_DISTRIBUTION,
      maxVolunteers: 20,
      currentVolunteers: 5,
      imageUrl: 'https://thumbs.dreamstime.com/b/volunteers-share-food-to-fortunate-multiethnic-voluntary-individuals-distribute-donated-food-extending-helping-hand-to-311455682.jpg',
      contactEmail: 'events@411caresmerrimackvalley.org',
      contactPhone: '(978) 857-7696',
      requirements: 'Volunteers should be able to lift up to 30 lbs. All volunteers welcome!',
      createdById: adminUser.id,
    },
    {
      title: 'Holiday Toy Drive Sorting',
      description: 'Help us sort and organize donated toys for local families. This is a great event for families to volunteer together.',
      location: 'Bradford Elementary School',
      address: '5 Chadwick St, Bradford, MA 01835',
      startDate: new Date('2024-12-20T10:00:00'),
      endDate: new Date('2024-12-20T14:00:00'),
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      category: 'SEASONAL' as const,
      maxVolunteers: 15,
      currentVolunteers: 3,
      imageUrl: 'https://d12m9erqbesehq.cloudfront.net/wp-content/uploads/sites/2/2024/05/20003908/Provide-Support.jpg',
      contactEmail: 'events@411caresmerrimackvalley.org',
      contactPhone: '(978) 857-7696',
      requirements: 'Family-friendly event. Children under 12 must be supervised by an adult.',
      createdById: adminUser.id,
    },
    {
      title: 'New Volunteer Orientation',
      description: 'Learn about 411 Cares mission, volunteer opportunities, and meet other community helpers. Light refreshments provided.',
      location: '411 Cares Office',
      address: 'Haverhill, MA (address provided upon registration)',
      startDate: new Date('2024-12-10T18:00:00'),
      endDate: new Date('2024-12-10T19:30:00'),
      startTime: '6:00 PM',
      endTime: '7:30 PM',
      category: EventCategory.VOLUNTEER_TRAINING,
      maxVolunteers: 25,
      currentVolunteers: 8,
      imageUrl: 'https://media.istockphoto.com/id/1496112689/photo/young-multiracial-group-stacking-hands-together-happy-diverse-friends-united-at-community.jpg?s=612x612&w=0&k=20&c=ARk3sEhEElK3M27oN-VcVNtAEULHJzZetRihjLsXuu8=',
      contactEmail: 'volunteer@411caresmerrimackvalley.org',
      contactPhone: '(978) 857-7696',
      requirements: 'No experience necessary. Bring a positive attitude and willingness to help!',
      createdById: adminUser.id,
    },
  ]

  for (const event of events) {
    await prisma.event.create({
      data: event,
    })
  }

  console.log('✅ Created sample events')

  // Create sample volunteers
  const volunteers = [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(978) 123-4567',
      city: 'Haverhill',
      zipCode: '01830',
      skills: 'Event planning, Social media, Customer service',
      availability: 'Weekends, Thursday evenings',
      interests: 'Food distribution, Community events',
      experience: 'Volunteered at local food bank for 2 years',
      emergencyContact: 'Mike Johnson',
      emergencyPhone: '(978) 123-4568',
    },
    {
      firstName: 'David',
      lastName: 'Martinez',
      email: 'david.martinez@email.com',
      phone: '(978) 234-5678',
      city: 'Lawrence',
      zipCode: '01841',
      skills: 'Translation (Spanish), Construction, Driving',
      availability: 'Flexible schedule',
      interests: 'Home repairs, Food distribution, Youth programs',
      experience: 'New to volunteering, eager to help the community',
      emergencyContact: 'Maria Martinez',
      emergencyPhone: '(978) 234-5679',
    },
  ]

  for (const volunteer of volunteers) {
    await prisma.volunteer.create({
      data: volunteer,
    })
  }

  console.log('✅ Created sample volunteers')

  // Create sample contact submissions
  const contacts = [
    {
      name: 'Jennifer Smith',
      email: 'jennifer.smith@email.com',
      phone: '(978) 345-6789',
      subject: 'Volunteer Inquiry',
      message: 'Hi, I\'m interested in volunteering for food distribution events. What is the next step to get involved?',
      status: ContactStatus.NEW,
    },
    {
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      subject: 'Donation Question',
      message: 'I would like to make a monthly donation. Do you have any recurring donation options?',
      status: ContactStatus.NEW,
    },
  ]

  for (const contact of contacts) {
    await prisma.contactSubmission.create({
      data: contact,
    })
  }

  console.log('✅ Created sample contact submissions')

  // Create sample donation records (from past donations)
  const donations = [
    {
      stripePaymentId: 'pi_test_1234567890',
      amount: 50.00,
      donorName: 'Anonymous Donor',
      donorEmail: 'donor1@example.com',
      message: 'Keep up the great work helping our community!',
      isAnonymous: true,
      status: PaymentStatus.COMPLETED,
    },
    {
      stripePaymentId: 'pi_test_2345678901',
      amount: 100.00,
      donorName: 'Lisa Thompson',
      donorEmail: 'lisa.thompson@email.com',
      message: 'Thank you for all you do for Haverhill families.',
      isAnonymous: false,
      status: PaymentStatus.COMPLETED,
    },
  ]

  for (const donation of donations) {
    await prisma.donation.create({
      data: {
        ...donation,
        status: donation.status as PaymentStatus,
      },
    })
  }

  console.log('✅ Created sample donations')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
