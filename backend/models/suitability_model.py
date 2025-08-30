import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.feature_selection import SelectKBest, f_regression
import logging
from typing import Dict, List, Any, Tuple
import os
from pathlib import Path

from .data_models import SiteData, CriteriaWeights, SuitabilityAnalysis

logger = logging.getLogger(__name__)

class HydrogenSuitabilityModel:
    """Machine Learning model for hydrogen site suitability analysis"""
    
    def __init__(self, model_path: str = "models/hydrogen_suitability_model.pkl"):
        self.model_path = model_path
        self.model = None
        self.scaler = StandardScaler()
        self.feature_selector = None
        self.feature_names = [
            'solar_index', 'wind_index', 'water_index',
            'industry_proximity', 'grid_proximity', 'land_availability',
            'elevation', 'water_source_distance'
        ]
        self.categorical_features = ['policy_zone', 'land_type']
        self.label_encoders = {}
        
    def load_model(self):
        """Load pre-trained model or train new one"""
        try:
            if os.path.exists(self.model_path):
                logger.info("Loading pre-trained model...")
                self.model = joblib.load(self.model_path)
                # Load scaler and encoders if they exist
                scaler_path = self.model_path.replace('.pkl', '_scaler.pkl')
                if os.path.exists(scaler_path):
                    self.scaler = joblib.load(scaler_path)
                logger.info("Model loaded successfully!")
            else:
                logger.info("No pre-trained model found. Training new model...")
                self._train_model()
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            logger.info("Training new model due to error...")
            self._train_model()
    
    def _prepare_training_data(self) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare training data with synthetic data generation"""
        logger.info("Preparing training data...")
        
        # Generate synthetic training data based on Indian geography
        np.random.seed(42)  # For reproducibility
        
        n_samples = 1000
        data = []
        
        # Indian states with their characteristics
        states_data = {
            'Rajasthan': {'lat_range': (23, 30), 'lng_range': (69, 78), 'solar_bias': 0.2, 'wind_bias': 0.1},
            'Gujarat': {'lat_range': (20, 25), 'lng_range': (69, 74), 'solar_bias': 0.15, 'wind_bias': 0.2},
            'Tamil Nadu': {'lat_range': (8, 14), 'lng_range': (76, 80), 'solar_bias': 0.1, 'wind_bias': 0.25},
            'Karnataka': {'lat_range': (12, 19), 'lng_range': (74, 78), 'solar_bias': 0.1, 'wind_bias': 0.1},
            'Maharashtra': {'lat_range': (16, 22), 'lng_range': (72, 80), 'solar_bias': 0.1, 'wind_bias': 0.1},
            'Ladakh': {'lat_range': (32, 36), 'lng_range': (75, 80), 'solar_bias': 0.25, 'wind_bias': 0.05}
        }
        
        for _ in range(n_samples):
            # Randomly select state
            state = np.random.choice(list(states_data.keys()))
            state_info = states_data[state]
            
            # Generate coordinates
            lat = np.random.uniform(*state_info['lat_range'])
            lng = np.random.uniform(*state_info['lng_range'])
            
            # Generate features with realistic distributions
            solar_index = np.clip(np.random.normal(75 + state_info['solar_bias'] * 20, 15), 0, 100)
            wind_index = np.clip(np.random.normal(60 + state_info['wind_bias'] * 20, 20), 0, 100)
            water_index = np.clip(np.random.normal(50, 25), 0, 100)
            
            # Proximity features (closer is better, so we'll invert later)
            industry_proximity = np.random.exponential(50)  # km
            grid_proximity = np.random.exponential(30)      # km
            water_source_distance = np.random.exponential(20)  # km
            
            # Land characteristics
            land_availability = np.random.uniform(1, 10)
            elevation = np.random.uniform(0, 5)  # km
            
            # Calculate synthetic suitability score
            score = self._calculate_synthetic_score(
                solar_index, wind_index, water_index,
                industry_proximity, grid_proximity, land_availability,
                elevation, water_source_distance
            )
            
            data.append([
                solar_index, wind_index, water_index,
                industry_proximity, grid_proximity, land_availability,
                elevation, water_source_distance, score
            ])
        
        # Convert to numpy arrays
        X = np.array([row[:-1] for row in data])
        y = np.array([row[-1] for row in data])
        
        logger.info(f"Training data prepared: {X.shape[0]} samples, {X.shape[1]} features")
        return X, y
    
    def _calculate_synthetic_score(self, solar, wind, water, ind_prox, grid_prox, land, elev, water_dist):
        """Calculate synthetic suitability score for training data"""
        # Normalize and weight features
        score = (
            solar * 0.25 +           # Solar resource
            wind * 0.20 +            # Wind resource
            water * 0.15 +           # Water availability
            max(0, 100 - ind_prox) * 0.15 +    # Industry proximity (closer is better)
            max(0, 100 - grid_prox) * 0.10 +   # Grid proximity (closer is better)
            (land / 10) * 100 * 0.05 +         # Land availability
            max(0, 100 - water_dist * 5) * 0.10  # Water source proximity
        )
        
        # Add some noise for realistic training
        score += np.random.normal(0, 5)
        return np.clip(score, 0, 100)
    
    def _train_model(self):
        """Train the suitability model"""
        logger.info("Training hydrogen suitability model...")
        
        # Prepare training data
        X, y = self._prepare_training_data()
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Feature selection
        self.feature_selector = SelectKBest(score_func=f_regression, k=8)
        X_train_selected = self.feature_selector.fit_transform(X_train_scaled, y_train)
        X_test_selected = self.feature_selector.transform(X_test_scaled)
        
        # Train model (using ensemble for better performance)
        self.model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=6,
            random_state=42,
            subsample=0.8
        )
        
        # Train
        self.model.fit(X_train_selected, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test_selected)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)
        
        logger.info(f"Model training completed!")
        logger.info(f"Test MSE: {mse:.2f}")
        logger.info(f"Test R²: {r2:.3f}")
        logger.info(f"Test MAE: {mae:.2f}")
        
        # Save model
        self._save_model()
    
    def _save_model(self):
        """Save the trained model"""
        try:
            # Create models directory if it doesn't exist
            os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
            
            # Save model
            joblib.dump(self.model, self.model_path)
            
            # Save scaler
            scaler_path = self.model_path.replace('.pkl', '_scaler.pkl')
            joblib.dump(self.scaler, scaler_path)
            
            logger.info(f"Model saved to {self.model_path}")
        except Exception as e:
            logger.error(f"Error saving model: {str(e)}")
    
    def predict_suitability(self, site_data: SiteData, weights: CriteriaWeights) -> float:
        """Predict suitability score for a site"""
        try:
            if self.model is None:
                raise ValueError("Model not loaded. Call load_model() first.")
            
            # Prepare features
            features = self._extract_features(site_data)
            
            # Scale features
            features_scaled = self.scaler.transform(features.reshape(1, -1))
            
            # Select features
            if self.feature_selector:
                features_selected = self.feature_selector.transform(features_scaled)
            else:
                features_selected = features_scaled
            
            # Make prediction
            base_score = self.model.predict(features_selected)[0]
            
            # Apply custom weights
            weighted_score = self._apply_custom_weights(site_data, base_score, weights)
            
            return np.clip(weighted_score, 0, 100)
            
        except Exception as e:
            logger.error(f"Error predicting suitability: {str(e)}")
            # Fallback to simple calculation
            return self._fallback_calculation(site_data, weights)
    
    def _extract_features(self, site_data: SiteData) -> np.ndarray:
        """Extract numerical features from site data"""
        features = [
            site_data.solar_index,
            site_data.wind_index,
            site_data.water_index,
            site_data.industry_proximity,
            site_data.grid_proximity,
            site_data.land_availability,
            site_data.elevation,
            site_data.water_source_distance
        ]
        return np.array(features)
    
    def _apply_custom_weights(self, site_data: SiteData, base_score: float, weights: CriteriaWeights) -> float:
        """Apply custom criteria weights to adjust the score"""
        # Calculate weighted component scores
        solar_score = (site_data.solar_index / 100) * weights.solar
        wind_score = (site_data.wind_index / 100) * weights.wind
        water_score = (site_data.water_index / 100) * weights.water
        
        # Proximity scores (closer is better, so invert)
        industry_score = max(0, (100 - site_data.industry_proximity) / 100) * weights.industry_proximity
        grid_score = max(0, (100 - site_data.grid_proximity) / 100) * weights.grid_proximity
        
        # Land availability score
        land_score = (site_data.land_availability / 10) * weights.land_availability
        
        # Combine scores
        weighted_score = (
            solar_score + wind_score + water_score + 
            industry_score + grid_score + land_score
        )
        
        # Blend with ML prediction
        final_score = 0.7 * weighted_score + 0.3 * base_score
        
        return final_score
    
    def _fallback_calculation(self, site_data: SiteData, weights: CriteriaWeights) -> float:
        """Fallback calculation if ML model fails"""
        score = (
            (site_data.solar_index / 100) * weights.solar +
            (site_data.wind_index / 100) * weights.wind +
            (site_data.water_index / 100) * weights.water +
            max(0, (100 - site_data.industry_proximity) / 100) * weights.industry_proximity +
            max(0, (100 - site_data.grid_proximity) / 100) * weights.grid_proximity +
            (site_data.land_availability / 10) * weights.land_availability
        )
        
        return np.clip(score, 0, 100)
    
    def get_feature_importance(self) -> Dict[str, float]:
        """Get feature importance from the model"""
        if self.model is None:
            return {}
        
        try:
            if hasattr(self.model, 'feature_importances_'):
                importance = self.model.feature_importances_
                return dict(zip(self.feature_names, importance))
            else:
                return {}
        except Exception as e:
            logger.error(f"Error getting feature importance: {str(e)}")
            return {}
    
    def retrain_model(self):
        """Retrain the model with new data"""
        logger.info("Retraining model...")
        self._train_model()
        logger.info("Model retraining completed!")
