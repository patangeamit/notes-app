from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Note, Other
from .serializers import NoteSerializer, OtherSerializer

@api_view(['GET'])
def getData(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    notes = {"id": 1, "content" : "this is a note"}
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = NoteSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    

    return Response()

@api_view(['DELETE'])
def delItem(request, id):
    Note.objects.get(id=id).delete()
    return Response()

@api_view(['GET'])
def getOtherData(request):
    other = Other.objects.all()
    serializer = OtherSerializer(other, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def putOtherData(request):
    serializer = OtherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    ite = Other.objects.get(id=1)
    ite.darkMode = serializer.data['darkMode']
    Other.objects.all().delete()
    ite.save()
    return Response()