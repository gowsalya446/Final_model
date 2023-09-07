from django.urls import path
from .views import *



urlpatterns = [
    path("users/",Signupview.as_view(),name="Signupview"),
    path("auth/login/",Loginview.as_view(),name="login"),
    path("auth/logout/",Logoutview.as_view(),name="logout"),
    path("movies/admin",MovieAdminView.as_view(),name="Admin-movie"),
    path("movies/",MovieView.as_view(),name="movie"),
    path("ticket/",TicketingView.as_view(),name="crete_ticket"),
    path("seats/",SeatsView.as_view(),name="reserve_seat"),
    path("booking/",Bookingview.as_view(),name="movie"),
    path("movies/<int:id>",getmoviebyid.as_view(),name="movie-by-id"),
    path("booking/<str:user>",Getticketbyuserid.as_view(),name="ticket-by-user")

]
