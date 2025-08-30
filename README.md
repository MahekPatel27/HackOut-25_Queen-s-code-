# Hydrogen Atlas for India

** India’s first geospatial decision support tool for green hydrogen**

A modern, responsive web application built with React, TypeScript, and Tailwind CSS that provides an intuitive interface for managing blockchain-based green hydrogen subsidies.

![Hydrogen Atlas Logo](https://drive.google.com/file/d/1OnP_dHUMkH65kATRWFMfZe0X9YbBkMMC/view?usp=drive_link)

## 🚀 Overview

The Indian Hydrogen Atlas is a interactive GIS-based decision support designed to visualize and analyze India's potential for green hydrogen infrastructure. An platform that integrates renewable resources, demand hubs, infrastructure, and policy zones to identify optimal sites for hydrogen ecosystem growth. 

### Key Features
- Interactive Map Layers
Solar potential (GHI map)
Wind potential (wind density map)
Water availability (surface & groundwater)
Industrial demand clusters (steel, fertilizer, refineries)
Grid infrastructure & transport corridors
Land use (wasteland, forest, urban, etc.)

- Suitability Heatmap
Weighted overlay (user can adjust importance of solar, wind, water, industry proximity).
Output: Green zones = high suitability, Red = poor suitability.

- Site Analytics Panel (on map click)
Renewable resource index
Water availability index
Distance to industry cluster & grid
Land-use classification
Policy & incentive zone (state/central schemes)

- Export Reports
Auto-generate PDF / Excel summary for a selected site → can be used by ministries or investors.


## 🛠️ Tech Stack

### Data Sources: 
- MNRE, NIWE, CWC, Bhuvan, CEA, Invest India, MoRTH

### Backend / Processing:

- Python (GeoPandas, Rasterio, GDAL, PyMCDA for multi-criteria analysis)
- PostgreSQL + PostGIS (spatial database)
- Geoserver (publish layers as WMS/WFS)


### Frontend (Web GIS):

- React.js + Leaflet.js / Mapbox GL
- ShadCN UI + Tailwind for clean UI
- Option: Streamlit prototype for rapid demo

### Deployment:

- Cloud hosting: AWS / Azure / NIC Cloud (for govt pitch)
- Scalable microservice architecture (API + GIS + DB layers)

## 📁 Project Structure

HACKOUT/
│
├── backend/                         # Python FastAPI/Flask backend
│   ├── main.py                      # API entry point
│   ├── models/                      # ML / suitability models
│   │   ├── scoring.py               # weighted scoring algorithm
│   │   └── utils.py                 # helper functions
│   ├── data/                        # static datasets
│   │   ├── solar.csv
│   │   ├── water.csv
│   │   ├── infra.csv
│   │   └── india_boundary.geojson
│   ├── requirements.txt             # backend dependencies
│   └── __init__.py
│
├── frontend/ (or use src/ directly) # React + TypeScript app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/              # Navbar, sidebar
│   │   │   ├── Map/                 # Map + Heatmap components
│   │   │   │   ├── HeatmapLayer.tsx
│   │   │   │   └── Legend.tsx
│   │   │   └── UI/                  # Buttons, sliders, dropdowns
│   │   │
│   │   ├── contexts/
│   │   │   ├── MapContext.tsx       # manages map state (layers, weights)
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── data/
│   │   │   └── demoData.ts          # mock dataset (until API connected)
│   │   │
│   │   ├── pages/                   # main routes
│   │   │   ├── Dashboard.tsx        # Overview + sliders
│   │   │   ├── MapView.tsx          # Interactive map
│   │   │   ├── Analysis.tsx         # Suitability analysis report
│   │   │   ├── Reports.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Login.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── build/                           # production build files
│   └── static/
│
├── map-test.html                    # standalone Leaflet/heatmap test
├── README.md
└── .gitignore

## 🎯 Use Cases

### For Investors
- Identify high-potential investment zones
- Calculate ROI based on resource availability
- Access policy incentive information
- Compare multiple site options

### For Policy Analysts
- Monitor state and national policies
- Track incentive programs
- Evaluate policy effectiveness
- Generate comprehensive reports

### For Infrastructure Planners
- Site suitability assessment
- Resource optimization planning
- Infrastructure gap analysis
- Scenario planning and comparison

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
bash
# Clone the repository
git clone <repository-url>
cd HACKOUT

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build


### Environment Setup
The application uses OpenStreetMap tiles by default. For production use, consider:
- Setting up custom tile servers
- Adding API keys for additional data sources
- Configuring environment variables


## 📈 Analysis Tools

### Suitability Calculator
- *Weighted Scoring*: Customizable criteria importance
- *Real-time Updates*: Instant score recalculation
- *Validation*: Total weight must equal 100%
- *Export Options*: Generate detailed reports

### Site Comparison
- *Multi-site Analysis*: Compare up to 5 locations
- *Metric Breakdown*: Detailed factor analysis
- *Visual Charts*: Bar charts and radar plots
- *Export Reports*: PDF and Excel formats

## 🎨 UI/UX Features

### Modern Design
- *Responsive Layout*: Works on desktop and mobile
- *Dark/Light Themes*: Customizable appearance
- *Accessibility*: Screen reader support
- *Internationalization*: Multi-language support (English/Hindi)

### Interactive Controls
- *Slider Controls*: Intuitive weight adjustment
- *Toggle Switches*: Layer visibility control
- *Search Functionality*: Site and location search
- *Filter Options*: State and category filtering

## 🔧 Configuration

### Customization Options
- *Color Schemes*: Adjustable heatmap colors
- *Default Weights*: Configurable initial criteria values
- *Layer Settings*: Customizable layer properties
- *Map Center*: Configurable default map view

### Performance Optimization
- *Lazy Loading*: On-demand data loading
- *Caching*: Browser-based data caching
- *Optimized Rendering*: Efficient map updates
- *Memory Management*: Proper cleanup and disposal

## 📱 Responsive Design

The application is fully responsive and works on:
- *Desktop*: Full feature set with side panels
- *Tablet*: Optimized layout for medium screens
- *Mobile*: Touch-friendly mobile interface

## 🚀 Deployment

### Production Build
bash
npm run build


### Deployment Options
- *Static Hosting*: Netlify, Vercel, GitHub Pages
- *Cloud Platforms*: AWS S3, Google Cloud Storage
- *Container Deployment*: Docker containers
- *Traditional Hosting*: Apache, Nginx

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code standards
- Pull request process
- Issue reporting
- Development setup

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 👥 Team

- **Frontend Development** - React/TypeScript implementation
- **UI/UX Design** - Clean, professional interface design
- **Integration** - Deep learning Model


## 🔮 Future Roadmap

- [ ] **Mobile App** - React Native implementation
- [ ] **PWA Features** - Offline support and push notifications  
- [ ] **Advanced Analytics** - Enhanced reporting and insights
- [ ] **Dark Mode** - User preference theming
- [ ] **API Integration** - Enhanced backend connectivity

---

**Built with ❤️ for the future of sustainable energy**

*Hydrogen Atlas -- Empowering India's green hydrogen future through intelligent geospatial analysis and decision support.*