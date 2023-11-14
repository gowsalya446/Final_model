from django.db import models
from  django.contrib.auth.models import  BaseUserManager,AbstractBaseUser
from django.contrib.auth.models import User



class UserManager(BaseUserManager):
    def create_user(self,username,password,**extra_fields):
        if not username:
            raise ValueError("The Email field must be set")
                
        user=self.model(username=username,**extra_fields)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,username,password,**extra_fields):
        
        
        return self.create_user(username,password,**extra_fields)
    
    
class User(AbstractBaseUser):
    email=models.CharField(max_length=60)
    password=models.CharField(max_length=128)
    username=models.CharField(max_length=100,unique=True) 
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

        
        
    
    
    USERNAME_FIELD='username' 
    objects = UserManager()
    
    def __str__(self):
        return self.username
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    
class  Movies(models.Model):
    
    title=models.CharField(max_length=255,unique=True) 
    director=models.CharField(max_length=100)
    genre=models.CharField(max_length=255)
    language=models.CharField(max_length=255)
    rating=models.IntegerField()
    movie_length=models.IntegerField()
    loction=models.CharField(max_length=255)
    total_seats = models.PositiveIntegerField()
    image=models.TextField(default=" ")

    
    
    def __str__(self):
        return self.title
    
class Theatre (models.Model):
    
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE)  
    name=models.CharField(max_length=70)
    location=models.CharField(max_length=255)
    pincode=models.CharField(max_length=6)
    city=models.CharField(max_length=40)
    movie_timeing=models.DateField()
    
    def __str__(self):
        return self.name
    
class Seat(models.Model):
    Theatre_name=models.ForeignKey(Theatre,on_delete=models.CASCADE) 
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE)
    seat_number=models.IntegerField()
    category=models.CharField(max_length=200)
    is_reserved=models.BooleanField(default=False)
    price=models.FloatField(default=0.00)
      
    
    def __str__(self):
        return f"{self.Theatre_name.name}-{self.movie.title}- seat{self.seat_number}"
    
    
class Booking(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE) 
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE)
    seat_number=models.ManyToManyField(Seat)
    total_cost=models.FloatField(default=0.00)
    
    
    def __str__(self):
        return f"{self.user.username}-{self.movie.title}"
    
    
class Ticket(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE) 
    movie=models.ForeignKey(Movies,on_delete=models.CASCADE)
    seat_number=models.ManyToManyField(Seat)
    Theatre_name=models.ForeignKey(Theatre,on_delete=models.CASCADE) 
      
      
    def __str__(self):
        return f"{self.user.username}-{self.movie.title}"
    


    
    

    

   
    