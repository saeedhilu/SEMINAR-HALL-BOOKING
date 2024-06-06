from django.urls import path
from .views import BookingListCreate, SeatListCreate,UserSignupView, UserLoginView

urlpatterns = [
     path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('bookings/', BookingListCreate.as_view(), name='booking-list-create'),
    path('seats/', SeatListCreate.as_view(), name='seat-list-create'),
]
