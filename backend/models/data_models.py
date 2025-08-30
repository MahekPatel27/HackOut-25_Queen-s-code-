from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
from enum import Enum

class PolicyZone(str, Enum):
    SEZ = "SEZ"
    GIFT_CITY = "GIFT City"
    TECH_PARK = "Tech Park"
    SPECIAL_CATEGORY = "Special Category"
    INDUSTRIAL_PARK = "Industrial Park"
    FREE_TRADE_ZONE = "Free Trade Zone"

class LandType(str, Enum):
    DESERT = "Desert"
    PLATEAU = "Plateau"
    COASTAL = "Coastal"
    MOUNTAINOUS = "Mountainous"
    PLAIN = "Plain"
    HIGHLAND = "Highland"

class InfrastructureType(str, Enum):
    SOLAR_PLANT = "Solar Plant"
    WIND_FARM = "Wind Farm"
    GRID_CONNECTION = "Grid Connection"
    PORT_ACCESS = "Port Access"
    AIRPORT = "Airport"
    INDUSTRIAL_PARK = "Industrial Park"
    TECH_HUB = "Tech Hub"

class SiteData(BaseModel):
    """Enhanced hydrogen site data model"""
    id: str = Field(..., description="Unique site identifier")
    name: str = Field(..., description="Site name")
    coordinates: List[float] = Field(..., description="[latitude, longitude]")
    state: str = Field(..., description="Indian state")
    district: str = Field(..., description="District name")
    
    # Resource indices (0-100 scale)
    solar_index: float = Field(..., ge=0, le=100, description="Solar resource index")
    wind_index: float = Field(..., ge=0, le=100, description="Wind resource index")
    water_index: float = Field(..., ge=0, le=100, description="Water availability index")
    
    # Proximity metrics (km)
    industry_proximity: float = Field(..., ge=0, description="Distance to industrial cluster (km)")
    grid_proximity: float = Field(..., ge=0, description="Distance to grid connection (km)")
    water_source_distance: float = Field(..., ge=0, description="Distance to water source (km)")
    
    # Land characteristics
    land_availability: float = Field(..., ge=0, le=10, description="Land availability score (1-10)")
    elevation: float = Field(..., description="Elevation above sea level (km)")
    land_type: LandType = Field(..., description="Type of land")
    
    # Policy and infrastructure
    policy_zone: PolicyZone = Field(..., description="Policy zone classification")
    existing_infrastructure: List[InfrastructureType] = Field(default=[], description="Existing infrastructure")
    policy_incentives: List[str] = Field(default=[], description="Available policy incentives")
    
    # Economic metrics
    estimated_roi: str = Field(..., description="Estimated return on investment")
    project_timeline: str = Field(..., description="Estimated project timeline")
    
    # Calculated fields
    suitability_score: Optional[float] = Field(None, ge=0, le=100, description="Calculated suitability score")
    annual_sunshine: Optional[str] = Field(None, description="Annual sunshine hours")
    
    @validator('coordinates')
    def validate_coordinates(cls, v):
        if len(v) != 2:
            raise ValueError('Coordinates must be [latitude, longitude]')
        if not (-90 <= v[0] <= 90):
            raise ValueError('Latitude must be between -90 and 90')
        if not (-180 <= v[1] <= 180):
            raise ValueError('Longitude must be between -180 and 180')
        return v

class CriteriaWeights(BaseModel):
    """Criteria weights for suitability analysis"""
    solar: float = Field(35, ge=0, le=100, description="Solar resource weight (%)")
    wind: float = Field(15, ge=0, le=100, description="Wind resource weight (%)")
    water: float = Field(20, ge=0, le=100, description="Water availability weight (%)")
    industry_proximity: float = Field(15, ge=0, le=100, description="Industry proximity weight (%)")
    grid_proximity: float = Field(10, ge=0, le=100, description="Grid proximity weight (%)")
    land_availability: float = Field(5, ge=0, le=100, description="Land availability weight (%)")
    
    @validator('*')
    def validate_weights(cls, v):
        if v < 0 or v > 100:
            raise ValueError('Weights must be between 0 and 100')
        return v

class SuitabilityRequest(BaseModel):
    """Request for single site suitability analysis"""
    site_id: str = Field(..., description="Site ID to analyze")
    site_name: str = Field(..., description="Site name")
    criteria_weights: CriteriaWeights = Field(..., description="Criteria weights for analysis")

class AnalysisRequest(BaseModel):
    """Request for batch site analysis"""
    sites: List[SuitabilityRequest] = Field(..., description="List of sites to analyze")
    criteria_weights: CriteriaWeights = Field(..., description="Criteria weights for analysis")

class SuitabilityAnalysis(BaseModel):
    """Detailed suitability analysis results"""
    overall_score: float = Field(..., description="Overall suitability score (0-100)")
    category: str = Field(..., description="Suitability category (Excellent/Good/Moderate/Poor)")
    
    # Component scores
    solar_score: float = Field(..., description="Solar resource score")
    wind_score: float = Field(..., description="Wind resource score")
    water_score: float = Field(..., description="Water availability score")
    proximity_score: float = Field(..., description="Proximity score")
    infrastructure_score: float = Field(..., description="Infrastructure score")
    
    # Recommendations
    strengths: List[str] = Field(..., description="Site strengths")
    weaknesses: List[str] = Field(..., description="Site weaknesses")
    recommendations: List[str] = Field(..., description="Improvement recommendations")
    
    # Risk assessment
    risk_level: str = Field(..., description="Risk level (Low/Medium/High)")
    risk_factors: List[str] = Field(..., description="Key risk factors")
    
    # Economic indicators
    investment_priority: str = Field(..., description="Investment priority (High/Medium/Low)")
    payback_period: str = Field(..., description="Estimated payback period")

class SuitabilityResponse(BaseModel):
    """Response for suitability analysis"""
    site_id: str = Field(..., description="Site ID")
    site_name: str = Field(..., description="Site name")
    suitability_score: float = Field(..., description="Calculated suitability score")
    analysis: SuitabilityAnalysis = Field(..., description="Detailed analysis")
    timestamp: str = Field(..., description="Analysis timestamp")

class DemandCenter(BaseModel):
    """Hydrogen demand center model"""
    id: str = Field(..., description="Demand center ID")
    name: str = Field(..., description="Demand center name")
    coordinates: List[float] = Field(..., description="[latitude, longitude]")
    demand_level: str = Field(..., description="Demand level (Very High/High/Medium/Low)")
    industry_type: str = Field(..., description="Primary industry type")
    annual_demand: float = Field(..., description="Annual hydrogen demand (tons)")
    growth_rate: float = Field(..., description="Expected growth rate (%)")

class PolicyIncentive(BaseModel):
    """Policy incentive model"""
    id: str = Field(..., description="Incentive ID")
    name: str = Field(..., description="Incentive name")
    type: str = Field(..., description="Incentive type (Central/State/Local)")
    description: str = Field(..., description="Incentive description")
    eligibility: str = Field(..., description="Eligibility criteria")
    value: str = Field(..., description="Incentive value")
    validity: str = Field(..., description="Validity period")
    source: str = Field(..., description="Policy source")

class AnalysisResponse(BaseModel):
    """Generic analysis response"""
    success: bool = Field(..., description="Analysis success status")
    message: str = Field(..., description="Response message")
    data: Optional[Any] = Field(None, description="Analysis data")
    timestamp: str = Field(..., description="Response timestamp")

class Statistics(BaseModel):
    """Analysis statistics"""
    total_sites: int = Field(..., description="Total sites analyzed")
    average_score: float = Field(..., description="Average suitability score")
    score_distribution: Dict[str, int] = Field(..., description="Score distribution by category")
    top_states: List[Dict[str, Any]] = Field(..., description="Top performing states")
    resource_availability: Dict[str, float] = Field(..., description="Resource availability summary")
