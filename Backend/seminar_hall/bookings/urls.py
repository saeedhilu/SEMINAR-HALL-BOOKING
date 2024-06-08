# urls.py
from django.urls import path
from .views import BookingListCreate, SeatListCreate, UserSignupView, UserLoginView,SeatListByDate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('bookings/', BookingListCreate.as_view(), name='booking-list-create'),
    path('seats/', SeatListCreate.as_view(), name='seat-list-create'),
    path('seats-listing-by-date/', SeatListByDate.as_view(), name='seat-listing-by-date'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]