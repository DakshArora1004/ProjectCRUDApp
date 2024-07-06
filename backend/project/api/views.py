from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import ProjectSerializer
from .models import Projects
# Create your views here.

def home(request):
    return HttpResponse("Hello, World!")


class ProjectViewSet(viewsets.ViewSet):

    permission_classes = [permissions.AllowAny]
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer

    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    def list(self, request):
        queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def retrieve(self, request, pk=None):
        queryset = self.queryset
        project = queryset.get(id=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)



    def destroy(self, request, pk=None):
        project = self.queryset.get(id=pk)
        project.delete()
        return Response({"message": "Project deleted successfully!"})