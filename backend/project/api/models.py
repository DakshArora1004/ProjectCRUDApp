from django.db import models

# Create your models here.

class Projects(models.Model):
    name=models.CharField(max_length=100)
    start_date=models.DateField()
    end_date=models.DateField()
    comment=models.CharField(max_length=500,  blank=True, null=True)  
    status = models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
