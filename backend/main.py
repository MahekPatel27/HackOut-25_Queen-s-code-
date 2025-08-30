from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import logging
from datetime import datetime

from models.suitability_model import HydrogenSuitabilityModel
from models.data_models import (
    SiteData, 
    SuitabilityRequest, 
    SuitabilityResponse,
    AnalysisRequest,
    AnalysisResponse
)
from services.data_service import DataService
from services.analysis_service import AnalysisService
from utils.config import get_settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="भारत H2-Atlas API",
    description="India's Hydrogen Atlas - Advanced Geospatial Analysis Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
settings = get_settings()
data_service = DataService()
analysis_service = AnalysisService()
suitability_model = HydrogenSuitabilityModel()

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting भारत H2-Atlas Backend...")
    await data_service.initialize()
    await analysis_service.initialize()
    suitability_model.load_model()
    logger.info("Backend initialized successfully!")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "भारत H2-Atlas API",
        "version": "1.0.0",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "data_service": "active",
            "analysis_service": "active",
            "suitability_model": "active"
        }
    }

@app.post("/api/suitability/analyze", response_model=SuitabilityResponse)
async def analyze_suitability(request: SuitabilityRequest):
    """Analyze hydrogen site suitability using ML model"""
    try:
        logger.info(f"Analyzing suitability for site: {request.site_name}")
        
        # Get enhanced site data
        site_data = await data_service.get_enhanced_site_data(request.site_id)
        if not site_data:
            raise HTTPException(status_code=404, detail="Site not found")
        
        # Run ML analysis
        suitability_score = suitability_model.predict_suitability(
            site_data, 
            request.criteria_weights
        )
        
        # Generate detailed analysis
        analysis = analysis_service.generate_suitability_analysis(
            site_data, 
            suitability_score, 
            request.criteria_weights
        )
        
        return SuitabilityResponse(
            site_id=request.site_id,
            site_name=request.site_name,
            suitability_score=suitability_score,
            analysis=analysis,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Error analyzing suitability: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/suitability/batch", response_model=List[SuitabilityResponse])
async def batch_suitability_analysis(request: AnalysisRequest):
    """Batch analyze multiple sites for suitability"""
    try:
        logger.info(f"Batch analyzing {len(request.sites)} sites")
        
        results = []
        for site in request.sites:
            # Get enhanced site data
            site_data = await data_service.get_enhanced_site_data(site.site_id)
            if site_data:
                # Run ML analysis
                suitability_score = suitability_model.predict_suitability(
                    site_data, 
                    request.criteria_weights
                )
                
                # Generate analysis
                analysis = analysis_service.generate_suitability_analysis(
                    site_data, 
                    suitability_score, 
                    request.criteria_weights
                )
                
                results.append(SuitabilityResponse(
                    site_id=site.site_id,
                    site_name=site.site_name,
                    suitability_score=suitability_score,
                    analysis=analysis,
                    timestamp=datetime.now().isoformat()
                ))
        
        return results
        
    except Exception as e:
        logger.error(f"Error in batch analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/sites", response_model=List[SiteData])
async def get_all_sites():
    """Get all hydrogen sites with enhanced data"""
    try:
        sites = await data_service.get_all_sites()
        return sites
    except Exception as e:
        logger.error(f"Error fetching sites: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/sites/{site_id}", response_model=SiteData)
async def get_site_by_id(site_id: str):
    """Get specific site by ID"""
    try:
        site = await data_service.get_site_by_id(site_id)
        if not site:
            raise HTTPException(status_code=404, detail="Site not found")
        return site
    except Exception as e:
        logger.error(f"Error fetching site {site_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/recommendations")
async def get_recommendations(
    state: Optional[str] = None,
    min_score: Optional[float] = None,
    max_score: Optional[float] = None
):
    """Get site recommendations based on criteria"""
    try:
        recommendations = await analysis_service.get_recommendations(
            state=state,
            min_score=min_score,
            max_score=max_score
        )
        return recommendations
    except Exception as e:
        logger.error(f"Error getting recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/statistics")
async def get_analysis_statistics():
    """Get overall analysis statistics"""
    try:
        stats = await analysis_service.get_statistics()
        return stats
    except Exception as e:
        logger.error(f"Error getting statistics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
