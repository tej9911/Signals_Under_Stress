export const OVERVIEW_STATS = [
  { label: "Total Subscribers", value: "1.17B", change: "+8.2%", period: "2024", positive: true },
  { label: "Data Price/GB", value: "Rs 10", change: "-96%", period: "vs 2015", positive: true },
  { label: "Avg Monthly Usage", value: "19.5 GB", change: "+98x", period: "vs 2015", positive: true },
  { label: "Internet Users", value: "850M+", change: "+425%", period: "vs 2015", positive: true },
];

export const COMPANIES = [
  { id: "jio", name: "Reliance Jio", shortName: "Jio", launchYear: 2016, subscribers: 479, marketShare: 40.1, quarterlyRevenue: 26875, arpu: 203, network: "4G / 5G", color: "#0A2885", growthYoY: 4.1, description: "Disrupted the entire telecom market with free voice calls and ultra-cheap data. The catalyst for India's digital revolution." },
  { id: "airtel", name: "Bharti Airtel", shortName: "Airtel", launchYear: 1995, subscribers: 397, marketShare: 33.2, quarterlyRevenue: 41473, arpu: 233, network: "4G / 5G", color: "#ED1C24", growthYoY: 3.1, description: "India's premium telecom operator with the highest ARPU. Strong enterprise and digital services portfolio." },
  { id: "vi", name: "Vodafone Idea", shortName: "Vi", launchYear: 2018, subscribers: 228, marketShare: 19.1, quarterlyRevenue: 10750, arpu: 166, network: "4G", color: "#E60000", growthYoY: -7.0, description: "Merged entity struggling with debt but still India's third largest operator." },
  { id: "bsnl", name: "BSNL", shortName: "BSNL", launchYear: 2000, subscribers: 85, marketShare: 7.1, quarterlyRevenue: 5245, arpu: 120, network: "4G (Launching)", color: "#FFC107", growthYoY: -3.4, description: "Government-owned operator undergoing revival with 4G network rollout." },
];

export const SUBSCRIBER_GROWTH = [
  { year: 2005, jio: 0, airtel: 24, total: 125 },
  { year: 2006, jio: 0, airtel: 38, total: 171 },
  { year: 2007, jio: 0, airtel: 58, total: 233 },
  { year: 2008, jio: 0, airtel: 86, total: 301 },
  { year: 2009, jio: 0, airtel: 120, total: 425 },
  { year: 2010, jio: 0, airtel: 148, total: 582 },
  { year: 2011, jio: 0, airtel: 181, total: 689 },
  { year: 2012, jio: 0, airtel: 197, total: 747 },
  { year: 2013, jio: 0, airtel: 215, total: 785 },
  { year: 2014, jio: 0, airtel: 230, total: 823 },
  { year: 2015, jio: 0, airtel: 252, total: 863 },
  { year: 2016, jio: 72, airtel: 265, total: 951 },
  { year: 2017, jio: 160, airtel: 285, total: 1072 },
  { year: 2018, jio: 280, airtel: 340, total: 1188 },
  { year: 2019, jio: 355, airtel: 328, total: 1192 },
  { year: 2020, jio: 398, airtel: 340, total: 1189 },
  { year: 2021, jio: 420, airtel: 356, total: 1185 },
  { year: 2022, jio: 432, airtel: 370, total: 1166 },
  { year: 2023, jio: 460, airtel: 385, total: 1184 },
  { year: 2024, jio: 479, airtel: 397, total: 1194 },
];

export const DATA_PRICING = [
  { year: 2010, price: 269 }, { year: 2011, price: 265 }, { year: 2012, price: 260 },
  { year: 2013, price: 255 }, { year: 2014, price: 250 }, { year: 2015, price: 240 },
  { year: 2016, price: 152 }, { year: 2017, price: 45 }, { year: 2018, price: 17 },
  { year: 2019, price: 13 }, { year: 2020, price: 11 }, { year: 2021, price: 10.5 },
  { year: 2022, price: 10.1 }, { year: 2023, price: 10.1 }, { year: 2024, price: 11.2 },
];

export const MARKET_SHARE_CURRENT = [
  { name: "Jio", value: 40.1, color: "#2563EB" },
  { name: "Airtel", value: 33.2, color: "#EF4444" },
  { name: "Vi", value: 19.1, color: "#8B5CF6" },
  { name: "BSNL", value: 7.1, color: "#F59E0B" },
  { name: "Others", value: 0.5, color: "#6B7280" },
];

export const TIMELINE_EVENTS = [
  { year: 2005, era: "before", title: "Early Growth Phase", description: "India's telecom revolution begins with affordable prepaid plans. 125M subscribers.", icon: "signal" },
  { year: 2007, era: "before", title: "Rs 1/min Revolution", description: "Tariff wars begin. Call rates drop to Rs 1/min, driving massive rural adoption.", icon: "phone" },
  { year: 2008, era: "before", title: "3G Spectrum Auction", description: "Government auctions 3G spectrum for Rs 67,719 crore. Mobile internet begins.", icon: "radio" },
  { year: 2010, era: "before", title: "Half Billion Mark", description: "India crosses 500M mobile subscribers. World's fastest growing telecom market.", icon: "users" },
  { year: 2012, era: "before", title: "2G Scam Aftermath", description: "Supreme Court cancels 122 telecom licenses. Major industry restructuring.", icon: "shield" },
  { year: 2014, era: "before", title: "Data Still Expensive", description: "Mobile data at Rs 250/GB. Smartphone adoption remains limited to urban areas.", icon: "smartphone" },
  { year: 2016, era: "after", title: "Jio Launch -- Day Zero", description: "Sep 5, 2016: Reliance Jio offers FREE 4G data and voice. Industry disrupted overnight.", highlight: true, icon: "zap" },
  { year: 2017, era: "after", title: "The Great Price War", description: "Operators slash prices. Data drops from Rs 250 to Rs 50/GB. 8 operators exit market.", icon: "trending-down" },
  { year: 2018, era: "after", title: "Vodafone-Idea Merger", description: "Vodafone India and Idea Cellular merge to form Vi. Consolidation accelerates.", icon: "git-merge" },
  { year: 2019, era: "after", title: "Data Consumption Explosion", description: "India becomes world's #1 in mobile data consumption. Avg usage: 11 GB/month.", icon: "bar-chart" },
  { year: 2022, era: "after", title: "5G Launch", description: "Jio and Airtel launch 5G services across major cities. India enters the 5G era.", icon: "wifi" },
  { year: 2024, era: "after", title: "The New Reality", description: "3 private operators dominate. Data at Rs 11/GB. 1.17B subscribers.", icon: "globe" },
];

export const DATA_CONSUMPTION = [
  { year: 2014, usage: 0.2 }, { year: 2015, usage: 0.25 }, { year: 2016, usage: 0.8 },
  { year: 2017, usage: 3.5 }, { year: 2018, usage: 8.3 }, { year: 2019, usage: 11.0 },
  { year: 2020, usage: 13.5 }, { year: 2021, usage: 14.6 }, { year: 2022, usage: 16.2 },
  { year: 2023, usage: 18.4 }, { year: 2024, usage: 19.5 },
];

export const DASHBOARD_ITEMS = [
  { id: "market-share", title: "Market Share Analysis", description: "Interactive breakdown of telecom market dominance from 2010 to present", icon: "pie-chart", color: "#2563EB" },
  { id: "pricing", title: "Pricing Revolution", description: "The dramatic collapse of data costs and its impact on consumption", icon: "trending-down", color: "#10B981" },
  { id: "subscribers", title: "Subscriber Growth", description: "Company-wise subscriber acquisition and churn analysis", icon: "users", color: "#F59E0B" },
  { id: "technology", title: "Technology Evolution", description: "India's journey from 2G to 5G -- network coverage and speed metrics", icon: "wifi", color: "#06B6D4" },
  { id: "insights", title: "Telecom Insights", description: "Key insights and summary analytics from India's telecom transformation", icon: "activity", color: "#EF4444" },
];

export const INSIGHTS = [
  { title: "96% Price Drop", description: "Mobile data prices fell from Rs 269/GB in 2015 to Rs 10/GB by 2022 -- the steepest decline in global telecom history.", metric: "Rs 269 to Rs 10", category: "Pricing" },
  { title: "98x Data Usage Growth", description: "Average monthly data consumption surged from 200MB to 19.5GB per user. India now consumes more mobile data than any country.", metric: "0.2 to 19.5 GB", category: "Consumption" },
  { title: "Market Consolidation", description: "12+ operators in 2015 reduced to just 3-4 viable players. Jio's disruption forced exits, mergers, and bankruptcy.", metric: "12+ to 4", category: "Industry" },
  { title: "Digital Inclusion", description: "850M+ Indians now have internet access. Rural smartphone penetration grew from 15% to 65% in just 8 years.", metric: "15% to 65%", category: "Access" },
  { title: "Revenue Recovery", description: "Industry revenue shifted from voice (70%) to data (65%). ARPU recovered from Rs 78 low to Rs 183 through tariff hikes.", metric: "Rs 78 to Rs 183", category: "Revenue" },
  { title: "5G Rollout", description: "India launched 5G in October 2022. Already covers 700+ cities with average speeds of 88 Mbps on 5G networks.", metric: "700+ Cities", category: "Technology" },
];

export const BEFORE_AFTER = {
  before: {
    title: "Before 2016", subtitle: "The Pre-Jio Era",
    stats: [
      { label: "Data Price", value: "Rs 250/GB" }, { label: "Avg Usage", value: "200 MB/mo" },
      { label: "Operators", value: "12+" }, { label: "Network", value: "2G / 3G" },
      { label: "Internet Users", value: "200M" }, { label: "Smartphone %", value: "17%" },
    ],
  },
  after: {
    title: "After 2016", subtitle: "The Post-Jio Era",
    stats: [
      { label: "Data Price", value: "Rs 10/GB" }, { label: "Avg Usage", value: "19.5 GB/mo" },
      { label: "Operators", value: "3-4" }, { label: "Network", value: "4G / 5G" },
      { label: "Internet Users", value: "850M+" }, { label: "Smartphone %", value: "65%" },
    ],
  },
};

export const HERO_BG = "https://images.unsplash.com/photo-1768330187404-59e46cf222c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGJsdWUlMjBuZXR3b3JrJTIwbGluZXN8ZW58MHx8fHwxNzczNTc1ODI4fDA&ixlib=rb-4.1.0&q=85";

// ═══════════════════════════════════════════════════════════
// DASHBOARD DATA
// ═══════════════════════════════════════════════════════════

export const CHART_COLORS = {
  Jio: '#2563EB', Airtel: '#EF4444', Vi: '#8B5CF6', BSNL: '#F59E0B', Others: '#6B7280',
};

export const MARKET_SHARE_HISTORICAL = [
  { year: 2010, Jio: 0, Airtel: 21.5, Vi: 28.2, BSNL: 11.0, Others: 39.3 },
  { year: 2012, Jio: 0, Airtel: 22.4, Vi: 30.2, BSNL: 10.5, Others: 36.9 },
  { year: 2014, Jio: 0, Airtel: 23.5, Vi: 33.0, BSNL: 9.5, Others: 34.0 },
  { year: 2016, Jio: 5.8, Airtel: 24.2, Vi: 32.0, BSNL: 8.5, Others: 29.5 },
  { year: 2017, Jio: 12.5, Airtel: 24.2, Vi: 32.6, BSNL: 8.3, Others: 22.4 },
  { year: 2018, Jio: 21.0, Airtel: 27.5, Vi: 33.5, BSNL: 9.2, Others: 8.8 },
  { year: 2019, Jio: 27.8, Airtel: 28.8, Vi: 30.1, BSNL: 9.6, Others: 3.7 },
  { year: 2020, Jio: 32.8, Airtel: 28.5, Vi: 27.5, BSNL: 9.3, Others: 1.9 },
  { year: 2022, Jio: 37.0, Airtel: 31.7, Vi: 22.8, BSNL: 7.9, Others: 0.6 },
  { year: 2024, Jio: 40.1, Airtel: 33.2, Vi: 19.1, BSNL: 7.1, Others: 0.5 },
];

export const SUBSCRIBER_STACKED = [
  { year: 2010, Jio: 0, Airtel: 148, Vi: 183, BSNL: 72, Others: 179 },
  { year: 2012, Jio: 0, Airtel: 197, Vi: 267, BSNL: 93, Others: 190 },
  { year: 2014, Jio: 0, Airtel: 230, Vi: 321, BSNL: 94, Others: 178 },
  { year: 2016, Jio: 72, Airtel: 265, Vi: 373, BSNL: 92, Others: 149 },
  { year: 2017, Jio: 160, Airtel: 285, Vi: 403, BSNL: 103, Others: 121 },
  { year: 2018, Jio: 280, Airtel: 340, Vi: 408, BSNL: 112, Others: 48 },
  { year: 2019, Jio: 355, Airtel: 328, Vi: 375, BSNL: 116, Others: 18 },
  { year: 2020, Jio: 398, Airtel: 340, Vi: 329, BSNL: 111, Others: 11 },
  { year: 2022, Jio: 432, Airtel: 370, Vi: 265, BSNL: 92, Others: 7 },
  { year: 2024, Jio: 479, Airtel: 397, Vi: 228, BSNL: 85, Others: 5 },
];

export const REVENUE_DATA = [
  { year: 2014, Jio: 0, Airtel: 22200, Vi: 18500, BSNL: 4500 },
  { year: 2016, Jio: 500, Airtel: 25300, Vi: 22100, BSNL: 4200 },
  { year: 2017, Jio: 5200, Airtel: 22800, Vi: 20400, BSNL: 3800 },
  { year: 2018, Jio: 10200, Airtel: 24500, Vi: 18200, BSNL: 3500 },
  { year: 2019, Jio: 15000, Airtel: 28200, Vi: 12400, BSNL: 3200 },
  { year: 2020, Jio: 18300, Airtel: 30500, Vi: 11200, BSNL: 3000 },
  { year: 2022, Jio: 22600, Airtel: 36400, Vi: 10200, BSNL: 4000 },
  { year: 2024, Jio: 26875, Airtel: 41473, Vi: 10750, BSNL: 5245 },
];

export const ARPU_DATA = [
  { year: 2014, Jio: 0, Airtel: 135, Vi: 117, BSNL: 68, Industry: 116 },
  { year: 2016, Jio: 0, Airtel: 154, Vi: 135, BSNL: 62, Industry: 130 },
  { year: 2017, Jio: 69, Airtel: 100, Vi: 86, BSNL: 55, Industry: 78 },
  { year: 2018, Jio: 112, Airtel: 123, Vi: 89, BSNL: 56, Industry: 92 },
  { year: 2020, Jio: 138, Airtel: 162, Vi: 107, BSNL: 62, Industry: 115 },
  { year: 2022, Jio: 168, Airtel: 193, Vi: 131, BSNL: 75, Industry: 142 },
  { year: 2024, Jio: 203, Airtel: 233, Vi: 166, BSNL: 120, Industry: 183 },
];

export const TECH_ADOPTION = [
  { year: 2010, "2G": 92, "3G": 8, "4G": 0, "5G": 0 },
  { year: 2012, "2G": 82, "3G": 18, "4G": 0, "5G": 0 },
  { year: 2014, "2G": 68, "3G": 30, "4G": 2, "5G": 0 },
  { year: 2016, "2G": 42, "3G": 35, "4G": 23, "5G": 0 },
  { year: 2018, "2G": 22, "3G": 18, "4G": 60, "5G": 0 },
  { year: 2020, "2G": 12, "3G": 8, "4G": 80, "5G": 0 },
  { year: 2022, "2G": 5, "3G": 3, "4G": 84, "5G": 8 },
  { year: 2024, "2G": 2, "3G": 1, "4G": 62, "5G": 35 },
];

export const NETWORK_SPEED = [
  { year: 2012, download: 1.2, upload: 0.5 },
  { year: 2014, download: 2.1, upload: 0.8 },
  { year: 2016, download: 4.1, upload: 1.5 },
  { year: 2018, download: 9.1, upload: 3.8 },
  { year: 2020, download: 12.6, upload: 4.2 },
  { year: 2022, download: 18.3, upload: 5.5 },
  { year: 2024, download: 88.4, upload: 22.1 },
];

export const SPEED_BY_TECH = [
  { tech: "2G", download: 0.2, upload: 0.05 },
  { tech: "3G", download: 3.5, upload: 1.2 },
  { tech: "4G", download: 18, upload: 5.5 },
  { tech: "5G", download: 88, upload: 22 },
];
