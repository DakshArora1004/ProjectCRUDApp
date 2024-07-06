from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("projects", ProjectViewSet, basename="projects")
urlpatterns = router.urls

# urlpatterns = [
#     path("", home, name="home"),
# ]