# TurfBooking - Sports Turf Booking SAAS Application

A comprehensive, full-stack SAAS application for booking sports turfs built with Next.js 14, TypeScript, PostgreSQL, and Prisma.

## 🌟 Features

### For Customers
- **Browse Turfs**: Search and filter turfs by city, sport type, and availability
- **Real-time Booking**: Book time slots with instant confirmation
- **Booking Management**: View and manage your bookings
- **Review System**: Rate and review turfs after use
- **Secure Payments**: Integrated payment gateway for safe transactions

### For Turf Owners
- **Turf Management**: Add, edit, and manage your turfs
- **Booking Overview**: View all bookings and revenue
- **Availability Management**: Set operating hours and manage time slots
- **Analytics Dashboard**: Track earnings and booking patterns

### For Platform Admin
- **User Management**: Manage all users (customers and turf owners)
- **Turf Verification**: Review and approve new turf listings
- **Analytics**: Platform-wide statistics and insights
- **Payment Management**: Monitor transactions and payouts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Validation**: Zod
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd turf-booking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Payment Gateway (Stripe/Razorpay)
# STRIPE_SECRET_KEY=""
# STRIPE_PUBLISHABLE_KEY=""
```

### 4. Set up the database

```bash
# Push the schema to your database
npx prisma db push

# Or run migrations (in production)
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── turfs/             # Turf management
│   │   ├── bookings/          # Booking management
│   │   ├── users/             # User management
│   │   └── admin/             # Admin operations
│   ├── dashboard/             # Dashboard pages
│   │   ├── customer/          # Customer dashboard
│   │   ├── turf_owner/        # Turf owner dashboard
│   │   └── admin/             # Admin dashboard
│   ├── turfs/                 # Public turf pages
│   ├── auth/                  # Auth pages (signin/signup)
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── navbar.tsx             # Navigation bar
│   └── providers.tsx          # Context providers
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # NextAuth configuration
│   └── utils.ts               # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## 🗄️ Database Schema

### User Roles
- **CUSTOMER**: Regular users who book turfs
- **TURF_OWNER**: Owners who manage turfs
- **ADMIN**: Platform administrators

### Main Models
- **User**: User accounts with role-based access
- **Turf**: Sports turf listings
- **Booking**: Booking records
- **Payment**: Payment transactions
- **Review**: User reviews for turfs

## 🔐 Authentication

The application uses NextAuth.js with credential-based authentication:

1. **Registration**: POST `/api/auth/register`
2. **Login**: POST `/api/auth/signin`
3. **Logout**: GET `/api/auth/signout`

Protected routes require authentication and check user roles.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Turfs
- `GET /api/turfs` - List all turfs (with filters)
- `POST /api/turfs` - Create new turf (turf owner only)
- `GET /api/turfs/[id]` - Get turf details
- `PUT /api/turfs/[id]` - Update turf (owner/admin only)
- `DELETE /api/turfs/[id]` - Delete turf (owner/admin only)

### Bookings
- `GET /api/bookings` - List bookings (filtered by user)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Users
- `GET /api/users/[id]` - Get user profile
- `PUT /api/users/[id]` - Update user profile

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - Platform statistics

## 🎨 Customization

### Theming
Update colors in `app/globals.css`:
- Primary color: Green (#16a34a)
- Customize other colors in the CSS variables

### Adding New Features
1. Create API route in `app/api/`
2. Add database model in `prisma/schema.prisma`
3. Run `npx prisma generate` and `npx prisma db push`
4. Create frontend pages/components
5. Update types if needed

## 🚦 Development Workflow

1. **Start development server**: `npm run dev`
2. **View Prisma Studio**: `npx prisma studio`
3. **Run linting**: `npm run lint`
4. **Build for production**: `npm run build`
5. **Start production server**: `npm start`

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy the `.next` folder
5. Run database migrations

## 🔒 Security

- Passwords are hashed with bcrypt
- JWT tokens for session management
- Protected API routes with role-based access
- Input validation with Zod
- SQL injection prevention via Prisma

## 🧪 Testing

```bash
# Run tests (add test scripts)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For support, email support@turfbooking.com or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Email verification
- [ ] SMS notifications
- [ ] Advanced search with maps
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Loyalty program
- [ ] Referral system
- [ ] Advanced analytics dashboard

## 👥 Authors

Built with ❤️ by the TurfBooking Team

---

**Note**: Remember to update the `NEXTAUTH_SECRET` in production with a secure random string!
