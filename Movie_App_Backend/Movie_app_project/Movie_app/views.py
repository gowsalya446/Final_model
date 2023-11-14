from django.shortcuts import render
from rest_framework.views import APIView
import json
from .serializer import *
from rest_framework_simplejwt.tokens  import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.http import JsonResponse,HttpResponseBadRequest
from django.contrib.auth import authenticate, logout
from django.db.models import Q
from django.core.exceptions import SuspiciousOperation






class Signupview(APIView):

    def post(self,request):
        
        data=json.loads(request.body)
        userexist=User.objects.filter(username=data["username"])
        if not userexist:
            serializer=Signupserializer(data=data)
            if serializer.is_valid():
              user=serializer.save()
              refresh=RefreshToken.for_user(user)
              return JsonResponse({
                "Refresh_token":str(refresh),
                "Access_token":str(refresh.access_token),
                "data":serializer.data,
              },status=status.HTTP_201_CREATED)
        return JsonResponse ({"message":"Account is Already Exist"}) 
    
    def get(self,request):
        id=request.GET.get("id",'')
        data=User.objects.filter(id=id)
        if data:
         serializers=Signupserializer(data,many=True)
         return JsonResponse(serializers.data,safe=False)
        return JsonResponse("Account is not valid")
    
    def put(self, request):
        data = json.loads(request.body)
        email=request.GET.get("email",'')
        print(email)
        user = User.objects.filter(email=email).first()
        if user:
            serializer = Signupserializer(user, data=data ,partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Successfully updated the user"})
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"message": "User not found"}, status=404)
    
    def delete(self,request):
        email=request.GET.get("email",'')
        user= User.objects.filter(email=email).first() 
        if user:
            user.delete()
            return JsonResponse({"message": "User successfully deleted"})
        return JsonResponse({"message": "User not found"}, status=404)
 
class Loginview(APIView):

    def post(self,request):
        data=json.loads(request.body)
        serializer=Loginserializer(data=data)
        if serializer.is_valid():
            user=serializer.validated_data
            
            
            refresh=RefreshToken.for_user(user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff':user.is_staff,
                'is_superuser':user.is_superuser
            }
            return JsonResponse({
                 "user": user_data,
                "Refresh_token":str(refresh),
                "Access_token":str(refresh.access_token),
            },status=status.HTTP_201_CREATED)
        print(serializer.errors)    
        return JsonResponse ({"message":"username or password is wrong"})  
 
    def get(self,request):
         data=User.objects.all()        
         if data:
          serializers=Signupserializer(data,many=True)
          return JsonResponse(serializers.data,safe=False)
         return JsonResponse("Account is not valid") 

class Logoutview(APIView):   
     permission_classes = [IsAuthenticated]

     def post(self, request):
       return JsonResponse({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    
     
        


class MovieAdminView(APIView):
    permission_classes = [IsAuthenticated,IsAdminUser]

    
    def get(self, request):
        genre = request.GET.get("genre", "")
        language = request.GET.get("language", "")
        location = request.GET.get("location", "")
        rating = request.GET.get("rating", "")
        id=request.GET.get("id", "")
        
        movies_query = Movies.objects.all()
        
        filters = Q()
        if genre:
            filters |= Q(genre__contains=genre)
        if language:
            filters |= Q(language__contains=language)
        if location:
            filters |= Q(loction__contains=location)
        if rating:
            filters |= Q(rating=rating)
        if id:
            filters |= Q(id=id)    
            
        
        movies_query = movies_query.filter(filters)
        
        movies_list = movies_query.all()
        
        # Serialize the filtered movies list
        serializer = Movieserializer(movies_list, many=True)
        
        return JsonResponse(serializer.data, safe=False)
    
    
    def post(self,request):
        try:
          data = json.loads(request.body)
          existing_movie = Movies.objects.filter(title=data.get("title")).first() 
          if existing_movie:
            return JsonResponse({"message": "Movie already exists"}, status=400)

          serializer = Movieserializer(data=data)
          if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
          return JsonResponse(serializer.errors, status=400,safe=False)
        except SuspiciousOperation:
          return HttpResponseBadRequest("CSRF verification failed. Please try again.")
    
    def put(self,request):
      try:
        title=request.GET.get("query","")
        data = json.loads(request.body)
        movie = Movies.objects.filter(title=title).first() 
        if movie:
            serializer = Movieserializer(movie, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Successfully updated the movies"})
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({"message": "movie not found"}, status=404)
      except SuspiciousOperation:
          return HttpResponseBadRequest("CSRF verification failed. Please try again.")
    def delete(self,request):
        query=request.GET.get("query","")
        movie= Movies.objects.filter(title=query).first() 
        if movie:
            movie.delete()
            return JsonResponse({"message": "movies successfully deleted"})
        return JsonResponse({"message": "movies not found"}, status=404)
    
class MovieView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        genre = request.GET.get("genre", "")
        language = request.GET.get("language", "")
        location = request.GET.get("location", "")
        rating = request.GET.get("rating", "")
        
        movies_query = Movies.objects.all()
        
        filters = Q()
        if genre:
            filters |= Q(genre__contains=genre)
        if language:
            filters |= Q(language__contains=language)
        if location:
            filters |= Q(loction__contains=location)
        if rating:
            filters |= Q(rating=rating)
        
        movies_query = movies_query.filter(filters)
        
        movies_list = movies_query.all()
        
        # Serialize the filtered movies list
        serializer = Movieserializer(movies_list, many=True)
        
        return JsonResponse(serializer.data, safe=False)
        
    
    
class Bookingview(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        data=Booking.objects.all()
        if data:
           serializer=Bookingserializer(data=data,many=True) 
           serializer.is_valid()  
           return JsonResponse (serializer.data,safe=False) 
        return JsonResponse({"message":"No records"})  
    def post(self,request):
        data = json.loads(request.body)
        movie_id = data.get("movie")
        
        try:
            movie = Movies.objects.get(id=movie_id)
            if movie:
              serializer = Bookingserializer(data=data)
              if serializer.is_valid():
                 serializer.save()
                 return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Movies.DoesNotExist:
            return JsonResponse({"message": "Movie doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
           
    
        

   
        

class SeatsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        
         movie_id=request.GET.get('query','')
         
         try:
              movie = Movies.objects.get(id=movie_id)
              seats = Seat.objects.filter(movie=movie)
              serializer = Seatserializer(seats, many=True)
              return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
         except Movies.DoesNotExist: 
            return JsonResponse({"message":"movie is not available"}) 
       
    def post(self, request):
        
         
        data = json.loads(request.body)
        movie_id = data.get("movie")
        seat_number = data.get("seat_number")
        category = data.get("category")
        
        try:
            movie = Movies.objects.get(id=movie_id)
            existing_seat = Seat.objects.filter(movie=movie, seat_number=seat_number, category=category).first()

            if existing_seat:
                if existing_seat.is_reserved:
                    return JsonResponse({"message": "Seat is already reserved"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    existing_seat.is_reserved = True
                    existing_seat.save()
                    return JsonResponse({"message": "Seat reserved successfully"}, status=status.HTTP_201_CREATED)
            else:
                
                new_seat = Seatserializer(data=data)
                
                if new_seat.is_valid():
                    
                    new_seat.validated_data["is_reserved"] = True  
                    new_seat.save()
                    return JsonResponse({"message": "Seat reserved successfully"}, status=status.HTTP_201_CREATED)
                return JsonResponse({"message": "please provide valid data"}, status=status.HTTP_404_NOT_FOUND)
        except Movies.DoesNotExist:
            return JsonResponse({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
                




    def put(self, request):
     seat_id = request.GET.get("seat_id")
     data = json.loads(request.body)
    
     try:
        seat = Seat.objects.get(id=seat_id)
     except Seat.DoesNotExist:
        return JsonResponse({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)

     serializer = Seatserializer(seat, data=data, partial=True)
     if serializer.is_valid():
        serializer.save()
        return JsonResponse({"message": "Seat reservation updated successfully"}, status=status.HTTP_200_OK)
     return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        
class TicketingView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        data=Ticket.objects.all()
        if data:
           serializer=Ticketserializer(data=data,many=True) 
           serializer.is_valid()  
           return JsonResponse (serializer.data,safe=False) 
        return JsonResponse({"message":"No records"})  
    def post(self,request):
        data = json.loads(request.body)
        movie_id = data.get("movie")
        
        try:
            movie = Movies.objects.get(id=movie_id)
            if movie:
              serializer = Ticketserializer(data=data)
              if serializer.is_valid():
                 serializer.save()
                 return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Movies.DoesNotExist:
            return JsonResponse({"message": "Movie doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
        
        
class getmoviebyid(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,id):
        data=Movies.objects.filter(id=id)
        if data:
         serializers=Movieserializer(data,many=True)
         return JsonResponse(serializers.data,safe=False)
        return JsonResponse("movies is not available")
            
class Getticketbyuserid(APIView):   
    permission_classes=[IsAuthenticated]
        
    def get(self,request,user):
        data=Booking.objects.filter(user=user)
        if data:
           serializer=Bookingserializer(data=data,many=True) 
           serializer.is_valid()  
           return JsonResponse (serializer.data,safe=False) 
        return JsonResponse({"message":"No records"})          

class Alltheater(APIView):
    permission_classes=[IsAuthenticated]
    

    def get(self,request,id):
        data=Theatre.objects.all()
        if data:
         serializers=Theatreserializer(data,many=True)
         return JsonResponse(serializers.data,safe=False)
        return JsonResponse("thrater is not available")

class theater(APIView):
     permission_classes=[IsAuthenticated]
     def get(self, request, id):
        try:
            theater = Theatre.objects.get(id=id)  # Use get() to retrieve a single theater
            serializer = Theatreserializer(theater)  # Use TheatreSerializer
            return JsonResponse(serializer.data)
        except Theatre.DoesNotExist:
            return JsonResponse({"message": "Theater not found"}, status=404)
 
            

            









            
    
    
     
     
