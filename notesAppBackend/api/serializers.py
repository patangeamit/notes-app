from rest_framework import serializers
from base.models import Note, Other

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

        
class OtherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Other
        fields = '__all__'