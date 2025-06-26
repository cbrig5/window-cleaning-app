"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
import traceback

from django.core.wsgi import get_wsgi_application

settings_module = 'backend.deployment' if 'WEBSITE_HOSTNAME' in os.environ else 'backend.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

try:
    application = get_wsgi_application()
except Exception:
    sys.stderr.write("WSGI startup failed:\n")
    traceback.print_exc()
    raise
