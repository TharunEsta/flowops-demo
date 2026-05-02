export type IndustryKey = "healthcare" | "real-estate" | "logistics";

export type BookingRecord = {
  id: number;
  name: string;
  phone: string;
  service: string;
  time: string;
  status: "Booked" | "Pending";
  revenue: number;
};

type IndustryConfig = {
  label: string;
  bookingLabel: string;
  services: string[];
  confirmationNote: string;
  headline: string;
};

export const industryConfigs: Record<IndustryKey, IndustryConfig> = {
  healthcare: {
    label: "Healthcare",
    bookingLabel: "Book Appointment",
    services: [
      "General Consultation",
      "Dental Checkup",
      "Cardiology Review",
      "Pediatric Visit"
    ],
    confirmationNote: "Arrive 10 minutes early",
    headline: "Patient-ready scheduling with clearer intake and fewer drop-offs."
  },
  "real-estate": {
    label: "Real Estate",
    bookingLabel: "Book Site Visit",
    services: [
      "Apartment Tour",
      "Villa Site Visit",
      "Commercial Walkthrough",
      "Mortgage Discovery Call"
    ],
    confirmationNote: "Arrive 10 minutes early",
    headline: "Move prospects from inquiry to on-site visit with less friction."
  },
  logistics: {
    label: "Logistics",
    bookingLabel: "Book Consultation",
    services: [
      "Fleet Planning Call",
      "Warehouse Audit",
      "Last-mile Strategy Session",
      "Route Optimization Review"
    ],
    confirmationNote: "Arrive 10 minutes early",
    headline: "Capture operational demand and route it into actionable follow-up."
  }
};

const baseRecords: Record<IndustryKey, BookingRecord[]> = {
  healthcare: [
    { id: 1, name: "Ava Thompson", phone: "+1 555-0190", service: "General Consultation", time: "09:00 AM", status: "Booked", revenue: 160 },
    { id: 2, name: "Noah Bennett", phone: "+1 555-0142", service: "Dental Checkup", time: "09:30 AM", status: "Pending", revenue: 90 },
    { id: 3, name: "Mia Carter", phone: "+1 555-0128", service: "Pediatric Visit", time: "10:15 AM", status: "Booked", revenue: 140 },
    { id: 4, name: "Liam Foster", phone: "+1 555-0181", service: "Cardiology Review", time: "11:00 AM", status: "Booked", revenue: 280 },
    { id: 5, name: "Sophia Reed", phone: "+1 555-0104", service: "General Consultation", time: "11:30 AM", status: "Pending", revenue: 160 },
    { id: 6, name: "Ethan Ward", phone: "+1 555-0176", service: "Dental Checkup", time: "12:45 PM", status: "Booked", revenue: 90 },
    { id: 7, name: "Isabella Price", phone: "+1 555-0119", service: "Pediatric Visit", time: "01:30 PM", status: "Booked", revenue: 140 },
    { id: 8, name: "Lucas Hayes", phone: "+1 555-0163", service: "General Consultation", time: "02:15 PM", status: "Pending", revenue: 160 },
    { id: 9, name: "Charlotte Diaz", phone: "+1 555-0137", service: "Cardiology Review", time: "03:00 PM", status: "Booked", revenue: 280 },
    { id: 10, name: "Henry Brooks", phone: "+1 555-0155", service: "Dental Checkup", time: "04:00 PM", status: "Booked", revenue: 90 },
    { id: 11, name: "Amelia James", phone: "+1 555-0198", service: "General Consultation", time: "04:30 PM", status: "Pending", revenue: 160 },
    { id: 12, name: "James Ross", phone: "+1 555-0109", service: "Pediatric Visit", time: "05:15 PM", status: "Booked", revenue: 140 }
  ],
  "real-estate": [
    { id: 1, name: "Olivia Turner", phone: "+1 555-0240", service: "Apartment Tour", time: "09:15 AM", status: "Booked", revenue: 600 },
    { id: 2, name: "Elijah Murphy", phone: "+1 555-0284", service: "Villa Site Visit", time: "10:00 AM", status: "Pending", revenue: 1200 },
    { id: 3, name: "Emma Cooper", phone: "+1 555-0211", service: "Commercial Walkthrough", time: "10:45 AM", status: "Booked", revenue: 980 },
    { id: 4, name: "Benjamin Cox", phone: "+1 555-0255", service: "Mortgage Discovery Call", time: "11:30 AM", status: "Booked", revenue: 300 },
    { id: 5, name: "Harper Long", phone: "+1 555-0277", service: "Apartment Tour", time: "12:15 PM", status: "Pending", revenue: 600 },
    { id: 6, name: "Daniel Gray", phone: "+1 555-0206", service: "Villa Site Visit", time: "01:00 PM", status: "Booked", revenue: 1200 },
    { id: 7, name: "Evelyn Kelly", phone: "+1 555-0293", service: "Commercial Walkthrough", time: "01:30 PM", status: "Booked", revenue: 980 },
    { id: 8, name: "Michael Rivera", phone: "+1 555-0235", service: "Apartment Tour", time: "02:00 PM", status: "Pending", revenue: 600 },
    { id: 9, name: "Abigail Perry", phone: "+1 555-0221", service: "Mortgage Discovery Call", time: "03:15 PM", status: "Booked", revenue: 300 },
    { id: 10, name: "Matthew Bell", phone: "+1 555-0268", service: "Villa Site Visit", time: "04:00 PM", status: "Booked", revenue: 1200 },
    { id: 11, name: "Ella Barnes", phone: "+1 555-0299", service: "Commercial Walkthrough", time: "04:30 PM", status: "Pending", revenue: 980 },
    { id: 12, name: "Sebastian Flores", phone: "+1 555-0202", service: "Apartment Tour", time: "05:00 PM", status: "Booked", revenue: 600 }
  ],
  logistics: [
    { id: 1, name: "Grace Patel", phone: "+1 555-0350", service: "Fleet Planning Call", time: "08:30 AM", status: "Booked", revenue: 450 },
    { id: 2, name: "Jack Hughes", phone: "+1 555-0341", service: "Warehouse Audit", time: "09:15 AM", status: "Pending", revenue: 950 },
    { id: 3, name: "Chloe Richardson", phone: "+1 555-0318", service: "Route Optimization Review", time: "10:00 AM", status: "Booked", revenue: 720 },
    { id: 4, name: "Alexander Sanders", phone: "+1 555-0337", service: "Last-mile Strategy Session", time: "10:45 AM", status: "Booked", revenue: 680 },
    { id: 5, name: "Scarlett Jenkins", phone: "+1 555-0391", service: "Fleet Planning Call", time: "11:30 AM", status: "Pending", revenue: 450 },
    { id: 6, name: "Logan Powell", phone: "+1 555-0362", service: "Warehouse Audit", time: "12:15 PM", status: "Booked", revenue: 950 },
    { id: 7, name: "Lily Peterson", phone: "+1 555-0324", service: "Last-mile Strategy Session", time: "01:00 PM", status: "Booked", revenue: 680 },
    { id: 8, name: "Mason Coleman", phone: "+1 555-0386", service: "Route Optimization Review", time: "02:15 PM", status: "Pending", revenue: 720 },
    { id: 9, name: "Aria Bailey", phone: "+1 555-0379", service: "Fleet Planning Call", time: "03:00 PM", status: "Booked", revenue: 450 },
    { id: 10, name: "Jacob Myers", phone: "+1 555-0308", service: "Warehouse Audit", time: "03:45 PM", status: "Booked", revenue: 950 },
    { id: 11, name: "Zoey Hughes", phone: "+1 555-0348", service: "Last-mile Strategy Session", time: "04:15 PM", status: "Pending", revenue: 680 },
    { id: 12, name: "Aiden Bryant", phone: "+1 555-0310", service: "Route Optimization Review", time: "05:00 PM", status: "Booked", revenue: 720 }
  ]
};

export const weeklyBookingTrends: Record<
  IndustryKey,
  { day: string; bookings: number; revenue: number }[]
> = {
  healthcare: [
    { day: "Mon", bookings: 12, revenue: 1040 },
    { day: "Tue", bookings: 15, revenue: 1260 },
    { day: "Wed", bookings: 13, revenue: 1180 },
    { day: "Thu", bookings: 18, revenue: 1490 },
    { day: "Fri", bookings: 16, revenue: 1380 },
    { day: "Sat", bookings: 11, revenue: 920 },
    { day: "Sun", bookings: 8, revenue: 660 }
  ],
  "real-estate": [
    { day: "Mon", bookings: 7, revenue: 3480 },
    { day: "Tue", bookings: 9, revenue: 4620 },
    { day: "Wed", bookings: 8, revenue: 4160 },
    { day: "Thu", bookings: 11, revenue: 5420 },
    { day: "Fri", bookings: 10, revenue: 4940 },
    { day: "Sat", bookings: 13, revenue: 6210 },
    { day: "Sun", bookings: 6, revenue: 2840 }
  ],
  logistics: [
    { day: "Mon", bookings: 10, revenue: 5520 },
    { day: "Tue", bookings: 12, revenue: 6140 },
    { day: "Wed", bookings: 11, revenue: 5860 },
    { day: "Thu", bookings: 14, revenue: 6980 },
    { day: "Fri", bookings: 13, revenue: 6630 },
    { day: "Sat", bookings: 9, revenue: 4750 },
    { day: "Sun", bookings: 7, revenue: 3840 }
  ]
};

export function getBookingsByIndustry(industry: IndustryKey) {
  return baseRecords[industry];
}

export function getStatsByIndustry(industry: IndustryKey) {
  const bookings = baseRecords[industry];
  const todaysBookings = bookings.filter((entry) => entry.status === "Booked").length;
  const totalLeads = bookings.length + 14;
  const conversionRate = Math.round((todaysBookings / totalLeads) * 100);
  const todaysRevenue = bookings
    .filter((entry) => entry.status === "Booked")
    .reduce((sum, entry) => sum + entry.revenue, 0);

  return {
    todaysBookings,
    totalLeads,
    conversionRate,
    todaysRevenue
  };
}
