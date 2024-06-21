release: python manage.py migrate && python manage.py collectstatic --noinput
web: gunicorn project.wsgi:application 
# celery: celery -A project worker -l error