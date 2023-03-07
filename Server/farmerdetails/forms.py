from django import forms
from .models import Farmer,FarmingDetails

class FarmerForm(forms.ModelForm):
    class Meta:
        model = Farmer
        fields = ['name', 'address', 'age', 'profile_image']

class FarmingDetailsForm(forms.ModelForm):
    class Meta:
        model = FarmingDetails
        fields = ['product_received', 'payment_done', 'product_sold', 'product_remaining']
