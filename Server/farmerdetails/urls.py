from django.urls import path
from .views import FarmerDetailView, CreateFarmerView, FarmerDeleteView, \
    FarmingDetailsCreateView, FarmingDetailsDeleteView,FarmingDetailsDetailView,FarmingDetailsUpdateView,FarmerListView

urlpatterns = [
    # Farmer URLs
    path('farmer/<str:farmer_identifier>/', FarmerDetailView.as_view(), name='farmer-detail'),
    path('farmers/new/', CreateFarmerView.as_view(), name='farmer-create'),
    path('farmers/fetchallfarmer/', FarmerListView.as_view(), name='farmerfetchdetail'),
    # path('farmers/<int:pk>/edit/', FarmerUpdateView.as_view(), name='farmer-update'),
    path('<int:farmer_id>/delete/', FarmerDeleteView.as_view(), name='farmer_delete'),
    
    # FarmingDetails URLs
    path('farmer/<int:farmer_id>/farming_details/', FarmingDetailsCreateView.as_view(), name='farming-details-create'),
    path('farmer/<int:farmer_id>/farmingdetails/', FarmingDetailsDetailView.as_view(), name='farming-details'),
    path('farming_details/<int:farming_details_id>/delete/', FarmingDetailsDeleteView.as_view(), name='farming-details-delete'),
     path('farming-details/<int:farming_details_id>/update/', FarmingDetailsUpdateView.as_view(), name='farming-details-update'),
]
