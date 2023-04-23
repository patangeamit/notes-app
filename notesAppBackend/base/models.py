from django.db import models

# Create your models here.
class Note(models.Model):
    textContent = models.TextField(max_length=500)
    date = models.DateField(auto_now_add=True)
    color = models.TextField(default="#9cdcfe")

class Other(models.Model):
    darkMode = models.BooleanField(default=False)