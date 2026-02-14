# API Testing Guide - TurfBooking Application

This guide helps you test all the API endpoints using tools like Postman, Insomnia, or cURL.

## 🚀 Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Base URL: `http://localhost:3000`

3. Make sure your PostgreSQL database is running and configured in `.env`

## 📝 Testing Workflow

### Step 1: Register Users

Create users with different roles to test the complete system.

#### Register a Customer
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "CUSTOMER"
}
```

**Expected Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-..."
  }
}
```

#### Register a Turf Owner
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Turf Owner",
  "email": "owner@example.com",
  "password": "password123",
  "phone": "9876543211",
  "role": "TURF_OWNER"
}
```

#### Register an Admin
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "phone": "9876543212",
  "role": "ADMIN"
}
```

### Step 2: Login

Use NextAuth's callback URL to login. After registration, you can login through the UI or use the NextAuth endpoint.

For testing with Postman/cURL, you'll need to:
1. Login through the browser at `http://localhost:3000/api/auth/signin`
2. Copy the session cookie
3. Use it in your API requests

**Or use this test approach:**

After registering, you can directly use the credentials in protected routes by including the session cookie.

### Step 3: Create Turfs (Turf Owner)

**Login as Turf Owner first through the browser, then:**

```bash
POST http://localhost:3000/api/turfs
Content-Type: application/json
Cookie: next-auth.session-token=YOUR_SESSION_TOKEN

{
  "name": "Champions Cricket Ground",
  "description": "Premium cricket turf with professional facilities and lighting",
  "address": "123 Sports Complex, MG Road",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560001",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "type": "CRICKET",
  "pricePerHour": 1500,
  "images": [
    "https://example.com/turf1.jpg",
    "https://example.com/turf2.jpg"
  ],
  "amenities": [
    "Parking",
    "Changing Rooms",
    "Washrooms",
    "Drinking Water",
    "Floodlights",
    "Seating Area"
  ],
  "rules": [
    "No smoking",
    "Wear sports shoes only",
    "Respect other players",
    "Book minimum 1 hour in advance"
  ],
  "openTime": "06:00",
  "closeTime": "22:00"
}
```

**Expected Response (201):**
```json
{
  "message": "Turf created successfully",
  "turf": {
    "id": "clxxx...",
    "name": "Champions Cricket Ground",
    ...
  }
}
```

#### More Sample Turfs

**Football Turf:**
```json
{
  "name": "Victory Football Arena",
  "description": "5-a-side and 7-a-side football turf with artificial grass",
  "address": "456 Stadium Road",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "type": "FOOTBALL",
  "pricePerHour": 2000,
  "images": ["https://example.com/football1.jpg"],
  "amenities": ["Parking", "Washrooms", "Floodlights"],
  "rules": ["No spikes", "Minimum 2 hours booking"],
  "openTime": "07:00",
  "closeTime": "23:00"
}
```

**Badminton Court:**
```json
{
  "name": "Ace Badminton Courts",
  "description": "4 indoor badminton courts with wooden flooring",
  "address": "789 Sports Hub",
  "city": "Pune",
  "state": "Maharashtra",
  "pincode": "411001",
  "type": "BADMINTON",
  "pricePerHour": 500,
  "images": ["https://example.com/badminton1.jpg"],
  "amenities": ["AC", "Parking", "Lockers", "Cafeteria"],
  "rules": ["Indoor shoes mandatory", "No food inside court"],
  "openTime": "05:00",
  "closeTime": "22:00"
}
```

### Step 4: List Turfs (Public)

No authentication required.

```bash
GET http://localhost:3000/api/turfs
```

**With Filters:**
```bash
# Filter by city
GET http://localhost:3000/api/turfs?city=Bangalore

# Filter by type
GET http://localhost:3000/api/turfs?type=CRICKET

# Filter by owner
GET http://localhost:3000/api/turfs?ownerId=clxxx...

# Combine filters
GET http://localhost:3000/api/turfs?city=Mumbai&type=FOOTBALL
```

**Expected Response (200):**
```json
[
  {
    "id": "clxxx...",
    "name": "Champions Cricket Ground",
    "description": "...",
    "city": "Bangalore",
    "type": "CRICKET",
    "pricePerHour": 1500,
    "images": [...],
    "owner": {
      "id": "...",
      "name": "Turf Owner",
      "email": "owner@example.com"
    },
    "averageRating": 4.5,
    "_count": {
      "bookings": 25,
      "reviews": 10
    }
  }
]
```

### Step 5: Get Turf Details (Public)

```bash
GET http://localhost:3000/api/turfs/{turfId}
```

**Expected Response (200):**
```json
{
  "id": "clxxx...",
  "name": "Champions Cricket Ground",
  "description": "...",
  "address": "...",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560001",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "type": "CRICKET",
  "pricePerHour": 1500,
  "images": [...],
  "amenities": [...],
  "rules": [...],
  "openTime": "06:00",
  "closeTime": "22:00",
  "isActive": true,
  "owner": {
    "id": "...",
    "name": "Turf Owner",
    "email": "owner@example.com",
    "phone": "9876543211"
  },
  "reviews": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Excellent turf!",
      "createdAt": "...",
      "user": {
        "name": "John Doe",
        "image": null
      }
    }
  ],
  "bookings": [
    {
      "bookingDate": "2024-02-20T00:00:00.000Z",
      "startTime": "18:00",
      "endTime": "20:00",
      "status": "CONFIRMED"
    }
  ],
  "averageRating": 4.8
}
```

### Step 6: Create Booking (Customer)

**Login as Customer first, then:**

```bash
POST http://localhost:3000/api/bookings
Content-Type: application/json
Cookie: next-auth.session-token=YOUR_SESSION_TOKEN

{
  "turfId": "clxxx...",
  "bookingDate": "2024-02-25",
  "startTime": "18:00",
  "endTime": "20:00",
  "notes": "Birthday party booking"
}
```

**Expected Response (201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "clxxx...",
    "bookingDate": "2024-02-25T00:00:00.000Z",
    "startTime": "18:00",
    "endTime": "20:00",
    "totalHours": 2,
    "totalAmount": 3000,
    "status": "PENDING",
    "notes": "Birthday party booking",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "turf": {
      "id": "...",
      "name": "Champions Cricket Ground",
      "address": "...",
      "city": "Bangalore"
    }
  }
}
```

**Error Scenarios to Test:**

1. **Past Date:**
```json
{
  "turfId": "clxxx...",
  "bookingDate": "2024-01-01",
  "startTime": "18:00",
  "endTime": "20:00"
}
```
Response (400): "Cannot book for past dates"

2. **Slot Already Booked:**
```json
{
  "turfId": "clxxx...",
  "bookingDate": "2024-02-25",
  "startTime": "18:00",
  "endTime": "20:00"
}
```
Response (400): "This time slot is already booked"

3. **Invalid Time:**
```json
{
  "turfId": "clxxx...",
  "bookingDate": "2024-02-25",
  "startTime": "20:00",
  "endTime": "18:00"
}
```
Response (400): "End time must be after start time"

### Step 7: List Bookings

**Customer sees only their bookings:**
```bash
GET http://localhost:3000/api/bookings
Cookie: next-auth.session-token=CUSTOMER_SESSION_TOKEN
```

**Filter by status:**
```bash
GET http://localhost:3000/api/bookings?status=CONFIRMED
```

**Filter by turf (for turf owners):**
```bash
GET http://localhost:3000/api/bookings?turfId=clxxx...
Cookie: next-auth.session-token=OWNER_SESSION_TOKEN
```

### Step 8: Update Turf (Owner/Admin only)

```bash
PUT http://localhost:3000/api/turfs/{turfId}
Content-Type: application/json
Cookie: next-auth.session-token=OWNER_SESSION_TOKEN

{
  "pricePerHour": 1800,
  "amenities": ["Parking", "Changing Rooms", "Washrooms", "Drinking Water", "Floodlights", "Seating Area", "First Aid"]
}
```

**Expected Response (200):**
```json
{
  "message": "Turf updated successfully",
  "turf": { ... }
}
```

### Step 9: Delete Turf (Owner/Admin only)

```bash
DELETE http://localhost:3000/api/turfs/{turfId}
Cookie: next-auth.session-token=OWNER_SESSION_TOKEN
```

**Expected Response (200):**
```json
{
  "message": "Turf deleted successfully"
}
```

## 🧪 Test Cases Checklist

### Authentication
- [ ] Register customer successfully
- [ ] Register turf owner successfully
- [ ] Register admin successfully
- [ ] Register with duplicate email (should fail)
- [ ] Register with invalid email (should fail)
- [ ] Register with short password (should fail)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)

### Turfs
- [ ] Create turf as turf owner (should succeed)
- [ ] Create turf as customer (should fail - 403)
- [ ] Create turf without authentication (should fail - 401)
- [ ] List all turfs (public access)
- [ ] Filter turfs by city
- [ ] Filter turfs by type
- [ ] Get turf details (public access)
- [ ] Get non-existent turf (should fail - 404)
- [ ] Update own turf as owner (should succeed)
- [ ] Update other's turf as owner (should fail - 403)
- [ ] Update turf as admin (should succeed)
- [ ] Delete own turf as owner (should succeed)
- [ ] Delete other's turf as owner (should fail - 403)

### Bookings
- [ ] Create booking as customer (should succeed)
- [ ] Create booking without authentication (should fail - 401)
- [ ] Create booking for past date (should fail - 400)
- [ ] Create booking for already booked slot (should fail - 400)
- [ ] Create booking with end time before start time (should fail - 400)
- [ ] List own bookings as customer
- [ ] List all bookings for turf as owner
- [ ] Filter bookings by status
- [ ] Verify automatic price calculation
- [ ] Verify automatic hour calculation

## 📊 Sample Test Data

### Multiple Users
```javascript
const users = [
  { name: "Alice Customer", email: "alice@test.com", role: "CUSTOMER" },
  { name: "Bob Owner", email: "bob@test.com", role: "TURF_OWNER" },
  { name: "Carol Admin", email: "carol@test.com", role: "ADMIN" },
  { name: "David Customer", email: "david@test.com", role: "CUSTOMER" },
];
```

### Multiple Turfs
```javascript
const turfs = [
  { name: "Cricket Ground 1", city: "Bangalore", type: "CRICKET", price: 1500 },
  { name: "Football Arena 1", city: "Mumbai", type: "FOOTBALL", price: 2000 },
  { name: "Badminton Court 1", city: "Pune", type: "BADMINTON", price: 500 },
  { name: "Tennis Court 1", city: "Delhi", type: "TENNIS", price: 800 },
];
```

### Multiple Bookings
```javascript
const bookings = [
  { date: "2024-03-01", startTime: "06:00", endTime: "08:00" },
  { date: "2024-03-01", startTime: "18:00", endTime: "20:00" },
  { date: "2024-03-02", startTime: "10:00", endTime: "12:00" },
];
```

## 🐛 Common Issues

### Issue: "Unauthorized" errors
**Solution**: Make sure you're logged in and including the session cookie.

### Issue: "Validation error" responses
**Solution**: Check that all required fields are included and formatted correctly.

### Issue: "Turf not found"
**Solution**: Verify the turf ID exists in your database.

### Issue: "This time slot is already booked"
**Solution**: Choose a different time slot or date.

### Issue: Database connection errors
**Solution**: Check that PostgreSQL is running and DATABASE_URL is correct.

## 🔗 Useful Commands

### View Database in Browser
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma db push --force-reset
```

### View Logs
```bash
# Development server logs show all API calls
npm run dev
```

## 📖 Response Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | No authentication provided |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Server-side error |

---

## 💡 Pro Tips

1. **Use Environment Variables**: Create multiple `.env.local` files for different test scenarios
2. **Postman Collections**: Save these requests as a Postman collection for easy reuse
3. **Automated Tests**: Convert these to automated integration tests
4. **Database Seeds**: Create seed scripts to populate test data
5. **Test Isolation**: Reset database between test runs for consistent results

---

Happy Testing! 🎉
