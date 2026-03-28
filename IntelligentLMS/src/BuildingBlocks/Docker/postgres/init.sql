-- Create databases for microservices
-- Note: This script runs only when PostgreSQL container starts for the first time
-- If databases already exist, you'll see errors but that's OK - they're already created
-- To recreate everything: docker-compose down -v (removes volumes)

CREATE DATABASE lms_auth;
CREATE DATABASE lms_user;
CREATE DATABASE lms_course;
CREATE DATABASE lms_progress;
CREATE DATABASE lms_analytics;
