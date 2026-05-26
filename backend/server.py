from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
from pathlib import Path
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ═══════════════════════════════════════════════════════════════
# INDIAN TELECOM INDUSTRY DATA
# ═══════════════════════════════════════════════════════════════

OVERVIEW = {
    "total_subscribers": "1.17B",
    "data_price_per_gb": 10.12,
    "avg_monthly_usage_gb": 19.5,
    "internet_users": "850M+",
    "active_operators": 4,
    "total_towers": "750K+",
}

COMPANIES = [
    {"id": "jio", "name": "Reliance Jio", "short_name": "Jio", "launch_year": 2016, "subscribers_millions": 479, "market_share": 40.1, "quarterly_revenue_cr": 26875, "arpu": 203, "network": "4G / 5G", "color": "#0A2885", "growth_yoy": 4.1},
    {"id": "airtel", "name": "Bharti Airtel", "short_name": "Airtel", "launch_year": 1995, "subscribers_millions": 397, "market_share": 33.2, "quarterly_revenue_cr": 41473, "arpu": 233, "network": "4G / 5G", "color": "#ED1C24", "growth_yoy": 3.1},
    {"id": "vi", "name": "Vodafone Idea", "short_name": "Vi", "launch_year": 2018, "subscribers_millions": 228, "market_share": 19.1, "quarterly_revenue_cr": 10750, "arpu": 166, "network": "4G", "color": "#E60000", "growth_yoy": -7.0},
    {"id": "bsnl", "name": "BSNL", "short_name": "BSNL", "launch_year": 2000, "subscribers_millions": 85, "market_share": 7.1, "quarterly_revenue_cr": 5245, "arpu": 120, "network": "4G (Launching)", "color": "#FFC107", "growth_yoy": -3.4},
]

SUBSCRIBER_GROWTH = [
    {"year": 2005, "jio": 0, "airtel": 24, "vodafone": 14, "idea": 7, "bsnl": 33, "total": 125},
    {"year": 2006, "jio": 0, "airtel": 38, "vodafone": 22, "idea": 13, "bsnl": 38, "total": 171},
    {"year": 2007, "jio": 0, "airtel": 58, "vodafone": 35, "idea": 22, "bsnl": 42, "total": 233},
    {"year": 2008, "jio": 0, "airtel": 86, "vodafone": 52, "idea": 34, "bsnl": 48, "total": 301},
    {"year": 2009, "jio": 0, "airtel": 120, "vodafone": 78, "idea": 52, "bsnl": 58, "total": 425},
    {"year": 2010, "jio": 0, "airtel": 148, "vodafone": 109, "idea": 74, "bsnl": 72, "total": 582},
    {"year": 2011, "jio": 0, "airtel": 181, "vodafone": 136, "idea": 97, "bsnl": 81, "total": 689},
    {"year": 2012, "jio": 0, "airtel": 197, "vodafone": 152, "idea": 115, "bsnl": 93, "total": 747},
    {"year": 2013, "jio": 0, "airtel": 215, "vodafone": 160, "idea": 130, "bsnl": 97, "total": 785},
    {"year": 2014, "jio": 0, "airtel": 230, "vodafone": 173, "idea": 148, "bsnl": 94, "total": 823},
    {"year": 2015, "jio": 0, "airtel": 252, "vodafone": 188, "idea": 167, "bsnl": 88, "total": 863},
    {"year": 2016, "jio": 72, "airtel": 265, "vi": 373, "bsnl": 92, "total": 951},
    {"year": 2017, "jio": 160, "airtel": 285, "vi": 403, "bsnl": 103, "total": 1072},
    {"year": 2018, "jio": 280, "airtel": 340, "vi": 408, "bsnl": 112, "total": 1188},
    {"year": 2019, "jio": 355, "airtel": 328, "vi": 375, "bsnl": 116, "total": 1192},
    {"year": 2020, "jio": 398, "airtel": 340, "vi": 329, "bsnl": 111, "total": 1189},
    {"year": 2021, "jio": 420, "airtel": 356, "vi": 296, "bsnl": 105, "total": 1185},
    {"year": 2022, "jio": 432, "airtel": 370, "vi": 265, "bsnl": 92, "total": 1166},
    {"year": 2023, "jio": 460, "airtel": 385, "vi": 245, "bsnl": 88, "total": 1184},
    {"year": 2024, "jio": 479, "airtel": 397, "vi": 228, "bsnl": 85, "total": 1194},
]

DATA_PRICING = [
    {"year": 2010, "price": 269}, {"year": 2011, "price": 265}, {"year": 2012, "price": 260},
    {"year": 2013, "price": 255}, {"year": 2014, "price": 250}, {"year": 2015, "price": 240},
    {"year": 2016, "price": 152}, {"year": 2017, "price": 45}, {"year": 2018, "price": 17},
    {"year": 2019, "price": 13}, {"year": 2020, "price": 11}, {"year": 2021, "price": 10.5},
    {"year": 2022, "price": 10.1}, {"year": 2023, "price": 10.1}, {"year": 2024, "price": 11.2},
]

MARKET_SHARE = [
    {"year": 2010, "airtel": 21.5, "vodafone": 16.8, "idea": 11.4, "bsnl": 11.0, "others": 39.3},
    {"year": 2015, "airtel": 24.6, "vodafone": 18.1, "idea": 16.1, "bsnl": 8.5, "others": 32.7},
    {"year": 2017, "jio": 12.5, "airtel": 24.2, "vodafone": 17.1, "idea": 15.5, "bsnl": 8.3, "others": 22.4},
    {"year": 2018, "jio": 21.0, "airtel": 27.5, "vi": 33.5, "bsnl": 9.2, "others": 8.8},
    {"year": 2020, "jio": 32.8, "airtel": 28.5, "vi": 27.5, "bsnl": 9.3, "others": 1.9},
    {"year": 2022, "jio": 37.0, "airtel": 31.7, "vi": 22.8, "bsnl": 7.9, "others": 0.6},
    {"year": 2024, "jio": 40.1, "airtel": 33.2, "vi": 19.1, "bsnl": 7.1, "others": 0.5},
]

TIMELINE_EVENTS = [
    {"year": 2005, "era": "before", "title": "Early Growth Phase", "description": "India's telecom revolution begins with affordable prepaid plans. 125M subscribers."},
    {"year": 2007, "era": "before", "title": "Tariff Revolution", "description": "Call rates drop to 1 rupee/min, driving massive rural adoption."},
    {"year": 2008, "era": "before", "title": "3G Spectrum Auction", "description": "Government auctions 3G spectrum for 67,719 crore rupees."},
    {"year": 2010, "era": "before", "title": "500M Subscribers", "description": "India crosses half billion mobile subscribers milestone."},
    {"year": 2012, "era": "before", "title": "2G Scam Aftermath", "description": "122 telecom licenses cancelled. Major industry restructuring."},
    {"year": 2014, "era": "before", "title": "Expensive Data Era", "description": "Mobile data at 250 rupees/GB. Limited smartphone adoption."},
    {"year": 2016, "era": "after", "title": "Jio Launch - Day Zero", "description": "Sep 5, 2016: Reliance Jio offers FREE 4G data. Industry disrupted overnight.", "highlight": True},
    {"year": 2017, "era": "after", "title": "The Great Price War", "description": "Data drops to 50 rupees/GB. 8 operators exit the market."},
    {"year": 2018, "era": "after", "title": "Vodafone-Idea Merger", "description": "Vi formed through merger. Industry consolidation accelerates."},
    {"year": 2019, "era": "after", "title": "Data Explosion", "description": "India becomes world's #1 in mobile data consumption."},
    {"year": 2022, "era": "after", "title": "5G Launch", "description": "Jio and Airtel launch 5G services across major cities."},
    {"year": 2024, "era": "after", "title": "The New Reality", "description": "3 private operators. 11 rupees/GB. 1.17B subscribers."},
]

DATA_CONSUMPTION = [
    {"year": 2014, "usage": 0.2}, {"year": 2015, "usage": 0.25}, {"year": 2016, "usage": 0.8},
    {"year": 2017, "usage": 3.5}, {"year": 2018, "usage": 8.3}, {"year": 2019, "usage": 11.0},
    {"year": 2020, "usage": 13.5}, {"year": 2021, "usage": 14.6}, {"year": 2022, "usage": 16.2},
    {"year": 2023, "usage": 18.4}, {"year": 2024, "usage": 19.5},
]

ARPU_DATA = [
    {"year": 2014, "jio": 0, "airtel": 135, "vi": 117, "bsnl": 68, "industry": 116},
    {"year": 2016, "jio": 0, "airtel": 154, "vi": 135, "bsnl": 62, "industry": 130},
    {"year": 2017, "jio": 69, "airtel": 100, "vi": 86, "bsnl": 55, "industry": 78},
    {"year": 2018, "jio": 112, "airtel": 123, "vi": 89, "bsnl": 56, "industry": 92},
    {"year": 2020, "jio": 138, "airtel": 162, "vi": 107, "bsnl": 62, "industry": 115},
    {"year": 2022, "jio": 168, "airtel": 193, "vi": 131, "bsnl": 75, "industry": 142},
    {"year": 2024, "jio": 203, "airtel": 233, "vi": 166, "bsnl": 120, "industry": 183},
]

# ═══════════════════════════════════════════════════════════════
# API ENDPOINTS
# ═══════════════════════════════════════════════════════════════

@api_router.get("/")
async def root():
    return {"message": "Indian Telecom Transformation API"}

@api_router.get("/telecom/overview")
async def get_overview():
    return OVERVIEW

@api_router.get("/telecom/companies")
async def get_companies():
    return COMPANIES

@api_router.get("/telecom/subscribers")
async def get_subscriber_growth():
    return SUBSCRIBER_GROWTH

@api_router.get("/telecom/market-share")
async def get_market_share():
    return MARKET_SHARE

@api_router.get("/telecom/pricing")
async def get_pricing():
    return DATA_PRICING

@api_router.get("/telecom/timeline")
async def get_timeline():
    return TIMELINE_EVENTS

@api_router.get("/telecom/consumption")
async def get_consumption():
    return DATA_CONSUMPTION

@api_router.get("/telecom/arpu")
async def get_arpu():
    return ARPU_DATA

@api_router.get("/telecom/realtime")
async def get_realtime():
    base = {
        "jio": 479000000 + random.randint(-50000, 50000),
        "airtel": 397000000 + random.randint(-30000, 30000),
        "vi": 228000000 + random.randint(-20000, 20000),
        "bsnl": 85000000 + random.randint(-10000, 10000),
    }
    return {
        "subscribers": base,
        "total": sum(base.values()),
        "data_consumed_today_tb": round(42000 + random.uniform(-500, 500), 1),
        "active_internet_users": 850000000 + random.randint(-100000, 100000),
        "avg_speed_mbps": round(88.4 + random.uniform(-2, 2), 1),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
