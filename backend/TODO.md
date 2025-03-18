# TO DO

- [x] Create the API documentation
- [ ] Create the frontend
- [ ] Investigate google api cost
- [ ] Create the tests
- [ ] Investigate Job Scheduling Solution
  - [ ] Cron jobs
  - [ ] Queues
    - [ ] Celery
    - [ ] RabbitMQ
    - [ ] Redis
    - [ ] Bull
  - [ ] Lambda's / Cloud Functions
    - [ ] Google Cloud Scheduler
    - [ ] Azure Scheduler
    - [ ] AWS CloudWatch
    - [ ] Kubernetes Cron Jobs
- Database
  - [ ] Investigate the best database for the project
    - [ ] PostgreSQL
    - [ ] MySQL
    - [ ] SQLite
  - [ ] Best deployment service
    - [ ] AWS RDS
    - [ ] Google Cloud SQL
    - [ ] Azure SQL
    - [ ] Heroku Postgres
    - [ ] Supabase
    - [ ] PlanetScale
- [ ] Deployment

## BUGS

- When btn "Procces New Email" is clicked, it gets the right subject [remind:1d] but it should
  only get when followupfollowup35@gmail.com is cc. Right now it gets when the emials sent from followupfollowup35@gmail.com with the same subject [remind: 1d]
