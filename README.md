# भारत H2-Atlas - India's Hydrogen Atlas

India's first geospatial decision support tool for green hydrogen infrastructure planning and investment analysis.

## 🚀 Features

### Interactive Map Interface
- **Real-time Heatmap Visualization**: Dynamic suitability scoring based on customizable criteria weights
- **Multi-layer Support**: Solar, wind, water, infrastructure, and land use layers
- **Site Analysis**: Detailed information panels for each hydrogen production site
- **Demand Center Mapping**: Industrial zones and consumption centers across India

### Criteria Weight System
- **Solar Potential**: Renewable energy resource assessment (0-100%)
- **Wind Potential**: Wind resource evaluation (0-100%)
- **Water Availability**: Water resource proximity and quality (0-100%)
- **Industry Proximity**: Distance to industrial clusters (0-100%)
- **Grid Connection**: Power infrastructure accessibility (0-100%)
- **Land Availability**: Land use suitability and availability (0-100%)

### Advanced Analytics
- **Suitability Scoring**: Real-time calculation based on weighted criteria
- **Site Comparison**: Side-by-side analysis of multiple locations
- **Policy Insights**: State and national incentive information
- **Investment Analysis**: ROI calculations and market trends

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Mapping**: Leaflet + React-Leaflet
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

## 📊 Data Sources

- **Solar Data**: National Institute of Solar Energy (NISE)
- **Wind Data**: National Institute of Wind Energy (NIWE)
- **Water Data**: Central Water Commission (CWC)
- **Land Use**: ISRO Bhuvan Portal
- **Infrastructure**: Central Electricity Authority (CEA)
- **Industrial Data**: Ministry of Commerce & Industry

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
```bash
# Clone the repository
git clone <repository-url>
cd HACKOUT

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Environment Setup
The application uses OpenStreetMap tiles by default. For production use, consider:
- Setting up custom tile servers
- Adding API keys for additional data sources
- Configuring environment variables

## 🗺️ Map Features

### Heatmap Visualization
- **Dynamic Intensity Control**: Adjustable heatmap density (1-30)
- **Real-time Updates**: Instant recalculation based on weight changes
- **Color-coded Scoring**:
  - 🟢 Excellent (90-100): Dark Green
  - 🟢 High (70-89): Light Green  
  - 🟡 Medium (40-69): Yellow
  - 🔴 Low (0-39): Red

### Layer Management
- **Solar Potential Layer**: Renewable energy resource mapping
- **Wind Potential Layer**: Wind resource assessment
- **Water Availability Layer**: Water resource proximity
- **Infrastructure Layer**: Existing facilities and grid connections
- **Land Use Layer**: Land classification and availability

### Interactive Elements
- **Site Markers**: Clickable locations with detailed information
- **Demand Centers**: Industrial zones and consumption areas
- **Popup Information**: Rich site details and metrics
- **Zoom Controls**: Map navigation and view management

## 📈 Analysis Tools

### Suitability Calculator
- **Weighted Scoring**: Customizable criteria importance
- **Real-time Updates**: Instant score recalculation
- **Validation**: Total weight must equal 100%
- **Export Options**: Generate detailed reports

### Site Comparison
- **Multi-site Analysis**: Compare up to 5 locations
- **Metric Breakdown**: Detailed factor analysis
- **Visual Charts**: Bar charts and radar plots
- **Export Reports**: PDF and Excel formats

## 🎨 UI/UX Features

### Modern Design
- **Responsive Layout**: Works on desktop and mobile
- **Dark/Light Themes**: Customizable appearance
- **Accessibility**: Screen reader support
- **Internationalization**: Multi-language support (English/Hindi)

### Interactive Controls
- **Slider Controls**: Intuitive weight adjustment
- **Toggle Switches**: Layer visibility control
- **Search Functionality**: Site and location search
- **Filter Options**: State and category filtering

## 🔧 Configuration

### Customization Options
- **Color Schemes**: Adjustable heatmap colors
- **Default Weights**: Configurable initial criteria values
- **Layer Settings**: Customizable layer properties
- **Map Center**: Configurable default map view

### Performance Optimization
- **Lazy Loading**: On-demand data loading
- **Caching**: Browser-based data caching
- **Optimized Rendering**: Efficient map updates
- **Memory Management**: Proper cleanup and disposal

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set with side panels
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly mobile interface

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud Storage
- **Container Deployment**: Docker containers
- **Traditional Hosting**: Apache, Nginx

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code standards
- Pull request process
- Issue reporting
- Development setup

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Data Sources**: NISE, NIWE, CWC, ISRO, CEA
- **Open Source**: Leaflet, React, Tailwind CSS
- **Community**: OpenStreetMap contributors
- **Support**: National Green Hydrogen Mission

## 📞 Support

For support and questions:
- **Issues**: GitHub Issues
- **Documentation**: Project Wiki
- **Email**: support@h2atlas.in
- **Community**: Discord/Telegram groups

---

**भारत H2-Atlas** - Empowering India's green hydrogen future through intelligent geospatial analysis and decision support.
