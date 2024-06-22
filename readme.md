# Django website template (production ready)
Tired of writing Django project from scratch? use this template to speed up your Django development and deliver your project within few hours, instead of weeks or months.

### Why use Django website template?
Using a Django template can save you a lot of time, which is a huge benefit. Most clients don't care if you start from scratch or use a template; they just want their problem solved quickly. Whether you use Django or another framework usually doesn't matter to them as long as the job gets done efficiently.

This template can help you save hours of work, allowing you to deliver a production-ready website in just a few hours.

### What features does Django template include?
- Production ready, you can immediately deploy this to cloud such as Railway.app, Render.com etc.
- Comes with a landing page that you can modify.
- Has blog with Trix WYSIWYG editor built into the admin panel.
- Technical SEO optimization.
- Dynamic Sitemap.xml
- Robots.txt
- Tailwind css setup, build your site faster with tailwind css

### Table of contents
- [Django website template (production ready)](#django-website-template-production-ready)
    - [Why use Django website template?](#why-use-django-website-template)
    - [What features does Django template include?](#what-features-does-django-template-include)
    - [Table of contents](#table-of-contents)
  - [Local development](#local-development)
    - [Admin superuser](#admin-superuser)
  - [Customizing](#customizing)
    - [Adding title, description to page](#adding-title-description-to-page)
  - [Deployment:](#deployment)
      - [Create a firebase credential file](#create-a-firebase-credential-file)
      - [Deploying credential file to production](#deploying-credential-file-to-production)
  - [Images credits](#images-credits)



## Local development


Before you start customizing the template follow the below steps:
1. Install python 3.8 or above.
https://www.python.org/downloads/

2. Open the template folder and from the terminal change the
directory to the current working directory.
`cd home/Template`

3. Install dependencies in an environment (creating an
enviornment is optional, but recommended)
```
pip install -r requirements.txt
```

4. Add a `.env` file inside the project folder with the following

```py
DEBUG=1
PYTHON_VERSION=3.10
DOMAIN=""

ALLOWED_HOSTS=".up.railway.app"
ALLOWED_CORS=""

SECRET_KEY=""
PORD_SECRET_KEY=""

DJANGO_SUPERUSER_EMAIL="" # optonal use if you want to create supruser using --noinput
DJANGO_SUPERUSER_PASSWORD="" # optonal use if you want to create supruser using --noinput

EMAIL_HOST="smtpout.server.net"
EMAIL_HOST_USER=""
EMAIL_HOST_PASSWORD=""

POSTGRES_DATABASE=""
POSTGRES_USER=""
POSTGRES_PASSWORD=""
POSTGRES_HOST=""

POSTGRES_URL=""

REDIS_PROD_HOST=""
REDIS_PASSWORD=""

PROJECT_ID="" # firebase project id
BUCKET_NAME=".appspot.com" # firebase storage name
FIREBASE_CRED_PATH="project/firebase-cred.json"

FIREBASE_ENCODED=""
CLOUD_PLATFORM="RAILWAY"

GOOGLE_ANALYTICS="G-"
```

5. Now in your terminal Create databases and Tables using
```
python manage.py migrate
```
Your database is created and ready to use.

6. Now run the website from the terminal using.
```py
python manage.py runserver
```
Your website should be available at: http://localhost:8000/

7. To run Tailwind CSS open a new terminal and run
```py
python manage.py tailwind start
```

**Note:** If you are facing problems starting this program in windows OS, remove logging from project/settings.py

### Admin superuser
To create a admin superuser use the following in terminal
```py
python manage.py createsuperuser
```

## Customizing

All html, css, js and assets lies inside the templates.
- To modify the landing page, update `home.html`.
- To add link to header and footer or modify head tags, check `base.html`.
- extend `base.html` to have the same footer and header.

### Adding title, description to page
To add title to a page use the following tags
```py
{% block title %}lorem impsum {% endblock title %}
{% block description %}lorem impsum{% endblock description %} #meta description

{% block socialTitle %}{{blog.title}} | {% endblock socialTitle %} # open graph title, for socials
{% block socialDescription %}{{blog.meta_description}}{% endblock socialDescription %} # open graph description, for socials
{% block pageType %}article{% endblock pageType %}
{% block pageImage %}{% endblock pageImage %} # social image
```

To add additional head tags

```py
{% block head_tags %}lorem impsum {% endblock head_tags %}
```
To add scripts at the end of the elements
```
{% block scripts %}
    <script src="{% static "" %}" />
{% endblock scripts %}
```

## Deployment:

You can make use of Railway to deploy your own instance. 
Link to deploy to [Railway.app](https://railway.app?referralCode=BfMDHP)

once you complete make sure to 
```
python manage.py collectstatic
```
and set
```
DEBUG=0
```

#### Create a firebase credential file

1. We use Google storage for storing files. Go to firebase -> storage -> create (make it public)

2. Now Go to firebase -> project settings -> service account -> Generate new private key.

Rename the private as `firebase-cred.json`

Use this private file as your credential file.

#### Deploying credential file to production
Sometimes your cloud provider may not provide you with storage for secret files. 
So convert the credential file to base64 using
```
base64 firebase-cred.json > encoded.txt
```
Now copy the contents of encoded.txt and paste it in `FIREBASE_ENCODED="wedde"` variable


## Images credits
Images are taken from free to use sites such as 
1. unsplash - https://unsplash.com/
2. Pexels - https://www.pexels.com/