from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="The Travelling Tutor API")
api_router = APIRouter(prefix="/api")


# ---------- MODELS ----------
def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    role: Literal["student", "parent", "teacher", "other"]
    subject: Optional[str] = None
    message: str


class Contact(ContactCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class LeadMagnetCreate(BaseModel):
    first_name: str
    email: EmailStr
    audience: Literal["student", "parent", "teacher"]
    magnet: str  # e.g. "revision-starter-pack"


class LeadMagnet(LeadMagnetCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class NewsletterCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "footer"


class Newsletter(NewsletterCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: Literal["student", "parent", "teacher", "other"]
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    notes: Optional[str] = None


class Booking(BookingCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class TutorApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    qualifications: str
    experience: str
    why_join: str


class TutorApplication(TutorApplicationCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


# ---------- ROUTES ----------
@api_router.get("/")
async def root():
    return {"message": "The Travelling Tutor API", "status": "ok"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/lead-magnet", response_model=LeadMagnet)
async def create_lead_magnet(payload: LeadMagnetCreate):
    obj = LeadMagnet(**payload.model_dump())
    await db.lead_magnets.insert_one(obj.model_dump())
    return obj


@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return existing
    obj = Newsletter(**payload.model_dump())
    await db.newsletter.insert_one(obj.model_dump())
    return obj


@api_router.post("/booking", response_model=Booking)
async def create_booking(payload: BookingCreate):
    obj = Booking(**payload.model_dump())
    await db.bookings.insert_one(obj.model_dump())
    return obj


@api_router.post("/tutor-application", response_model=TutorApplication)
async def create_tutor_application(payload: TutorApplicationCreate):
    obj = TutorApplication(**payload.model_dump())
    await db.tutor_applications.insert_one(obj.model_dump())
    return obj


@api_router.get("/testimonials")
async def get_testimonials():
    # Curated static testimonials (could be moved to DB later)
    return {
        "items": [
            {
                "id": "1",
                "audience": "student",
                "name": "Amelia R.",
                "role": "A-Level Sociology Student",
                "rating": 5,
                "quote": "Went from a predicted C to an A* in six months. Georgina actually teaches you how examiners think — nothing felt like guesswork anymore.",
            },
            {
                "id": "2",
                "audience": "parent",
                "name": "Sarah & David M.",
                "role": "Parents of Year 13 student",
                "rating": 5,
                "quote": "We tried two other tutors. The difference with The Travelling Tutor was night and day — structured, calm, and our daughter finally believed she could do it.",
            },
            {
                "id": "3",
                "audience": "teacher",
                "name": "Priya K.",
                "role": "Head of Sociology, Manchester",
                "rating": 5,
                "quote": "The CPD session reset our whole department. Practical, examiner-led and immediately usable in lessons.",
            },
            {
                "id": "4",
                "audience": "student",
                "name": "Jordan T.",
                "role": "GCSE Sociology Student",
                "rating": 5,
                "quote": "I used to panic at essay questions. Now I have a plan I can actually follow. My mock jumped two grades.",
            },
            {
                "id": "5",
                "audience": "parent",
                "name": "Helen W.",
                "role": "Mum of Year 11",
                "rating": 5,
                "quote": "Honest feedback every session. Felt like we finally had someone in our corner who knew exactly what the exam wanted.",
            },
            {
                "id": "6",
                "audience": "teacher",
                "name": "Marcus B.",
                "role": "Tutor Partner",
                "rating": 5,
                "quote": "Joining the Tutor Partner Programme gave me leads, structure and a real community. I left my full-time role within a year.",
            },
        ]
    }


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
