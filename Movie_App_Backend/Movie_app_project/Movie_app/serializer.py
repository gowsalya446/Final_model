from .models import *
from rest_framework import serializers
from  django.contrib.auth import authenticate


class Signupserializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=('email','username','password')
        
    def create(self,validate_data):
        user=User.objects.create_user(
             email=validate_data["email"],
             username=validate_data["username"], 
             password=validate_data["password"]
             
            
        )
        
        return user
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance

    
class Loginserializer(serializers.Serializer) :
    
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        print(username,password)
        user = authenticate(username=username, password=password)
        print(user)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect creds")
   
   
class Movieserializer(serializers.ModelSerializer):
    class Meta:
        model=Movies
        fields="__all__"
    

class Theatreserializer(serializers.ModelSerializer):
    class Meta:
        model=Theatre
        fields="__all__"

class Seatserializer(serializers.ModelSerializer):
    class Meta:
        model=Seat
        fields="__all__"

class Bookingserializer(serializers.ModelSerializer):
    class Meta:
        model=Booking
        fields="__all__"
 
class Ticketserializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        fields="__all__"
                               
                           
                                      

        
          