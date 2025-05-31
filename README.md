# Person Detection Web Application

A full-stack web application that detects and counts people in uploaded images using computer vision, with a complete history tracking system.

## 🚀 Features

- **Image Upload Interface**: User-friendly web interface for uploading images
- **Person Detection**: Automatic detection and counting of people in uploaded images
- **Visual Feedback**: Bounding boxes drawn around detected persons
- **Result Storage**: All detection results saved to database with timestamps
- **History Management**: Complete history page with pagination, search, and filtering capabilities
- **Real-time Processing**: Fast image processing with immediate visual feedback

## 🛠 Tech Stack

### Backend
- **Python**
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and Object-Relational Mapping
- **PostgreSQL** - Robust relational database
- **OpenCV/YOLO** - Computer vision for person detection

### Frontend
- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Deployment
- **Docker & Docker Compose** - Containerized deployment

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/person-detection-app.git
cd person-detection-app
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
HOST_DB_FALLBACK=localhost
PORT_DB_FALLBACK=5435
USER_DB_FALLBACK=tni
NAME_DB_FALLBACK=tnitest
PASSWORD_DB_FALLBACK=123456
```

### 3. Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
tni-detection/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── endpoints/
│   │   │   │   ├── detection.py
│   │   │   │   └── history.py
│   │   │   └── api.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── crud/
│   │   │   └── crud_detection.py
│   │   ├── db/
│   │   │   └── session.py
│   │   ├── models/
│   │   │   └── detection.py
│   │   ├── schemas/
│   │   │   └── detection.py
│   │   ├── services/
│   │   │   └── detection_service.py
│   │   │   └── image_process_service.py
│   │   ├── utils/
│   │   │   └── readImage.py
│   │   └── main.py
│   ├── uploads/
│   ├── visualized/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │    ├── app/
│   │    ├── globals.css
│   │    ├── history
│   │    │   └── page.tsx
│   │    ├── layout.tsx
│   │    └── page.tsx
│   │    ├── components/
│   │    │   ├── history/
│   │    │   │   ├── HistoryFilters.tsx
│   │    │   │   ├── HistoryTable.tsx
│   │    │   │   └── HistoryTableItem.tsx
│   │    │   ├── layouts/
│   │    │   │   ├── Footer.tsx
│   │    │   │   └── Header.tsx
│   │    │   ├── ui/
│   │    │   │   ├── CustomModal.tsx
│   │    │   │   ├── PageSpinner.tsx
│   │    │   │   └── Pagination.tsx
│   │    │   └── upload/
│   │    │       ├── DetectionControls.tsx
│   │    │       ├── DetectionResultDisplay.tsx
│   │    │       ├── ImageDropzone.tsx
│   │    │       └── ImagePreview.tsx
│   │    ├── hooks/
│   │    │   ├── useDetection.ts
│   │    │   └── useHistory.ts
│   │    ├── lib/
│   │    │   └── api.ts
│   │    ├── styles/
│   │    └── types/
│   │        ├── detection.ts
│   │        ├── history.ts
│   │        └── type.ts
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## 🎯 Usage

### 1. Upload Image
1. Navigate to the home page
2. Click "Choose File" or drag and drop an image
3. Supported formats: JPG, PNG, JPEG, WEPB, AVIF,...
4. Click "Detect People" to process

### 2. View Results
- The processed image with bounding boxes will be displayed
- People count will be shown prominently
- Processing time and timestamp will be visible

### 3. Browse History
1. Navigate to the "History" page
2. Use search bar to find specific results
3. Filter by people count range
4. Navigate through pages using pagination controls


## 🔒 Security Considerations

- File upload validation and sanitization
- SQL injection protection via SQLAlchemy ORM
- CORS configuration for production
- Rate limiting on API endpoints
- Secure file storage with access controls

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_DB` | Database name | `tnitest` |
| `POSTGRES_USER` | Database user | `tni` |
| `POSTGRES_PASSWORD` | Database password | `123456` |
| `DATABASE_URL` | Full database connection string | `postgresql://tni:123456@db:5432/tnitest`|


## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   docker-compose down
   sudo lsof -i :3000 -i :8000
   ```

2. **Database Connection Issues**
   - Check if PostgreSQL container is running
   - Verify environment variables
   - Check database logs: `docker-compose logs db`

3. **Image Processing Errors**
   - Ensure uploaded file is a valid image
   - Check backend logs: `docker-compose logs backend`

## 📄 Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 🙏 Acknowledgments

- YOLO model for person detection
- FastAPI community for excellent documentation
- Next.js team for the amazing framework