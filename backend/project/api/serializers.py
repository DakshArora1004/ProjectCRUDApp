from rest_framework import serializers
from .models import Projects

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'
        # fields = ['name', 'start_date', 'end_date', 'comments', 'created_at', 'updated_at']
        