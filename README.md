Taken from a previous project for use in the development of a CI/CD pipeline in the DevOps course. The original Readme is found at the bottom.


## Get it running

- Download dependencies with `npm install`
- Google Maps API required, create and place in file `.local.env`
- Start locally using `npm start`
- Browser automatically opens. With the right API keys you can log in with Google, otherwise use Guest. Pressing a point on the map shows a list of nearby golf courses. Each also has the option to mark it as a favorite.

Upon successful workflow the site is automatically deployed using Firebase. On successful deployment, the app is reachable at https://teefinder-devops.web.app/
Disabling can be done by running `firebase hosting:disable`. Redeploy to enable hosting.

Infrastructure as Code (IaC) - Teefinder DevOps

This directory contains Terraform configurations and Docker setup for the Teefinder application infrastructure.

This IaC implementation provides:

- **Docker**: Multi-stage containerization for development and production
- **Terraform**: Infrastructure provisioning on Google Cloud Platform (GCP)
- **Google Cloud Integration**: Firestore, Cloud Storage, Artifact Registry, Cloud Build
- **Environment Management**: Dev, staging, and production configurations

## Deployment Guide

### Deployment Workflow

#### 1. Local Development

```bash
# Start local environment
docker-compose up -d

# Make your changes
# Test locally
docker-compose run --rm teefinder npm run test

# Commit changes
git add .
git commit -m "Feature: Add new capability"
git push origin your-branch
```

#### 2. Set up Infrastructure

```bash
# Initialize Terraform (if not already done)
cd terraform
terraform init

# Plan and apply for your environment
terraform plan -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

#### 3. Build and Push Docker Image

```bash
# Build the image
docker build -t teefinder-app:v1.0.0 .

# Tag for Artifact Registry
docker tag teefinder-app:v1.0.0 eu-docker.pkg.dev/teefinder-devops/teefinder-docker-repo/teefinder-app:v1.0.0

# Push to registry
docker push eu-docker.pkg.dev/teefinder-devops/teefinder-docker-repo/teefinder-app:v1.0.0
```

#### 4. Cloud Build Pipeline

The `cloudbuild.yaml` is automatically triggered on push to main:

```bash
# Manual trigger (optional)
gcloud builds submit --config=cloudbuild.yaml

# View build logs
gcloud builds log COMMIT_SHA --stream
```



# Original Readme
> Project in DH2624
This is an app for golf players to find golf courses based on coordinates from an embedded google maps view. The user chose an destination either by clicking the map or search a city. 
The app show golf courses close to the location and the user may interact with the reults to find more info of the courses. The user may rate and save the golf courses to its own favourites. 

>Important: The user has to login to be able to see the details and review the courses.

>The google login does not work for now becuase of googles own security policy. You have to login as a guest.

>What we have done: 
Embedded google maps on the app using an API 
Acquire golf courses from static coordinates (not user given), longitude and latitude. 

>What we plan to do: 
Enable the user to give coordinates to fetch Golf courses. 
UI/UX evaluation to target user group 
Rating and login function 

>GolfCourseModel.js 
Model for the app. 

>golfCourseSource.js
Code for fetching golf courses using API. 

>googleMapsSource.js
Code for fatiching using the Google maps API 

>mapView.js & mapPresenter.js 
View and presenter for google maps. 

>coursesView & coursesPresenter.js 
View and presenter for the gold course API 

>detailsView &  detalsPresenter
View and presenter for individual golf courses, more detailed. 

>favouritesView & favouritesPresenter
View and presenter for the favourites store by the user. 

>loginView & loginPresenter
View and presenter for the login field. 

>firebaseConfig.js
Configuration for firebase

>firebaseModel.js
Model for firebase

>resolvePromises.js
Code to resolve promises. 
